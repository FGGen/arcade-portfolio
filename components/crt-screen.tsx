"use client"

import type { ReactNode } from "react"

interface CRTScreenProps {
  children: ReactNode
  isOn: boolean
  fullScreen?: boolean
}

export function CRTScreen({ children, isOn, fullScreen = false }: CRTScreenProps) {
  return (
    <div className="relative w-full h-full">
      <div
        className={`
          relative bg-gray-900
          ${fullScreen ? "min-h-screen w-full overflow-y-auto" : "w-[800px] h-[600px] border-2 border-gray-600 overflow-hidden"}
          ${isOn ? "crt-on" : "crt-off"}
        `}
      >
        {/* Scanlines overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 crt-scanlines"></div>

        {/* Flicker overlay */}
        {isOn && <div className="absolute inset-0 pointer-events-none z-20 crt-flicker"></div>}

        {/* Content */}
        <div className={`relative z-0 w-full ${fullScreen ? "min-h-screen" : "h-full"} ${isOn ? "crt-content-on" : "crt-content-off"}`}>
          {children}
        </div>

        {/* Startup overlay */}
        {isOn && (
          <div className="absolute top-5 left-5 text-green-400 text-6xl font-mono pointer-events-none crt-overlay z-30">
            AV-1
          </div>
        )}
      </div>
    </div>
  )
}
