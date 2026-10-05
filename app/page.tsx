import Image from "next/image"
import { ArrowRight, ArrowUpRight, LogIn } from "lucide-react"
import { FeatureGrid } from "@/components/feature-grid"
import { SideNav } from "@/components/side-nav"
import { Footer } from "@/components/footer"
import { FaqSection } from "@/components/faq-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaButton } from "@/components/cta-button"
import { HeroShowcase } from "@/components/hero-showcase"
import { HeroTitle } from "@/components/hero-title"
import { KioskDemo } from "@/components/kiosk-demo"
import { LogoMark } from "@/components/logo"
import { MobileMenu } from "@/components/mobile-menu"
import { Reveal } from "@/components/reveal"
import { ScrollProgress } from "@/components/scroll-progress"
import { SetupSteps } from "@/components/setup-steps"
import { SectionLinks } from "@/components/section-links"
import { APP_LOGIN_URL, SITE_NAME, TRIAL_DAYS, TRIAL_MESSAGE, whatsappLink } from "@/lib/site"

const report = [
  { name: "Lucía", plan: "09–17", real: "09:02–17:05", status: "A tiempo", tone: "bg-emerald-100 text-emerald-800" },
  { name: "Martín", plan: "12–20", real: "12:14–20:00", status: "Tarde 14 min", tone: "bg-amber-100 text-amber-900" },
  { name: "Sofi", plan: "20–01", real: "20:00–01:45", status: "Extra 45 min", tone: "bg-sky-100 text-sky-900" },
  { name: "Nico", plan: "09–17", real: "—", status: "Ausente", tone: "bg-rose-100 text-rose-800" },
]

// Retraso de la animación de entrada, en milisegundos
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

