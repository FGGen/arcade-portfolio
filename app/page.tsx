"use client"

import { useState, useEffect } from "react"
import { StartScreen } from "@/components/start-screen"
import { Portfolio } from "@/components/portfolio"
import { CRTScreen } from "@/components/crt-screen"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [screenOn, setScreenOn] = useState(false) // Start with screen OFF
  const [turningOff, setTurningOff] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !gameStarted && screenOn) {
        setGameStarted(true)
      }
      if (e.key === "Escape" && gameStarted) {
        setGameStarted(false)
      }
    }

    const handleTurnOff = () => {
      setTurningOff(true)
      // Wait for the turn-off animation to complete before actually turning off
      setTimeout(() => {
        setScreenOn(false)
        setTurningOff(false)
      }, 550) // Match the turn-off animation duration
    }

    window.addEventListener("keydown", handleKeyPress)
    document.addEventListener("turnOffScreen", handleTurnOff)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      document.removeEventListener("turnOffScreen", handleTurnOff)
    }
  }, [gameStarted, screenOn])

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center">
      {!screenOn ? (
        <button
          onClick={() => setScreenOn(true)}
          className="text-green-400 border-2 border-green-400 px-8 py-4 text-2xl font-mono hover:bg-green-400 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          TURN ON
        </button>
      ) : (
        <CRTScreen isOn={screenOn && !turningOff} fullScreen={true}>
          {!gameStarted ? (
            <StartScreen onStart={() => setGameStarted(true)} />
          ) : (
            <Portfolio onBack={() => setGameStarted(false)} />
          )}
        </CRTScreen>
      )}
    </div>
  )
}
