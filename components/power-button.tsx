"use client"

interface PowerButtonProps {
  isOn: boolean
  onToggle: (isOn: boolean) => void
}

export function PowerButton({ isOn, onToggle }: PowerButtonProps) {
  return (
    <button
      onClick={() => onToggle(!isOn)}
      className={`
        relative w-16 h-16 rounded-full border-4 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50
        ${
          isOn
            ? "bg-green-500 border-green-400 shadow-lg shadow-green-500/50 focus:ring-green-400"
            : "bg-gray-700 border-gray-600 shadow-lg shadow-gray-700/50 focus:ring-gray-400"
        }
        hover:scale-105 active:scale-95
      `}
      aria-label={isOn ? "Turn off" : "Turn on"}
    >
      {/* Power Icon */}
      <svg
        className={`w-8 h-8 mx-auto transition-colors duration-300 ${isOn ? "text-black" : "text-gray-400"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6V4m0 2a8 8 0 108 8 8 8 0 00-8-8z" />
      </svg>

      {/* LED Indicator */}
      <div
        className={`
          absolute top-1 right-1 w-3 h-3 rounded-full transition-all duration-300
          ${isOn ? "bg-red-500 shadow-lg shadow-red-500/75 animate-pulse" : "bg-gray-600"}
        `}
      />

      {/* Glow effect when on */}
      {isOn && <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping" />}
    </button>
  )
}
