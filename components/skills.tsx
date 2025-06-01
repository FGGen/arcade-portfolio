"use client"

import { useState, useEffect } from "react"
import { TypeWriter } from "@/components/typewriter"

interface SkillsProps {
  onBack: () => void
}

export function Skills({ onBack }: SkillsProps) {
  const [showContent, setShowContent] = useState(false)

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

  const skillCategories = [
    {
      category: "AUTOMATION TOOLS",
      skills: ["PLAYWRIGHT", "CYPRESS", "SELENIUM", "POSTMAN", "K6"],
      level: "EXPERT",
    },
    {
      category: "PROGRAMMING",
      skills: ["TYPESCRIPT", "JAVASCRIPT", "PYTHON", "C#", "SQL"],
      level: "ADVANCED",
    },
    {
      category: "CI/CD & CLOUD",
      skills: ["GITLAB CI/CD", "AWS", "AZURE DEVOPS", "SHAREPOINT"],
      level: "ADVANCED",
    },
    {
      category: "TESTING TYPES",
      skills: ["API TESTING", "MOBILE TESTING", "PERFORMANCE", "UAT", "REGRESSION"],
      level: "EXPERT",
    },
    {
      category: "METHODOLOGIES",
      skills: ["AGILE", "SCRUM", "TEST AUTOMATION", "MANUAL TESTING"],
      level: "EXPERT",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono p-6">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-2xl hover:bg-green-400 hover:text-black px-3 py-1 transition-colors focus:outline-none focus:bg-green-400 focus:text-black"
          >
            ←
          </button>
          <div className="text-2xl">
            <TypeWriter text="LEVEL 2: SKILL TREE" speed={40} />
          </div>
          <div className="w-12"></div> {/* Spacer for centering */}
        </div>

        {showContent && (
          <div className="grid grid-cols-1 gap-4">
            {skillCategories.map((category, index) => (
              <div key={index} className="border border-green-400 p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-bold">
                    <TypeWriter text={category.category} speed={30} delay={index * 200} />
                  </div>
                  <div className="text-sm opacity-80">
                    <TypeWriter text={`[${category.level}]`} speed={25} delay={index * 200 + 100} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="bg-green-400 text-black px-2 py-1 text-xs">
                      <TypeWriter text={skill} speed={20} delay={index * 200 + 200 + i * 50} />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {showContent && (
          <>
            <div className="mt-6 border border-green-400 p-4">
              <div className="text-lg font-bold mb-2">
                <TypeWriter text="CERTIFICATIONS & EDUCATION" speed={30} delay={1200} />
              </div>
              <div className="text-sm space-y-1">
                <div>
                  <TypeWriter text="• FIRST CERTIFICATE IN ENGLISH (FCE)" speed={25} delay={1300} />
                </div>
                <div>
                  <TypeWriter text="• TERTIARY IN SYSTEM ANALYST (2019-2021)" speed={25} delay={1400} />
                </div>
                <div>
                  <TypeWriter text="• INSTITUTO ARGENTINO DE LA EMPRESA" speed={25} delay={1500} />
                </div>
              </div>
            </div>

            <div className="mt-6 border border-green-400 p-4">
              <div className="text-lg font-bold mb-2">
                <TypeWriter text="LANGUAGES" speed={30} delay={1600} />
              </div>
              <div className="text-sm space-y-1">
                <div>
                  <TypeWriter text="• SPANISH (NATIVE) ████████████ 100%" speed={25} delay={1700} />
                </div>
                <div>
                  <TypeWriter text="• ENGLISH (FCE) ██████████░░ 85%" speed={25} delay={1800} />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="hover:bg-green-400 hover:text-black px-6 py-2 transition-colors focus:outline-none focus:bg-green-400 focus:text-black"
          >
            <TypeWriter text="▶ BACK TO MENU" speed={30} delay={2000} />
          </button>
          <div className="text-xs mt-4 opacity-50">
            <TypeWriter text="PRESS ESC OR ← TO GO BACK" speed={25} delay={2100} />
          </div>
        </div>
      </div>
    </div>
  )
}
