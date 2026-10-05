"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { LogIn, Menu, X } from "lucide-react"
import { CtaButton } from "@/components/cta-button"
import { LogoMark } from "@/components/logo"
import { MENU, useActiveSection } from "@/components/use-active-section"
import BranchedMenu from "@/components/ui/branched-menu"
import { goToSection } from "@/lib/section-nav"
import { APP_LOGIN_URL, SITE_NAME } from "@/lib/site"

// Menú para celular y tablet: botón en el encabezado que abre un panel desde la derecha.
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useActiveSection()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.documentElement.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={open}
        className="lg:hidden flex size-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black/80 transition-colors hover:bg-neutral-50"
      >
        <Menu className="size-5" />
      </button>

      {/* En un portal: el encabezado tiene backdrop-filter y atraparía al panel fijo */}
      {mounted &&
        createPortal(
          <div className="lg:hidden" aria-hidden={!open} data-lenis-prevent>
            <div
              onClick={() => setOpen(false)}
              className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
              inert={!open}
              className={`fixed inset-y-0 right-0 z-50 flex w-[min(320px,85vw)] flex-col bg-white shadow-2xl transition-[translate,visibility] duration-400 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                open ? "visible translate-x-0" : "invisible translate-x-full"
              }`}
            >
              <div className="flex h-16 items-center justify-between border-b border-black/5 px-5">
                <span className="flex items-center gap-2 font-serif text-xl font-medium tracking-tight">
                  <LogoMark className="size-7" />
                  {SITE_NAME}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="flex size-10 items-center justify-center rounded-full text-black/60 hover:bg-neutral-100"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <BranchedMenu
                  items={MENU}
                  defaultOpen={[0, 1]}
                  value={active}
                  onSelect={(id) => {
                    setActive(id)
                    setOpen(false)
                    // Espera a que se cierre el panel antes de cambiar de sección
                    window.setTimeout(() => goToSection(id), 250)
                  }}
                  color="#0A0A0A"
                  accentColor="#2f9e5f"
                  lineColor="rgb(0 0 0 / 0.12)"
                  width={260}
                  rowHeight={44}
                  indent={40}
                  fontSize={15}
                />
              </div>
              <div className="border-t border-black/5 p-5">
                <CtaButton href={APP_LOGIN_URL} variant="secondary" size="md" className="w-full">
                  <LogIn className="size-4" />
                  Ingresar al panel
                </CtaButton>
              </div>
            </aside>
          </div>,
          document.body,
        )}
    </>
  )
}
