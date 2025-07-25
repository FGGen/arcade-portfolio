"use client"

import { useState, useEffect, useRef } from "react"
import { TypeWriter } from "@/components/typewriter"

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [blinkVisible, setBlinkVisible] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio with correct GitHub Pages path
    const audioPath = process.env.NODE_ENV === 'development' 
      ? '/coin-sound.mp3' 
      : '/arcade-portfolio/coin-sound.mp3'
    
    audioRef.current = new Audio(audioPath)
    audioRef.current.volume = 0.7 // Set volume to 70%
    
    // Preload the audio
    audioRef.current.load()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkVisible((prev) => !prev)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const playCoinSound = () => {
    if (audioRef.current) {
      try {
        // Reset the audio to the beginning
        audioRef.current.currentTime = 0
        
        // Play the audio in background
        audioRef.current.play()
        console.log('Coin sound started playing')
        
      } catch (error) {
        console.log('Audio play failed:', error)
        
        // Try to create a new audio instance if the first one failed
        try {
          const audioPath = process.env.NODE_ENV === 'development' 
            ? '/coin-sound.mp3' 
            : '/arcade-portfolio/coin-sound.mp3'
          
          const newAudio = new Audio(audioPath)
          newAudio.volume = 0.7
          newAudio.play()
          console.log('Coin sound played with new instance')
          
        } catch (secondError) {
          console.log('Second audio attempt failed:', secondError)
          // Continue with game even if audio fails
        }
      }
    }
  }

  const handleStart = () => {
    playCoinSound()
    // Start the game immediately while sound plays in background
    onStart()
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "1") {
        handleStart()
      }
      if (e.key === "2" || e.key === "n" || e.key === "N") {
        document.dispatchEvent(new CustomEvent("turnOffScreen"))
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  const handleNoClick = () => {
    document.dispatchEvent(new CustomEvent("turnOffScreen"))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono">
      <div className="text-center space-y-8">
        <div className="text-4xl mb-12">
          <TypeWriter text="FRANCO GENTILE" speed={60} onComplete={() => setCurrentStep(1)} />
          {currentStep >= 1 && (
            <div className="text-2xl mt-4">
              <TypeWriter text="QA AUTOMATION ENGINEER" speed={50} delay={300} onComplete={() => setCurrentStep(2)} />
            </div>
          )}
        </div>

        {currentStep >= 2 && (
          <>
            <div className="text-2xl mb-8">
              <TypeWriter text="WOULD YOU LIKE TO PLAY?" speed={40} delay={200} onComplete={() => setCurrentStep(3)} />
            </div>

            {currentStep >= 3 && (
              <div className="flex justify-center items-center space-x-16 text-xl">
                <button
                  onClick={handleStart}
                  className="hover:bg-green-400 hover:text-black px-4 py-2 transition-colors focus:outline-none focus:bg-green-400 focus:text-black border border-green-400"
                >
                  <TypeWriter text="▶ YES" speed={35} delay={150} />
                </button>
                <button
                  onClick={handleNoClick}
                  className="px-4 py-2 opacity-50 hover:opacity-100 hover:bg-red-400 hover:text-black transition-colors focus:outline-none focus:bg-red-400 focus:text-black border border-red-400"
                >
                  <TypeWriter text="NO" speed={35} delay={250} />
                </button>
              </div>
            )}

            {currentStep >= 3 && (
              <div className={`text-sm mt-12 ${blinkVisible ? "opacity-100" : "opacity-0"} transition-opacity`}>
                <TypeWriter text="PRESS ENTER OR CLICK YES TO START" speed={30} delay={500} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
