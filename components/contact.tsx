"use client"

import { useState, useEffect, useRef } from "react"
import { TypeWriter } from "@/components/typewriter"

interface ContactProps {
  onBack: () => void
}

export function Contact({ onBack }: ContactProps) {
  const [showContent, setShowContent] = useState(false)
  const [flickerActive, setFlickerActive] = useState(false)
  const touchStartX = useRef<number | null>(null)

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

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return

    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX.current - touchEndX
    const minSwipeDistance = 50

    // Swipe right to go back
    if (diffX < -minSwipeDistance) {
      onBack()
    }

    touchStartX.current = null
  }

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
    <div 
      className="min-h-screen bg-black text-green-400 font-mono overflow-y-auto relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container mx-auto px-4 py-6 max-w-3xl min-h-screen flex flex-col">
        {/* Fixed header */}
        <div className="flex items-center justify-between mb-6 md:mb-8 flex-shrink-0">
          <button
            onClick={onBack}
            className="text-xl md:text-2xl hover:bg-green-400 hover:text-black px-3 py-1 transition-colors focus:outline-none focus:bg-green-400 focus:text-black border border-green-400"
          >
            ←
          </button>
          <div className={`text-lg md:text-2xl text-center ${flickerActive ? "flicker-text" : ""}`}>
            <TypeWriter text="LEVEL 3: CONTACT" speed={40} />
          </div>
          <div className="w-12"></div>
        </div>

        {/* Centered content */}
        <div className="flex-1 flex items-center justify-center">
          {showContent && (
            <div className="flex justify-center w-full">
              <div className={`border border-green-400 p-4 md:p-8 max-w-md relative ${flickerActive ? "flicker-border" : ""}`}>
                <div className="text-center space-y-4">
                  <div className={`text-base md:text-lg font-bold ${flickerActive ? "flicker-text" : ""}`}>
                    <TypeWriter text="FRANCO GENTILE" speed={35} delay={300} />
                  </div>
                  <div className="text-xs md:text-sm opacity-80">
                    <TypeWriter text="QA AUTOMATION ENGINEER" speed={30} delay={500} />
                  </div>

                  <div className="mt-4 md:mt-6 space-y-2 text-xs md:text-sm">
                    <div className={flickerActive ? "flicker-text" : ""}>
                      <TypeWriter text="📧 f6gentile@gmail.com" speed={25} delay={700} />
                    </div>
                    <div>
                      <TypeWriter text="📱 +54 9 2262 534023" speed={25} delay={900} />
                    </div>
                    <div>
                      <TypeWriter text="🌍 Remote" speed={25} delay={1100} />
                    </div>
                    <div className="mt-4 space-y-2">
                      <a 
                        href="https://github.com/FGGen" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block hover:bg-green-400 hover:text-black px-2 py-1 transition-colors border border-green-400 text-center"
                      >
                        <TypeWriter text="🔗 GITHUB: FGGen" speed={25} delay={1300} />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/franco-gentile-0320a511b/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block hover:bg-green-400 hover:text-black px-2 py-1 transition-colors border border-green-400 text-center"
                      >
                        <TypeWriter text="💼 LINKEDIN: Franco Gentile" speed={25} delay={1500} />
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 text-xs opacity-70">
                    <TypeWriter text="READY FOR NEW CHALLENGES" speed={25} delay={1300} />
                  </div>
                </div>

                {/* Smooth flicker overlay */}
                {flickerActive && <div className="flicker-overlay"></div>}
              </div>
            </div>
          )}
        </div>

        {/* Fixed footer */}
        {showContent && (
          <div className="text-center flex-shrink-0 py-4 border-t border-green-400 mt-4 space-y-4">
            <div className={`text-sm opacity-70 ${flickerActive ? "flicker-text" : ""}`}>
              <TypeWriter text="GAME COMPLETED!" speed={30} delay={1500} />
            </div>
            <div className="text-xs opacity-50">
              <TypeWriter text="THANK YOU FOR PLAYING" speed={25} delay={1700} />
            </div>
            <button
              onClick={onBack}
              className="hover:bg-green-400 hover:text-black px-4 md:px-6 py-2 transition-colors focus:outline-none focus:bg-green-400 focus:text-black border border-green-400 mt-4"
            >
              <TypeWriter text="▶ BACK TO MENU" speed={30} delay={1800} />
            </button>
            <div className="text-xs mt-4 opacity-50">
              <TypeWriter text="SWIPE → TO GO BACK" speed={25} delay={1900} />
              <div className="mt-1 hidden md:block">
                <TypeWriter text="OR PRESS ESC" speed={25} delay={2100} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
