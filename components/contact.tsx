"use client"

import { useState, useEffect } from "react"
import { TypeWriter } from "@/components/typewriter"

interface ContactProps {
  onBack: () => void
}

export function Contact({ onBack }: ContactProps) {
  const [showContent, setShowContent] = useState(false)
  const [flickerActive, setFlickerActive] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Backspace") {
        onBack()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [onBack])

  // Random smooth flicker effects
  useEffect(() => {
    const flickerInterval = setInterval(
      () => {
        setFlickerActive(true)
        setTimeout(() => setFlickerActive(false), 800)
      },
      4000 + Math.random() * 6000,
    )

    return () => clearInterval(flickerInterval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono p-6 relative overflow-hidden">
      <div className="w-full max-w-3xl relative z-0">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="text-2xl hover:bg-green-400 hover:text-black px-3 py-1 transition-colors focus:outline-none focus:bg-green-400 focus:text-black"
          >
            ←
          </button>
          <div className={`text-2xl ${flickerActive ? "flicker-text" : ""}`}>
            <TypeWriter text="LEVEL 3: CONTACT" speed={40} />
          </div>
          <div className="w-12"></div>
        </div>

        {showContent && (
          <div className="flex justify-center">
            <div className={`border border-green-400 p-8 max-w-md relative ${flickerActive ? "flicker-border" : ""}`}>
              <div className="text-center space-y-4">
                <div className={`text-lg font-bold ${flickerActive ? "flicker-text" : ""}`}>
                  <TypeWriter text="FRANCO GENTILE" speed={35} delay={300} />
                </div>
                <div className="text-sm opacity-80">
                  <TypeWriter text="QA AUTOMATION ENGINEER" speed={30} delay={500} />
                </div>

                <div className="mt-6 space-y-2 text-sm">
                  <div className={flickerActive ? "flicker-text" : ""}>
                    <TypeWriter text="📧 f6gentile@gmail.com" speed={25} delay={700} />
                  </div>
                  <div>
                    <TypeWriter text="📱 +54 9 2262 534023" speed={25} delay={900} />
                  </div>
                  <div>
                    <TypeWriter text="🌍 Remote" speed={25} delay={1100} />
                  </div>
                </div>

                <div className="mt-6 text-xs opacity-70">
                  <TypeWriter text="READY FOR NEW CHALLENGES" speed={25} delay={1300} />
                </div>
              </div>

              {/* Smooth flicker overlay */}
              {flickerActive && <div className="flicker-overlay"></div>}
            </div>
          </div>
        )}

        {showContent && (
          <div className="mt-8 text-center space-y-4">
            <div className={`text-sm opacity-70 ${flickerActive ? "flicker-text" : ""}`}>
              <TypeWriter text="GAME COMPLETED!" speed={30} delay={1500} />
            </div>
            <div className="text-xs opacity-50">
              <TypeWriter text="THANK YOU FOR PLAYING" speed={25} delay={1700} />
            </div>
            <div className="text-xs mt-4 opacity-50">
              <TypeWriter text="PRESS ESC OR ← TO GO BACK" speed={25} delay={1900} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
