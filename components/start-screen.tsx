"use client"

import { useState, useEffect, useRef } from "react"
import { TypeWriter } from "@/components/typewriter"

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [blinkVisible, setBlinkVisible] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlayingSound, setIsPlayingSound] = useState(false)
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

  const playCoinSound = async () => {
    setIsPlayingSound(true)
    
    if (audioRef.current) {
      try {
        // Reset the audio to the beginning
        audioRef.current.currentTime = 0
        
        // Create a promise that resolves when audio finishes playing
        const audioPromise = new Promise<void>((resolve) => {
          const handleEnded = () => {
            audioRef.current?.removeEventListener('ended', handleEnded)
            resolve()
          }
          audioRef.current?.addEventListener('ended', handleEnded)
        })
        
        // Try to play the audio
        await audioRef.current.play()
        console.log('Coin sound started playing')
        
        // Wait for audio to finish
        await audioPromise
        console.log('Coin sound finished playing')
        
      } catch (error) {
        console.log('Audio play failed:', error)
        
        // Try to create a new audio instance if the first one failed
        try {
          const audioPath = process.env.NODE_ENV === 'development' 
            ? '/coin-sound.mp3' 
            : '/arcade-portfolio/coin-sound.mp3'
          
          const newAudio = new Audio(audioPath)
          newAudio.volume = 0.7
          
          // Create promise for the new audio instance
          const newAudioPromise = new Promise<void>((resolve) => {
            const handleEnded = () => {
              newAudio.removeEventListener('ended', handleEnded)
              resolve()
            }
            newAudio.addEventListener('ended', handleEnded)
          })
          
          await newAudio.play()
          console.log('Coin sound played with new instance')
          
          // Wait for new audio to finish
          await newAudioPromise
          console.log('New audio instance finished playing')
          
        } catch (secondError) {
          console.log('Second audio attempt failed:', secondError)
          // Add a minimum delay even if audio fails
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
    } else {
      // Add a minimum delay if no audio
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    setIsPlayingSound(false)
  }

  const handleStart = async () => {
    await playCoinSound()
    // Audio has finished playing, now start the game
    onStart()
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't handle key presses while sound is playing
      if (isPlayingSound) return
      
      if (e.key === "Enter" || e.key === "1") {
        handleStart()
      }
      if (e.key === "2" || e.key === "n" || e.key === "N") {
        document.dispatchEvent(new CustomEvent("turnOffScreen"))
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isPlayingSound])

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
                  disabled={isPlayingSound}
                  className={`px-4 py-2 transition-colors focus:outline-none border border-green-400 ${
                    isPlayingSound 
                      ? 'bg-green-400 text-black opacity-75 cursor-wait' 
                      : 'hover:bg-green-400 hover:text-black focus:bg-green-400 focus:text-black'
                  }`}
                >
                  {isPlayingSound ? (
                    <TypeWriter text="♪ PLAYING..." speed={35} />
                  ) : (
                    <TypeWriter text="▶ YES" speed={35} delay={150} />
                  )}
                </button>
                <button
                  onClick={handleNoClick}
                  disabled={isPlayingSound}
                  className={`px-4 py-2 transition-colors focus:outline-none border border-red-400 ${
                    isPlayingSound 
                      ? 'opacity-25 cursor-not-allowed' 
                      : 'opacity-50 hover:opacity-100 hover:bg-red-400 hover:text-black focus:bg-red-400 focus:text-black'
                  }`}
                >
                  <TypeWriter text="NO" speed={35} delay={250} />
                </button>
              </div>
            )}

            {currentStep >= 3 && (
              <div className={`text-sm mt-12 ${blinkVisible ? "opacity-100" : "opacity-0"} transition-opacity`}>
                {isPlayingSound ? (
                  <TypeWriter text="♪ COIN SOUND PLAYING..." speed={30} />
                ) : (
                  <TypeWriter text="PRESS ENTER OR CLICK YES TO START" speed={30} delay={500} />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
