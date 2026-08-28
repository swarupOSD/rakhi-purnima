import CinematicIntro from './components/sections/CinematicIntro'
import ThreadJourney from './components/sections/ThreadJourney'
import ChildhoodMemory from './components/sections/ChildhoodMemory'
import TheFight from './components/sections/TheFight'
import TheRakhiMoment from './components/sections/TheRakhiMoment'
import GiftExchange from './components/sections/GiftExchange'
import RakhiCustomizer from './components/sections/RakhiCustomizer'
import DistanceInteraction from './components/sections/DistanceInteraction'
import LetterExperience from './components/sections/LetterExperience'
import PromiseWall from './components/sections/PromiseWall'
import NightSky from './components/sections/NightSky'
import Finale from './components/sections/Finale'
import TheSecret from './components/sections/TheSecret'

import GlobalThread from './components/ui/GlobalThread'
import FloatingNavigation from './components/ui/FloatingNavigation'
import ParticleField from './components/ui/ParticleField'
import FestivalHUD from './components/ui/FestivalHUD'
import SurpriseSystem from './components/ui/SurpriseSystem'

import { SecretProvider } from './context/SecretContext'
import { LanguageProvider } from './context/LanguageContext'
import { AudioProvider } from './context/AudioContext'

function AppContent() {
  return (
    <main className="relative bg-cream text-warm-brown font-sans selection:bg-vermillion selection:text-white min-h-screen w-full overflow-x-hidden overflow-y-auto">
      <FestivalHUD />
      <SurpriseSystem />
      <GlobalThread />
      <ParticleField />
      <FloatingNavigation />

      <div className="relative z-10 w-full flex flex-col">
        <CinematicIntro />        {/* CH 01: The Thread Appears */}
        <ChildhoodMemory />       {/* CH 02: Childhood Memory */}
        <TheFight />              {/* CH 03: The Fight */}
        <ThreadJourney />         {/* CH 04: Time Machine */}
        <TheRakhiMoment />        {/* CH 05: The Rakhi Reveal */}
        <GiftExchange />          {/* CH 06: The Gift Exchange */}
        <RakhiCustomizer />       {/* CH 07: Build Your Rakhi */}
        <DistanceInteraction />   {/* CH 08: Distance */}
        <LetterExperience />      {/* CH 09: The Unsent Message */}
        <PromiseWall />           {/* CH 09: Promises */}
        <NightSky />              {/* CH 10: Night Sky */}
        <Finale />                {/* CH 12: Finale */}
      </div>

      <TheSecret />               {/* CH 11: The Secret (Overlay) */}
    </main>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AudioProvider>
        <SecretProvider>
          <AppContent />
        </SecretProvider>
      </AudioProvider>
    </LanguageProvider>
  )
}

export default App