export default function Page() {
  return (
    <main id="top" className="min-h-screen bg-white text-[#0A0A0A]">
      {/* Sticky header — full width, neutral chrome */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex h-16 items-center justify-between gap-3">
          <a
            href="#top"
            className="intro flex items-center gap-2 font-serif text-xl font-medium tracking-tight rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2"
          >
            <LogoMark className="size-7 lg:hidden" />
            <span className="hidden min-[360px]:inline">{SITE_NAME}</span>
          </a>
          <div className="intro flex shrink-0 items-center gap-1.5 sm:gap-2" style={d(120)}>
            <a
              href="#precios"
              className="hidden sm:inline-block text-sm text-black/70 hover:text-black px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            >
              Precios
            </a>
            <CtaButton href={APP_LOGIN_URL} variant="secondary" className="hidden sm:inline-flex">
              <LogIn className="size-3.5 hidden sm:block" />
              Ingresar
            </CtaButton>
            <CtaButton href={whatsappLink(TRIAL_MESSAGE)} newTab className="px-4! sm:px-[22px]!">
              Probar gratis
            </CtaButton>
            <MobileMenu />
          </div>
        </div>
        <ScrollProgress />
      </header>

      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
        {/* Left rail */}
        <aside className="hidden lg:block">
          <SideNav />
        </aside>

        {/* Main column */}
        <div id="main-content" className="min-w-0">
          {/* Hero */}
          <section
            id="inicio"
            className="relative pt-10 md:pt-16 xl:pt-24 pb-12 md:pb-16 grid grid-cols-1 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:items-center gap-x-10 scroll-mt-20"
          >
            {/* Resplandor verde detrás de la captura */}
            <div
              aria-hidden="true"
              className="intro pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[60%] bg-[radial-gradient(ellipse_at_center,rgb(47_158_95/0.16),transparent_65%)]"
              style={d(500)}
            />
            <div className="max-w-2xl xl:max-w-none">
              <p
                className="intro mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs text-black/60"
                style={d(100)}
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                Para gastronomía, hotelería y comercios
              </p>
              <HeroTitle />
              <p className="intro mt-8 max-w-md text-[15px] text-black/60 leading-relaxed" style={d(560)}>
                Tus empleados fichan con un PIN en la tablet del local. Vos ves quién llegó tarde, quién faltó y
                cuántas horas hizo cada uno, contra el horario que armaste.
              </p>
              <div className="intro mt-8 flex flex-wrap items-center gap-4" style={d(680)}>
                <CtaButton href={whatsappLink(TRIAL_MESSAGE)} newTab size="md" autoAnimate>
                  Probar gratis {TRIAL_DAYS} días
                  <ArrowUpRight className="size-4" />
                </CtaButton>
                <a
                  href="#como-funciona"
                  className="group inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
                >
                  Ver cómo funciona
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
              <p className="intro mt-6 text-xs text-black/45" style={d(780)}>
                Sin relojes, sin huellas, sin tarjeta de crédito.
              </p>
            </div>

            <div className="mt-12 md:mt-16 xl:mt-0">
              <HeroShowcase />
            </div>
          </section>

          {/* First pixel-art band */}
          <section id="como-funciona" className="mt-16 scroll-mt-20">
            <Reveal className="mb-8 flex items-end justify-between gap-6">
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-md">
                <span className="marker">Una tablet en el mostrador.</span> Nada más.
              </h2>
              <p className="hidden md:block text-sm text-black/60 max-w-xs leading-relaxed">
                Sirve cualquier tablet, celular viejo o PC. El empleado pone su PIN y listo: entrada o salida, sin
                vueltas.
              </p>
            </Reveal>
            {/* Demo del kiosco sobre el paisaje: el visitante puede fichar */}
            <Reveal zoom className="relative rounded-3xl overflow-hidden">
              <Image
                src="/pixel-landscape.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 78vw, 100vw"
              />
              <div className="relative flex flex-col items-center px-3 pt-6 pb-8 sm:px-8 sm:pt-8 sm:pb-12 lg:px-14">
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-4 py-1.5 text-xs sm:text-sm font-medium text-black/75 shadow-sm backdrop-blur">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--brand)] opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-[var(--brand)]" />
                  </span>
                  Probalo: ingresá cualquier PIN de 4 dígitos
                </p>
                <div className="w-full max-w-4xl">
                  <KioskDemo />
                </div>
              </div>
            </Reveal>

          </section>

          {/* Feature grid */}
          <section id="funciones" className="pt-20 md:pt-32 scroll-mt-20">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-center text-balance">
                <span className="marker">Todo lo que hoy hacés a mano</span>
              </h2>
              <p className="mt-3 text-center text-sm text-black/60 max-w-md mx-auto leading-relaxed">
                Pensado para locales con turnos, rotación y poco tiempo. Sin capacitaciones ni manuales.
              </p>
            </Reveal>
            <FeatureGrid />
          </section>

          {/* Second pixel-art band */}
          <section id="plan-vs-real" className="mt-16 scroll-mt-20">
            <Reveal className="mb-8 flex items-end justify-between gap-6">
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-md">
                Lo que planificaste <span className="marker">contra lo que pasó</span>
              </h2>
              <p className="hidden md:block text-sm text-black/60 max-w-xs leading-relaxed">
                Sabés quién llegó tarde sin revisar planillas. Tardanzas, ausencias y horas extra de cada empleado,
                calculadas solas.
              </p>
            </Reveal>
            <Reveal zoom className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[21/9] rounded-3xl overflow-hidden">
              <Image
                src="/pixel-meadow.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 78vw, 100vw"
              />
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <Reveal
                  delay={300}
                  className="backdrop-blur-xl bg-white/75 border border-white/50 rounded-2xl shadow-xl p-5 sm:p-6 w-[min(560px,100%)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm">Plan vs. real · Lunes 6</span>
                    <span className="text-xs text-black/50">Tolerancia 10 min</span>
                  </div>
                  <div className="mt-4 divide-y divide-black/5 rounded-xl bg-white/70 border border-black/10">
                    {report.map((row, i) => (
                      <Reveal key={row.name} delay={600 + i * 160} className="flex items-center gap-3 px-3 py-2.5 text-sm">
                        <span className="w-14 font-medium truncate">{row.name}</span>
                        <span className="hidden sm:block w-14 text-xs text-black/45 tabular-nums">{row.plan}</span>
                        <span className="flex-1 text-xs text-black/70 tabular-nums">{row.real}</span>
                        <span className={`rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap ${row.tone}`}>
                          {row.status}
                        </span>
                      </Reveal>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-black/50">Exportá el reporte a Excel o PDF con un clic.</p>
                </Reveal>
              </div>
            </Reveal>
          </section>

          {/* Caption */}
          <Reveal
            as="p"
            className="mt-10 text-center font-serif text-xl md:text-2xl text-black/80 max-w-xl mx-auto pb-8 text-balance leading-snug"
          >
            Menos tiempo persiguiendo planillas. Más tiempo atendiendo tu local.
          </Reveal>

          {/* Configuración en tres pasos */}
          <section id="configuracion" className="pt-16 md:pt-24 scroll-mt-20">
            <Reveal className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-black/50">Cómo configurarlo</p>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-md">
                  <span className="marker">Listo en tres pasos.</span> Sin instalar nada.
                </h2>
              </div>
              <p className="text-sm text-black/60 max-w-xs leading-relaxed">
                No hace falta comprar equipos ni saber de computación. Y si querés, lo configuramos juntos por
                WhatsApp.
              </p>
            </Reveal>
            <SetupSteps />
          </section>

          <PricingSection />

          <FaqSection />
        </div>
      </div>

      <Footer />
      <SectionLinks />
    </main>
  )
}
