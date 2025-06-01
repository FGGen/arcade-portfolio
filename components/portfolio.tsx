"use client"

import { useState, useEffect } from "react"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { TypeWriter } from "@/components/typewriter"

interface PortfolioProps {
  onBack: () => void
}

export function Portfolio({ onBack }: PortfolioProps) {
  const [currentLevel, setCurrentLevel] = useState("menu")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showMenu, setShowMenu] = useState(false)

  const menuItems = [
    { key: "experience", label: "LEVEL 1: EXPERIENCE" },
    { key: "skills", label: "LEVEL 2: SKILLS" },
    { key: "contact", label: "LEVEL 3: CONTACT" },
    { key: "back", label: "BACK TO START" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowMenu(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentLevel !== "menu") return

      switch (e.key) {
        case "ArrowUp":
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1))
          break
        case "ArrowDown":
          setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0))
          break
        case "Enter":
          handleSelect(menuItems[selectedIndex].key)
          break
        case "1":
          handleSelect("experience")
          break
        case "2":
          handleSelect("skills")
          break
        case "3":
          handleSelect("contact")
          break
        case "Escape":
          onBack()
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentLevel, selectedIndex, onBack])

  const handleSelect = (key: string) => {
    if (key === "back") {
      onBack()
    } else {
      setCurrentLevel(key)
    }
  }

  const renderLevel = () => {
    switch (currentLevel) {
      case "experience":
        return <Experience onBack={() => setCurrentLevel("menu")} />
      case "skills":
        return <Skills onBack={() => setCurrentLevel("menu")} />
      case "contact":
        return <Contact onBack={() => setCurrentLevel("menu")} />
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono">
            <div className="text-3xl mb-8">
              <TypeWriter text="SELECT LEVEL" speed={50} />
            </div>
            {showMenu && (
              <div className="space-y-4 text-xl">
                {menuItems.map((item, index) => (
                  <button
                    key={item.key}
                    onClick={() => handleSelect(item.key)}
                    className={`block px-6 py-2 transition-colors w-80 text-left focus:outline-none whitespace-nowrap ${
                      selectedIndex === index ? "bg-green-400 text-black" : "hover:bg-green-400 hover:text-black"
                    }`}
                  >
                    <TypeWriter text={`▶ ${item.label}`} speed={25} delay={index * 150} />
                  </button>
                ))}
              </div>
            )}
            {showMenu && (
              <div className="text-xs mt-8 opacity-50">
                <TypeWriter text="USE ↑↓ ARROWS OR 1-3 KEYS TO NAVIGATE" speed={25} delay={700} />
              </div>
            )}
          </div>
        )
    }
  }

  return renderLevel()
}
