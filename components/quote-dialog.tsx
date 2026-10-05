"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { CheckCircle2, X } from "lucide-react"
import { EMAIL, SITE_NAME, whatsappLink } from "@/lib/site"

const RUBROS = ["Gastronomía", "Hotelería", "Comercio", "Otro"]

type Fields = {
  nombre: string
  empresa: string
  rubro: string
  empleados: string
  sucursales: string
  email: string
  whatsapp: string
  comentario: string
}

const EMPTY: Fields = {
  nombre: "",
  empresa: "",
  rubro: "",
  empleados: "",
  sucursales: "",
  email: "",
  whatsapp: "",
  comentario: "",
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition-[border-color,box-shadow] focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand)]/15"

function buildMessage(f: Fields) {
  const lines = [
    `Hola! Quiero una cotización de ${SITE_NAME} a medida.`,
    "",
    `Nombre: ${f.nombre}`,
    `Empresa: ${f.empresa}`,
    `Rubro: ${f.rubro}`,
    `Empleados: ${f.empleados}`,
    `Sucursales: ${f.sucursales}`,
    `Email: ${f.email}`,
    `WhatsApp: ${f.whatsapp}`,
  ]
  if (f.comentario.trim()) lines.push(`Comentario: ${f.comentario.trim()}`)
  return lines.join("\n")
}

// Formulario "Pedir cotización" del plan a medida.
// La web es estática (sin servidor): al enviar, se abre WhatsApp con los datos ya escritos.
export function QuoteDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [sent, setSent] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.documentElement.style.overflow = ""
    }
  }, [open, onClose])

  // Al cerrar después de enviar, el formulario vuelve a quedar limpio
  useEffect(() => {
    if (open || !sent) return
    const id = window.setTimeout(() => {
      setSent(false)
      setFields(EMPTY)
    }, 400)
    return () => window.clearTimeout(id)
  }, [open, sent])

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(whatsappLink(buildMessage(fields)), "_blank", "noopener,noreferrer")
    setSent(true)
  }

  if (!mounted) return null

  return createPortal(
    <div data-lenis-prevent aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        inert={!open}
        className={`fixed left-1/2 top-1/2 z-50 flex max-h-[min(92dvh,760px)] w-[min(560px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-[opacity,scale] duration-300 ${
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/5 px-6 py-5">
          <div>
            <p id="quote-title" className="font-serif text-2xl font-medium tracking-tight">
              Plan a medida
            </p>
            <p className="mt-1 text-sm text-black/55">Contanos de tu empresa y te mandamos una propuesta.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-black/50 hover:bg-neutral-100"
          >
            <X className="size-5" />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <CheckCircle2 className="size-12 text-[var(--brand)]" />
            <p className="mt-4 font-serif text-2xl font-medium tracking-tight">¡Listo!</p>
            <p className="mt-2 max-w-sm text-sm text-black/60">
              Te abrimos WhatsApp con tus datos ya escritos: solo tenés que enviar el mensaje. Te respondemos a la
              brevedad.
            </p>
            <p className="mt-4 text-xs text-black/45">
              ¿Preferís mail?{" "}
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Cotización ${SITE_NAME} a medida`)}&body=${encodeURIComponent(
                  buildMessage(fields),
                )}`}
                className="font-medium text-black underline underline-offset-4"
              >
                Mandalo a {EMAIL}
              </a>
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
            <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto px-6 py-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Nombre y apellido
                <input required autoComplete="name" value={fields.nombre} onChange={set("nombre")} className={inputClass} />
              </label>
              <label className="block text-sm font-medium">
                Empresa
                <input
                  required
                  autoComplete="organization"
                  value={fields.empresa}
                  onChange={set("empresa")}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium">
                Rubro
                <select required value={fields.rubro} onChange={set("rubro")} className={inputClass}>
                  <option value="" disabled>
                    Elegí uno
                  </option>
                  {RUBROS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm font-medium">
                  Empleados
                  <input
                    required
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={fields.empleados}
                    onChange={set("empleados")}
                    className={inputClass}
                  />
                </label>
                <label className="block text-sm font-medium">
                  Sucursales
                  <input
                    required
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={fields.sucursales}
                    onChange={set("sucursales")}
                    className={inputClass}
                  />
                </label>
              </div>
              <label className="block text-sm font-medium">
                Email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={set("email")}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium">
                WhatsApp
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  placeholder="Ej: 351 123 4567"
                  value={fields.whatsapp}
                  onChange={set("whatsapp")}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                Comentario <span className="font-normal text-black/40">(opcional)</span>
                <textarea rows={3} value={fields.comentario} onChange={set("comentario")} className={inputClass} />
              </label>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-black/5 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-black/45">Al enviar se abre WhatsApp con tus datos para que nos los mandes.</p>
              <button
                type="submit"
                className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/85"
              >
                Pedir cotización
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}
