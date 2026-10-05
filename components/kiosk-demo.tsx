"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { ChevronRight, Delete, Check, Fingerprint, ShieldCheck, Store, Timer } from "lucide-react"

// Demo del kiosco: réplica del de la app, sin conexión a nada.
// Cualquier PIN de 4 dígitos ficha: la primera vez entrada, la segunda salida (con el pulso del día).

const TZ = "America/Argentina/Buenos_Aires"
const PIN_LENGTH = 4
const GREETING_MS = 2600
const HOURS_MS = 4500

const PEOPLE = ["Lucía", "Martín", "Sofi", "Nico", "Ana", "Juan", "Caro", "Leo"]
const MOODS = ["😞", "🙁", "😐", "🙂", "😄"]

type Screen =
  | { type: "pad" }
  | { type: "hello"; name: string; kind: "entrada" | "salida"; time: string }
  | { type: "pulse"; name: string }
  | { type: "thanks"; mood: string }
  | { type: "hours"; name: string }

// El mismo PIN siempre da el mismo nombre
const nameFor = (pin: string) => PEOPLE[[...pin].reduce((sum, digit) => sum + Number(digit), 0) % PEOPLE.length]

function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

const fmt = (date: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("es-AR", { timeZone: TZ, ...options }).format(date)

const hhmm = (date: Date) => fmt(date, { hour: "2-digit", minute: "2-digit", hour12: false })

export function KioskDemo() {
  const now = useClock()
  const [pin, setPin] = useState("")
  const [mode, setMode] = useState<"punch" | "hours">("punch")
  const [screen, setScreen] = useState<Screen>({ type: "pad" })
  const [shake, setShake] = useState(0)
  const punches = useRef<Record<string, "in" | "out">>({})

  const submit = useCallback(
    (value: string) => {
      if (value.length < PIN_LENGTH) {
        setShake((n) => n + 1)
        return
      }
      const name = nameFor(value)
      setPin("")
      if (mode === "hours") {
        setMode("punch")
        setScreen({ type: "hours", name })
        return
      }
      const time = hhmm(new Date())
      if (punches.current[value] === "in") {
        punches.current[value] = "out"
        setScreen({ type: "hello", name, kind: "salida", time })
      } else {
        punches.current[value] = "in"
        setScreen({ type: "hello", name, kind: "entrada", time })
      }
    },
    [mode],
  )

  const press = useCallback(
    (key: string) => {
      if (screen.type !== "pad") return
      if (key === "del") return setPin((p) => p.slice(0, -1))
      if (key === "ok") return submit(pin)
      const next = (pin + key).slice(0, PIN_LENGTH)
      setPin(next)
      // Al completar los 4 dígitos ficha solo, como en la tablet
      if (next.length === PIN_LENGTH) window.setTimeout(() => submit(next), 180)
    },
    [pin, screen.type, submit],
  )

  // Cada pantalla vuelve sola al teclado
  useEffect(() => {
    if (screen.type === "pad") return
    let ms = GREETING_MS
    let next: Screen = { type: "pad" }
    if (screen.type === "hello" && screen.kind === "salida") next = { type: "pulse", name: screen.name }
    if (screen.type === "pulse") ms = 9000
    if (screen.type === "thanks") ms = 1600
    if (screen.type === "hours") ms = HOURS_MS
    const id = window.setTimeout(() => setScreen(next), ms)
    return () => window.clearTimeout(id)
  }, [screen])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (/^[0-9]$/.test(e.key)) press(e.key)
    else if (e.key === "Backspace") press("del")
    else if (e.key === "Enter") press("ok")
    else return
    e.preventDefault()
  }

  return (
    <MotionConfig reducedMotion="user">
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Demostración del kiosco de fichaje. Ingresá cualquier PIN de 4 dígitos."
        className="relative w-full rounded-[1.6rem] bg-neutral-900 p-2 sm:p-3 shadow-[0_40px_100px_-20px_rgba(20,60,40,0.45)] outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand)]/40"
      >
        <div className="relative overflow-hidden rounded-[1.1rem] sm:rounded-[1.2rem] bg-[radial-gradient(ellipse_at_30%_20%,#f4f8f6,#e9f1ed)] text-[#14261c]">
          {/* Encabezado del kiosco */}
          <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 sm:size-11 items-center justify-center rounded-xl bg-white shadow-sm">
                <Store className="size-5 text-[var(--brand)]" />
              </span>
              <div className="leading-tight">
                <p className="text-[13px] font-semibold tracking-wide">TU COMERCIO</p>
                <p className="text-[11px] tracking-[0.3em] text-black/45">TERMINAL 1</p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs text-black/60 shadow-sm">
              <ShieldCheck className="size-3.5 text-[var(--brand)]" />
              Panel de administración
              <ChevronRight className="size-3.5" />
            </span>
          </div>

          {/* Cuerpo: reloj y teclado */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,300px)] items-center gap-6 md:gap-10 px-4 pb-6 pt-4 sm:px-8 sm:pb-8 md:pt-2">
            <div className="text-center">
              <p className="font-mono font-medium tracking-tight tabular-nums leading-none text-5xl sm:text-6xl lg:text-7xl">
                {now ? (
                  <>
                    {fmt(now, { hour: "2-digit", hour12: false })}
                    <span className="text-[var(--brand)]">:</span>
                    {fmt(now, { minute: "2-digit" }).padStart(2, "0")}
                    <span className="ml-1 text-[0.4em] text-[var(--brand)]">
                      {fmt(now, { second: "2-digit" }).padStart(2, "0")}
                    </span>
                  </>
                ) : (
                  <span className="opacity-0">00:00</span>
                )}
              </p>
              <p className="mt-3 text-sm text-black/55 first-letter:uppercase">
                {now ? fmt(now, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : " "}
              </p>
            </div>

            <div className="mx-auto w-full max-w-[300px]">
              <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-[0.25em] text-[var(--brand)]">
                <Fingerprint className="size-3.5" />
                {mode === "hours" ? "CONSULTÁ TUS HORAS" : "INGRESÁ TU PIN"}
              </p>
              <motion.div
                key={shake}
                animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : undefined}
                transition={{ duration: 0.35 }}
                className="mt-3 flex h-12 items-center justify-center gap-3 rounded-2xl bg-white shadow-sm"
              >
                {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                  <span
                    key={i}
                    className={`size-2.5 rounded-full transition-colors duration-150 ${
                      i < pin.length ? "bg-[var(--brand)]" : "bg-black/15"
                    }`}
                  />
                ))}
              </motion.div>
              <p className="mt-2 text-center text-[11px] text-black/50">
                {mode === "hours" ? "Ingresá tu PIN para ver tus horas" : "Cualquier PIN de 4 dígitos sirve"}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "del", "0", "ok"].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => press(key)}
                    aria-label={key === "del" ? "Borrar" : key === "ok" ? "Confirmar" : key}
                    className={`flex h-11 sm:h-12 items-center justify-center rounded-2xl text-xl font-mono shadow-sm transition-[background-color,scale] duration-100 active:scale-95 ${
                      key === "ok"
                        ? pin.length === PIN_LENGTH
                          ? "bg-[var(--brand)] text-white"
                          : "bg-white/60 text-[var(--brand)]/60"
                        : "bg-white hover:bg-neutral-50"
                    }`}
                  >
                    {key === "del" ? <Delete className="size-5 text-black/60" /> : key === "ok" ? <Check className="size-5" /> : key}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setPin("")
                  setMode((m) => (m === "hours" ? "punch" : "hours"))
                }}
                className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-xs shadow-sm transition-colors ${
                  mode === "hours" ? "bg-[var(--brand)] text-white" : "bg-white text-black/60 hover:bg-neutral-50"
                }`}
              >
                <Timer className="size-3.5" />
                {mode === "hours" ? "Volver a fichar" : "Consultar mis horas trabajadas"}
              </button>
            </div>
          </div>

          {/* Pantallas que aparecen encima del teclado */}
          <AnimatePresence>
            {screen.type !== "pad" && (
              <motion.div
                key={screen.type + ("kind" in screen ? screen.kind : "")}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.5 } }}
                transition={{ type: "spring", damping: 26, stiffness: 260 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[1.1rem] sm:rounded-[1.2rem] bg-[#f4f8f6]/95 px-6 text-center backdrop-blur-sm"
              >
                {screen.type === "hello" && (
                  <>
                    <motion.span
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 14, stiffness: 260 }}
                      className={`flex size-20 items-center justify-center rounded-full text-3xl font-semibold text-white ${
                        screen.kind === "entrada" ? "bg-[var(--brand)]" : "bg-[#14261c]"
                      }`}
                    >
                      {screen.name[0]}
                    </motion.span>
                    <p className="mt-5 font-serif text-4xl sm:text-5xl font-medium tracking-tight">
                      {screen.kind === "entrada" ? "¡Hola" : "¡Chau"}, {screen.name}!
                    </p>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-black/60">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                          screen.kind === "entrada" ? "bg-[var(--brand)]" : "bg-[#14261c]"
                        }`}
                      >
                        {screen.kind === "entrada" ? "Entrada" : "Salida"}
                      </span>
                      {screen.time} · {screen.kind === "entrada" ? "Turno 9 a 17" : "Jornada de 7 h 58 min"}
                    </p>
                    {screen.kind === "entrada" && (
                      <p className="mt-4 text-xs text-black/45">Volvé a ingresar el mismo PIN para marcar la salida</p>
                    )}
                    {/* Cuenta regresiva hasta volver al teclado */}
                    <motion.span
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{ duration: GREETING_MS / 1000, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[var(--brand)]"
                    />
                  </>
                )}

                {screen.type === "pulse" && (
                  <>
                    <p className="text-[11px] font-semibold tracking-[0.25em] text-[var(--brand)]">PULSO DEL DÍA</p>
                    <p className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight">
                      ¿Cómo estuvo tu día, {screen.name}?
                    </p>
                    <div className="mt-6 flex gap-2 sm:gap-3">
                      {MOODS.map((mood, i) => (
                        <motion.button
                          key={mood}
                          type="button"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + i * 0.06 }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setScreen({ type: "thanks", mood })}
                          className="flex size-12 sm:size-14 items-center justify-center rounded-full bg-white text-2xl sm:text-3xl shadow-sm"
                        >
                          {mood}
                        </motion.button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setScreen({ type: "pad" })}
                      className="mt-5 text-xs text-black/45 underline-offset-4 hover:underline"
                    >
                      Saltar
                    </button>
                  </>
                )}

                {screen.type === "thanks" && (
                  <>
                    <motion.span
                      initial={{ scale: 0.4, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 10, stiffness: 220 }}
                      className="text-6xl"
                    >
                      {screen.mood}
                    </motion.span>
                    <p className="mt-4 font-serif text-3xl font-medium tracking-tight">¡Gracias por contarnos!</p>
                    <p className="mt-2 text-sm text-black/55">El encargado lo ve en el panel, en la sección Pulso.</p>
                  </>
                )}

                {screen.type === "hours" && (
                  <>
                    <p className="text-[11px] font-semibold tracking-[0.25em] text-[var(--brand)]">TUS HORAS</p>
                    <p className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight">{screen.name}</p>
                    <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-2 sm:gap-3">
                      {[
                        ["Hoy", "5 h 12 m"],
                        ["Semana", "31 h 40 m"],
                        ["Mes", "142 h"],
                      ].map(([label, value], i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                          className="rounded-2xl bg-white px-2 py-4 shadow-sm"
                        >
                          <p className="text-[11px] uppercase tracking-[0.15em] text-black/45">{label}</p>
                          <p className="mt-1 font-mono text-lg sm:text-xl font-medium tabular-nums">{value}</p>
                        </motion.div>
                      ))}
                    </div>
                    <motion.span
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{ duration: HOURS_MS / 1000, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[var(--brand)]"
                    />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  )
}
