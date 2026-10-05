import { ArrowUp, ArrowUpRight } from "lucide-react"
import { CtaButton } from "@/components/cta-button"
import { LogoMark } from "@/components/logo"
import { Reveal } from "@/components/reveal"
import { APP_LOGIN_URL, EMAIL, SITE_NAME, TRIAL_DAYS, TRIAL_MESSAGE, whatsappLink } from "@/lib/site"

const marqueeItems = [
  "Dejá la planilla",
  "Fichaje con PIN",
  "Cuadro semanal",
  "Plan vs. real",
  "Excel para el contador",
  "Sin relojes ni huellas",
  "Gastronomía",
  "Hotelería",
  "Comercios",
]

const linkColumns = [
  {
    title: "Producto",
    links: [
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Funciones", href: "#funciones" },
      { label: "Plan vs. real", href: "#plan-vs-real" },
      { label: "Configuración", href: "#configuracion" },
      { label: "Precios", href: "#precios" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "WhatsApp", href: whatsappLink(`Hola! Tengo una consulta sobre ${SITE_NAME}.`) },
      { label: EMAIL, href: `mailto:${EMAIL}` },
    ],
  },
  {
    title: "Clientes",
    links: [
      { label: "Ingresar al panel", href: APP_LOGIN_URL },
      { label: "Preguntas frecuentes", href: "#preguntas" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative mt-16 md:mt-32 overflow-hidden border-t border-black/8 bg-white">
      {/* Marquee strip */}
      <div className="border-b border-black/8 bg-neutral-50/60 py-4">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-xs font-medium uppercase tracking-[0.25em] text-black/50">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="flex items-center gap-12">
              {item}
              <span className="text-black/20" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Main footer body */}
      <div className="relative max-w-[1280px] mx-auto px-6 pt-16 md:pt-24 pb-12">
        {/* CTA block */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 md:gap-12 items-end pb-14 md:pb-20 border-b border-black/8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-black/50 mb-6">Empezá hoy</p>
            <h2 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] text-balance max-w-2xl">
              <span className="marker">Probalo gratis</span>
              <br />
              en tu local.
            </h2>
            <p className="mt-6 max-w-md text-sm text-black/60 leading-relaxed">
              {TRIAL_DAYS} días con todas las funciones, sin tarjeta. Te ayudamos a cargar a tu equipo y a dejar la
              tablet funcionando.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaButton href={whatsappLink(TRIAL_MESSAGE)} newTab size="md" autoAnimate>
              Quiero probarlo
              <ArrowUpRight className="size-4" />
            </CtaButton>
            <CtaButton href={`mailto:${EMAIL}`} variant="secondary" size="md">
              Escribinos un mail
            </CtaButton>
          </div>
        </Reveal>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <LogoMark className="size-12" />
            <p className="font-serif text-xl font-medium tracking-tight">{SITE_NAME}</p>
            <p className="text-sm text-black/60 leading-relaxed max-w-[220px]">
              Fichaje de personal para gastronomía, hotelería y comercios.
            </p>
          </div>
          {linkColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-black/70 break-all transition-colors hover:text-black focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant brand wordmark */}
        <div aria-hidden="true" className="select-none pointer-events-none overflow-hidden -mx-6 px-6">
          <p className="font-serif font-medium tracking-tight leading-[0.85] text-[20vw] text-balance bg-gradient-to-b from-black/10 to-transparent bg-clip-text text-transparent">
            {SITE_NAME}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-black/8">
          <p className="text-xs uppercase tracking-[0.2em] text-black/50 order-2 md:order-1">
            &copy; 2026 {SITE_NAME} · New Wave
          </p>

          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 order-1 md:order-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/50">Hecho en</span>
            <span className="text-xs font-medium text-black">Villa Carlos Paz, Córdoba</span>
          </div>

          <a
            href="#top"
            aria-label="Volver arriba"
            className="group order-3 inline-flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/60 transition-all hover:border-black/30 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2"
          >
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
