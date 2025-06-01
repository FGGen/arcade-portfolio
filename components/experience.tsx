"use client"

import { useState, useEffect, useRef } from "react"
import { TypeWriter } from "@/components/typewriter"

interface ExperienceProps {
  onBack: () => void
}

export function Experience({ onBack }: ExperienceProps) {
  const [showContent, setShowContent] = useState(false)
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

  const experiences = [
    {
      company: "DUALBOOT PARTNERS",
      role: "QA AUTOMATION",
      period: "MAY 2024 - PRESENT",
      achievements: [
        "AUTOMATED TEST FRAMEWORKS +40% COVERAGE",
        "API TESTING SUITES IMPLEMENTATION",
        "GITLAB CI/CD PIPELINES -30% MANUAL QA",
        "DATABASE VALIDATIONS & DATA INTEGRITY",
      ],
      tech: "PLAYWRIGHT | TYPESCRIPT | AWS | GITLAB",
    },
    {
      company: "NIMBLE.LA",
      role: "QA ENGINEER",
      period: "JUL 2022 - MAY 2024",
      achievements: [
        "WEB & MOBILE AUTOMATION LEADERSHIP",
        "85% TEST COVERAGE ACHIEVEMENT",
        "PERFORMANCE TESTING WITH K6",
        "CI/CD INTEGRATION -25% RELEASE TIME",
      ],
      tech: "CYPRESS | POSTMAN | K6 | MOBILE TESTING",
    },
    {
      company: "ACCENTURE",
      role: "ASSOCIATE TEST ENGINEER",
      period: "MAR 2021 - JUL 2022",
      achievements: [
        "ENTERPRISE APPLICATIONS TESTING",
        "UAT SESSIONS WITH STAKEHOLDERS",
        "AZURE DEVOPS & SHAREPOINT MGMT",
        "SELENIUM AUTOMATION +20% EFFICIENCY",
      ],
      tech: "SELENIUM | AZURE DEVOPS | SHAREPOINT",
    },
  ]

  return (
    <div 
      className="min-h-screen bg-black text-green-400 font-mono overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container mx-auto px-4 py-6 max-w-3xl min-h-screen flex flex-col">
        {/* Fixed header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <button
            onClick={onBack}
            className="text-xl md:text-2xl hover:bg-green-400 hover:text-black px-3 py-1 transition-colors focus:outline-none focus:bg-green-400 focus:text-black border border-green-400"
          >
            ←
          </button>
          <div className="text-lg md:text-2xl text-center">
            <TypeWriter text="LEVEL 1: EXPERIENCE LOG" speed={40} />
          </div>
          <div className="w-12"></div> {/* Spacer for centering */}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {showContent && (
            <div className="space-y-4 md:space-y-6 pb-6">
              {experiences.map((exp, index) => (
                <div key={index} className="border border-green-400 p-3 md:p-4">
                  <div className="text-base md:text-lg font-bold">
                    <TypeWriter text={exp.company} speed={30} delay={index * 300} />
                  </div>
                  <div className="text-sm opacity-80">
                    <TypeWriter text={`${exp.role} | ${exp.period}`} speed={25} delay={index * 300 + 100} />
                  </div>
                  <div className="mt-2 space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="text-xs md:text-sm">
                        <TypeWriter text={`• ${achievement}`} speed={20} delay={index * 300 + 200 + i * 100} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs opacity-60">
                    <TypeWriter text={`TECH STACK: ${exp.tech}`} speed={20} delay={index * 300 + 600} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fixed footer */}
        <div className="text-center flex-shrink-0 py-4 border-t border-green-400 mt-4">
          <button
            onClick={onBack}
            className="hover:bg-green-400 hover:text-black px-4 md:px-6 py-2 transition-colors focus:outline-none focus:bg-green-400 focus:text-black border border-green-400"
          >
            <TypeWriter text="▶ BACK TO MENU" speed={30} delay={1500} />
          </button>
          <div className="text-xs mt-4 opacity-50">
            <TypeWriter text="SWIPE → TO GO BACK | SCROLL TO SEE MORE" speed={25} delay={1700} />
            <div className="mt-1 hidden md:block">
              <TypeWriter text="OR PRESS ESC" speed={25} delay={1900} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
