"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Tablet, UserPlus, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"

const STEP_MS = 1800

const steps = [
  {
    icon: UserPlus,
    title: "Cargás tu equipo",
    text: "Nombre, PIN y sector de cada empleado. Después armás la semana en el cuadro de horarios.",
  },
  {
    icon: Tablet,
    title: "Vinculás la tablet",
    text: "Generás un código en el panel, lo tipeás en la tablet y queda como el reloj del local.",
  },
  {
    icon: Users,
    title: "Ellos fichan, vos controlás",
    text: "Cada uno marca con su PIN. Vos ves todo desde el celular, estés donde estés.",
  },
]

// Dibujito de cada paso
function StepVisual({ index, on }: { index: number; on: boolean }) {
  if (index === 0) {
    const people = [
      { name: "Lucía", color: "bg-sky-200" },
      { name: "Martín", color: "bg-amber-200" },
      { name: "Sofi", color: "bg-emerald-200" },
    ]
    return (
      <div className="flex flex-col gap-1.5">
        {people.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center gap-2 rounded-lg border border-black/5 bg-white px-2.5 py-1.5 text-[11px] transition-all duration-500 ${
              on ? "opacity-100" : "opacity-50"
            }`}
            style={{ transitionDelay: on ? `${i * 90}ms` : "0ms" }}
          >
            <span className={`size-5 rounded-full ${p.color} flex items-center justify-center text-[9px] font-semibold`}>
              {p.name[0]}
            </span>
            <span className="font-medium">{p.name}</span>
            <span className="ml-auto font-mono text-black/35">PIN ••••</span>
          </div>
        ))}
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-black/40">Código de vinculación</span>
        <span
          className={`rounded-xl border px-4 py-2 font-mono text-lg font-medium tracking-[0.2em] transition-colors duration-500 ${
            on ? "border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--brand)]" : "border-black/10 bg-white text-black/60"
          }`}
        >
          K7PM-3QXD
        </span>
        <span className="text-[10px] text-black/40">Vale 15 minutos y sirve una sola vez</span>
      </div>
    )
  }
  return (
    <div className="flex h-full items-center justify-center">
      <div
        className={`flex items-center gap-2.5 rounded-xl border border-black/5 bg-white px-3 py-2.5 shadow-sm transition-all duration-500 ${
          on ? "scale-100 opacity-100" : "scale-95 opacity-60"
        }`}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-semibold text-white">
          L
        </span>
        <div className="leading-tight">
          <p className="text-[12px] font-semibold">¡Hola, Lucía!</p>
          <p className="text-[10px] text-black/50">Entrada · 09:02</p>
        </div>
        <Check className="size-4 text-[var(--brand)]" />
      </div>
    </div>
  )
}

// Los tres pasos de la configuración: se iluminan en orden 1 → 2 → 3, en bucle.
// Con el mouse encima de una tarjeta, se queda en esa.
export function SetupSteps() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || hovered !== null) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % steps.length), STEP_MS)
    return () => window.clearInterval(id)
  }, [inView, hovered])

  const current = hovered ?? active

  return (
    <div>
      {/* Barra de progreso de los pasos (escritorio) */}
      <div className="mb-5 hidden md:grid grid-cols-3 gap-5" aria-hidden="true">
        {steps.map((step, i) => (
          <div key={step.title} className="h-1 overflow-hidden rounded-full bg-black/5">
            <div
              className={`h-full origin-left rounded-full bg-[var(--brand)] transition-transform ease-linear ${
                i < current ? "scale-x-100 duration-300" : i === current ? "scale-x-100" : "scale-x-0 duration-300"
              }`}
              style={i === current ? { transitionDuration: hovered !== null ? "300ms" : `${STEP_MS}ms` } : undefined}
            />
          </div>
        ))}
      </div>

      <ol ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, i) => {
          const on = i === current
          return (
            <Reveal as="li" key={step.title} delay={i * 120} className="h-full">
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => {
                  setHovered(null)
                  setActive(i)
                }}
                className={`relative flex h-full flex-col rounded-2xl border bg-white p-5 transition-[border-color,box-shadow,translate] duration-500 ${
                  on
                    ? "-translate-y-1 border-[var(--brand)] shadow-[0_0_0_4px_rgb(47_158_95/0.12),0_18px_40px_-18px_rgb(47_158_95/0.55)]"
                    : "border-black/8 shadow-none"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-9 items-center justify-center rounded-full transition-colors duration-500 ${
                      on ? "bg-[var(--brand)] text-white" : "bg-neutral-100 text-black/70"
                    }`}
                  >
                    <step.icon className="size-4" />
                  </span>
                  <span
                    className={`text-xs tabular-nums transition-colors duration-500 ${
                      on ? "font-medium text-[var(--brand)]" : "text-black/40"
                    }`}
                  >
                    Paso {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-[15px]">{step.title}</h3>
                <p className="mt-1.5 text-[13px] text-black/55 leading-relaxed">{step.text}</p>
                <div
                  className={`mt-5 h-32 rounded-xl p-3 transition-colors duration-500 ${
                    on ? "bg-[#f1f8f4]" : "bg-neutral-50"
                  }`}
                >
                  <StepVisual index={i} on={on} />
                </div>
              </div>
            </Reveal>
          )
        })}
      </ol>
    </div>
  )
}
