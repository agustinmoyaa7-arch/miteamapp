// Cambio de sección con transición: el contenido se desvanece, la página se ubica
// en la sección elegida y la sección entra deslizándose (ver #main-content en globals.css).

import { getLenis } from "./smooth-scroll"

const LEAVE_MS = 240
const ENTER_MS = 700

let timers: number[] = []

// Salto sin animación (con Lenis activo hay que avisarle, si no vuelve a la posición anterior)
function jumpTo(top: number) {
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(top, { immediate: true, force: true })
  else window.scrollTo({ top, behavior: "instant" })
}

function flashSection(section: HTMLElement) {
  section.removeAttribute("data-flash")
  void section.offsetWidth // reinicia la animación aunque se elija dos veces seguidas
  section.setAttribute("data-flash", "true")
  timers.push(window.setTimeout(() => section.removeAttribute("data-flash"), 1200))
}

export function goToSection(id: string) {
  const main = document.getElementById("main-content")
  const section = id === "top" ? null : document.getElementById(id)
  if (id !== "top" && !section) return

  const targetTop = () => (section ? section.getBoundingClientRect().top + window.scrollY - 80 : 0)
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`)

  // Con "reducir movimiento" la transición igual se hace, pero solo como fundido (globals.css)
  if (!main) {
    jumpTo(targetTop())
    return
  }

  timers.forEach(clearTimeout)
  timers = []
  main.removeAttribute("data-entering")
  main.setAttribute("data-leaving", "")

  timers.push(
    window.setTimeout(() => {
      jumpTo(targetTop())
      main.removeAttribute("data-leaving")
      void main.offsetWidth
      main.setAttribute("data-entering", "")
      if (section) flashSection(section)
      timers.push(window.setTimeout(() => main.removeAttribute("data-entering"), ENTER_MS))
    }, LEAVE_MS),
  )
}
