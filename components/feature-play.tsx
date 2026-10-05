"use client"

import { useEffect, useRef, useState } from "react"

const ON_MS = 2000
const OFF_MS = 600

// Repite la animación de la vista previa de una tarjeta mientras está en pantalla:
// marca data-play="true" un rato, lo saca y vuelve a empezar (ver la variante card-on en globals.css).
// Con el mouse encima se queda en el estado final.
export function FeaturePlay({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [play, setPlay] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) {
      setPlay(false)
      return
    }
    let timer = 0
    const cycle = (on: boolean) => {
      setPlay(on)
      timer = window.setTimeout(() => cycle(!on), on ? ON_MS : OFF_MS)
    }
    // Un respiro antes de arrancar, para que se vea la tarjeta llegar
    timer = window.setTimeout(() => cycle(true), 300)
    return () => window.clearTimeout(timer)
  }, [inView])

  return (
    <div
      ref={ref}
      data-play={play || hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group ${className}`}
    >
      {children}
    </div>
  )
}
