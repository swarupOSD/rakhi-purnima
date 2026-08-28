import React, { createContext, useContext, useEffect, useRef } from 'react'

const AudioContext = createContext<{}>({})

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasAttemptedAutoplay = useRef(false)

  useEffect(() => {
    // Prevent duplicate audio instances
    if (audioRef.current) return

    // Create global audio instance
    const audio = new Audio('/background_music.mp3')
    audio.loop = true
    audio.volume = 0.35
    
    // We want to avoid mobile weirdness by ensuring it plays inline
    audio.setAttribute('playsinline', 'true')
    
    audioRef.current = audio

    const playAudio = () => {
      if (!audioRef.current) return
      
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
            removeListeners()
          })
          .catch((_error) => {
            // Autoplay was blocked
            // Keep the listeners alive so the next interaction triggers play
          })
      }
    }

    const interactionEvents = ['pointerdown', 'touchstart', 'keydown', 'scroll']
    
    const handleInteraction = () => {
      playAudio()
    }

    const removeListeners = () => {
      interactionEvents.forEach(evt => {
        window.removeEventListener(evt, handleInteraction)
      })
    }

    const addListeners = () => {
      interactionEvents.forEach(evt => {
        window.addEventListener(evt, handleInteraction, { once: true, passive: true })
      })
    }

    if (!hasAttemptedAutoplay.current) {
      hasAttemptedAutoplay.current = true
      
      // Attempt immediate autoplay
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay succeeded immediately! No need for interaction listeners.
          })
          .catch((_error) => {
            // Autoplay blocked. We must wait for first user interaction.
            addListeners()
          })
      }
    }

    return () => {
      removeListeners()
      // We don't destroy the audio on unmount to keep it playing across hot reloads in dev, 
      // but strictly speaking, in production React it will persist because context sits at root.
    }
  }, [])

  return (
    <AudioContext.Provider value={{}}>
      {children}
    </AudioContext.Provider>
  )
}

export const useGlobalAudio = () => useContext(AudioContext)
