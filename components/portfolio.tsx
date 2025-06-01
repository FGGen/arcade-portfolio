"use client"

import { useState, useEffect, useRef } from "react"
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
  const touchStartY = useRef<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Keyboard navigation
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

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartY.current || !touchStartX.current) return

    const touchEndY = e.changedTouches[0].clientY
    const touchEndX = e.changedTouches[0].clientX
    const diffY = touchStartY.current - touchEndY
    const diffX = touchStartX.current - touchEndX
    const minSwipeDistance = 50

    // Vertical swipes for menu navigation (only in menu)
    if (currentLevel === "menu" && Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > minSwipeDistance) {
      if (diffY > 0) {
        // Swipe up - move to next item
        setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0))
      } else {
        // Swipe down - move to previous item
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1))
      }
    }

    // Horizontal swipes for going back
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
      if (diffX < 0) {
        // Swipe right - go back
        if (currentLevel !== "menu") {
          setCurrentLevel("menu")
        } else {
          onBack()
        }
      }
    }

    touchStartY.current = null
    touchStartX.current = null
  }

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
          <div 
            ref={containerRef}
            className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="text-2xl md:text-3xl mb-8">
              <TypeWriter text="SELECT LEVEL" speed={50} />
            </div>
            {showMenu && (
              <div className="space-y-4 text-lg md:text-xl px-4 w-full max-w-sm">
                {menuItems.map((item, index) => (
                  <button
                    key={item.key}
                    onClick={() => handleSelect(item.key)}
                    className={`block px-4 md:px-6 py-3 md:py-2 transition-colors w-full text-left focus:outline-none whitespace-nowrap text-sm md:text-xl border border-green-400 ${
                      selectedIndex === index ? "bg-green-400 text-black" : "hover:bg-green-400 hover:text-black"
                    }`}
                  >
                    <TypeWriter text={`▶ ${item.label}`} speed={25} delay={index * 150} />
                  </button>
                ))}
              </div>
            )}
            {showMenu && (
              <div className="text-xs mt-8 opacity-50 text-center px-4">
                <TypeWriter text="SWIPE ↕ TO NAVIGATE | TAP TO SELECT | SWIPE → TO GO BACK" speed={25} delay={700} />
                <div className="mt-2 hidden md:block">
                  <TypeWriter text="OR USE ↑↓ ARROWS OR 1-3 KEYS" speed={25} delay={900} />
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  return renderLevel()
}
