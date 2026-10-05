"use client"

import { useEffect } from "react"
import { goToSection } from "@/lib/section-nav"

// Hace que todos los links internos (#precios, #preguntas, etc.) usen la transición entre secciones.
export function SectionLinks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const link = (event.target as Element).closest?.('a[href^="#"]')
      const id = link?.getAttribute("href")?.slice(1)
      if (!id || id === "main-content") return
      event.preventDefault()
      goToSection(id)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}
