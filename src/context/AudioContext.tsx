import React, { createContext, useContext, useEffect, useRef } from 'react'

const AudioContext = createContext<{}>({})

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!audioRef.current || startedRef.current) return

    const startMusic = async () => {
      if (!audioRef.current || startedRef.current) return

      try {
        await audioRef.current.play()
        startedRef.current = true
        cleanupListeners()
      } catch (err) {
        // Browser autoplay blocked.
        // Keep gesture listeners active.
        if (import.meta.env.DEV) {
          console.warn("Autoplay blocked, waiting for interaction", err)
        }
      }
    }

    const interactionEvents = ['pointerdown', 'touchstart', 'click', 'keydown']

    const handleInteraction = () => {
      startMusic()
    }

    const cleanupListeners = () => {
      interactionEvents.forEach(evt => {
        window.removeEventListener(evt, handleInteraction)
      })
    }

    const addListeners = () => {
      interactionEvents.forEach(evt => {
        // We do NOT use {once: true} here because if it fails, we want it to retry on next click.
        window.addEventListener(evt, handleInteraction, { passive: true })
      })
    }

    // Try autoplay immediately on mount
    const tryAutoplay = async () => {
      try {
        await audioRef.current?.play()
        startedRef.current = true
      } catch (err) {
        if (import.meta.env.DEV) {
          console.warn("Initial autoplay blocked", err)
        }
        addListeners()
      }
    }

    tryAutoplay()

    return () => {
      cleanupListeners()
    }
  }, [])

  return (
    <AudioContext.Provider value={{}}>
      <audio
        ref={audioRef}
        src="/background_music.mp3"
        loop
        preload="auto"
        playsInline
      />
      {children}
    </AudioContext.Provider>
  )
}

export const useGlobalAudio = () => useContext(AudioContext)
