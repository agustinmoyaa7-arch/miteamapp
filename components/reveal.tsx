"use client"

import { useEffect, useRef, useState } from "react"

type RevealProps = {
  children: React.ReactNode
  as?: "div" | "article" | "li" | "ol" | "ul" | "section" | "header" | "p"
  className?: string
  /** Retraso en milisegundos, para escalonar elementos. */
  delay?: number
  /** Además de subir, arranca un poco más chico. */
  zoom?: boolean
}

// Muestra su contenido con una animación la primera vez que entra en pantalla.
// Marca `data-visible="true"`, que también usan el resaltador de títulos y las tarjetas.
export function Reveal({ children, as: Tag = "div", className = "", delay = 0, zoom = false }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      // @ts-expect-error: el ref sirve para cualquiera de las etiquetas permitidas
      ref={ref}
      data-visible={visible}
      className={`reveal ${zoom ? "reveal-zoom" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
