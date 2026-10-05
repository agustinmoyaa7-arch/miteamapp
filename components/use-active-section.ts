"use client"

import { useEffect, useState } from "react"
import { ChartColumn, CircleHelp, House, LayoutGrid, Settings2, Tablet, Tag } from "lucide-react"
import type { BranchedMenuItem } from "@/components/ui/branched-menu"

// Secciones de la página, agrupadas como en el menú
export const MENU: BranchedMenuItem[] = [
  {
    label: "Producto",
    children: [
      { value: "inicio", label: "Inicio", icon: House },
      { value: "como-funciona", label: "Cómo funciona", icon: Tablet },
      { value: "funciones", label: "Funciones", icon: LayoutGrid },
      { value: "plan-vs-real", label: "Plan vs. real", icon: ChartColumn },
    ],
  },
  {
    label: "Empezar",
    children: [
      { value: "configuracion", label: "Configuración", icon: Settings2 },
      { value: "precios", label: "Precios", icon: Tag },
      { value: "preguntas", label: "Preguntas", icon: CircleHelp },
    ],
  },
]

const SECTION_IDS = MENU.flatMap((group) => group.children?.map((kid) => kid.value) ?? [])

// Devuelve la sección que se está viendo, para marcarla en el menú.
export function useActiveSection() {
  const [active, setActive] = useState<string>("inicio")

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement =>
      Boolean(el),
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return [active, setActive] as const
}
