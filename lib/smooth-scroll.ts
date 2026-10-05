import type Lenis from "lenis"

// Instancia de Lenis (scroll suave) activa en la página, si hay una.
// La registra ScrollStack y la usa la transición entre secciones.
let current: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  current = lenis
}

export function getLenis() {
  return current
}
