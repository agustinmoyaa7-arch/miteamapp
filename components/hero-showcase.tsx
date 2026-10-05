"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

// La captura del kiosco, inclinada hacia atrás, que se endereza a medida que bajás.
export function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Sin movimiento: la captura queda derecha desde el principio
      el.style.setProperty("--tilt", "0deg")
      el.style.setProperty("--lift", "1")
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      // 0 arriba de todo, 1 después de bajar unos 450 px: la captura queda derecha
      const progress = Math.min(window.scrollY / 450, 1)
      el.style.setProperty("--tilt", `${(1 - progress) * 14}deg`)
      el.style.setProperty("--lift", `${0.95 + progress * 0.05}`)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div className="intro relative [perspective:1600px]" style={{ "--d": "650ms" } as React.CSSProperties}>
      <div
        ref={ref}
        // Apilado: se inclina hacia atrás. En dos columnas: gira hacia el texto.
        className="relative origin-bottom xl:origin-left rounded-[1.6rem] bg-neutral-900 p-2 sm:p-3 shadow-[0_40px_100px_-20px_rgba(20,60,40,0.35)] transition-transform duration-200 ease-out [transform:rotateX(var(--tilt,14deg))_scale(var(--lift,0.95))] xl:[transform:rotateY(calc(var(--tilt,14deg)*-1))_rotateX(calc(var(--tilt,14deg)*0.35))_scale(var(--lift,0.95))]"
      >
        <div className="relative overflow-hidden rounded-[1.1rem] sm:rounded-[1.2rem] bg-white">
          <Image
            src="/kiosco.png"
            alt="El kiosco de fichaje: reloj en vivo y teclado para ingresar el PIN"
            width={1883}
            height={898}
            className="block h-auto w-full"
            sizes="(min-width: 1280px) 1000px, 100vw"
            priority
          />
        </div>
      </div>

      {/* Burbujas que muestran lo que pasa al fichar */}
      <div
        className="intro absolute -left-3 bottom-[12%] hidden sm:block"
        style={{ "--d": "1300ms" } as React.CSSProperties}
      >
        <div className="float flex items-center gap-3 rounded-2xl border border-black/5 bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
          <span className="flex size-9 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-semibold text-white">
            L
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">¡Hola, Lucía!</p>
            <p className="text-xs text-black/55">Entrada · 09:02</p>
          </div>
          <Check className="size-4 text-[var(--brand)]" />
        </div>
      </div>
      <div
        className="intro absolute -right-3 top-[14%] hidden md:block"
        style={{ "--d": "1550ms" } as React.CSSProperties}
      >
        <div
          className="float rounded-2xl border border-black/5 bg-white/90 px-4 py-3 shadow-xl backdrop-blur"
          style={{ "--f": "1200ms" } as React.CSSProperties}
        >
          <p className="text-[11px] uppercase tracking-[0.15em] text-black/45">Hoy en el local</p>
          <div className="mt-1.5 flex gap-1.5 text-xs font-medium">
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-emerald-800">6 a tiempo</span>
            <span className="rounded-md bg-amber-100 px-2 py-0.5 text-amber-900">1 tarde</span>
          </div>
        </div>
      </div>
    </div>
  )
}
