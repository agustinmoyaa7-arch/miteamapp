"use client"

import { useState } from "react"
import { MotionConfig } from "motion/react"
import RotatingText from "@/components/ui/rotating-text"

// Lo que hoy usan para controlar el horario. Rota con su artículo ("el Excel", no "la Excel").
const TOOLS = ["la planilla.", "el Excel.", "la libreta."]

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

export function HeroTitle() {
  const [index, setIndex] = useState(0)

  return (
    <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl xl:text-7xl leading-[1.02] font-medium tracking-tight">
      {/* Para Google y lectores de pantalla, el título completo y fijo */}
      <span className="sr-only">Dejá la planilla, el Excel y la libreta.</span>
      <span aria-hidden="true">
        <span className="intro inline-block" style={d(200)}>
          Dejá
        </span>
        <br />
        <span className="intro relative inline-block" style={d(380)}>
          {/* Con "reducir movimiento" del sistema, motion cambia el deslizamiento por un fundido */}
          <MotionConfig reducedMotion="user">
            <RotatingText
              texts={TOOLS}
              rotationInterval={2800}
              animatePresenceMode="popLayout"
              staggerFrom="last"
              staggerDuration={0.025}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              onNext={setIndex}
              mainClassName="flex-nowrap!"
              // Cada palabra recorta sus letras para que entren y salgan "desde adentro"
              splitLevelClassName="overflow-hidden pb-[0.14em] -mb-[0.14em]"
            />
          </MotionConfig>
          {/* Subrayado verde: se vuelve a dibujar bajo cada palabra nueva */}
          <svg
            aria-hidden="true"
            viewBox="0 0 300 20"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -bottom-2 left-0 h-3 w-[96%] text-[var(--brand)]"
          >
            <path
              key={index}
              d="M3 14 C 70 4, 150 4, 297 10"
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              className="draw-line"
              style={d(index === 0 ? 1000 : 350)}
            />
          </svg>
        </span>
      </span>
    </h1>
  )
}
