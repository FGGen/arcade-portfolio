"use client"

import { useState, useEffect } from "react"
import { TypeWriter } from "@/components/typewriter"

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [blinkVisible, setBlinkVisible] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkVisible((prev) => !prev)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "1") {
        onStart()
      }
      if (e.key === "2" || e.key === "n" || e.key === "N") {
        document.dispatchEvent(new CustomEvent("turnOffScreen"))
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [onStart])

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
                  onClick={onStart}
                  className="hover:bg-green-400 hover:text-black px-4 py-2 transition-colors focus:outline-none focus:bg-green-400 focus:text-black"
                >
                  <TypeWriter text="▶ YES" speed={35} delay={150} />
                </button>
                <button
                  onClick={handleNoClick}
                  className="px-4 py-2 opacity-50 hover:opacity-100 hover:bg-red-400 hover:text-black transition-colors focus:outline-none focus:bg-red-400 focus:text-black"
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
