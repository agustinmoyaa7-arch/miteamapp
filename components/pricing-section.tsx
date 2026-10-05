"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { ArrowRight, Building2, Check, ChevronDown, Minus } from "lucide-react"
import { CtaButton } from "@/components/cta-button"
import { QuoteDialog } from "@/components/quote-dialog"
import { Reveal } from "@/components/reveal"
import {
  ANNUAL_DISCOUNT,
  COMPARISON,
  COMPARISON_PLANS,
  CONDITIONS,
  CUSTOM_PLAN,
  FREE_PLAN,
  PAID_FEATURES,
  PLANS,
  SITE_NAME,
  TRIAL_DAYS,
  annualPerMonth,
  annualSavings,
  formatARS,
  whatsappLink,
  type Billing,
  type Plan,
} from "@/lib/site"

const local = PLANS[0]
// "El plan Local sale $75 por empleado por día" (mes de 30 días, con el local lleno)
const perDay = (perMonth: number) => Math.floor(perMonth / (local.employees * 30))

function BillingToggle({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  const options: { id: Billing; label: React.ReactNode }[] = [
    { id: "monthly", label: "Mensual" },
    {
      id: "annual",
      label: (
        <>
          Anual
          <span className="rounded-full bg-[var(--brand)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
            −{ANNUAL_DISCOUNT}%
          </span>
        </>
      ),
    },
  ]
  return (
    <div role="radiogroup" aria-label="Forma de pago" className="inline-flex rounded-full border border-black/10 bg-white p-1 shadow-sm">
      {options.map((o) => {
        const on = value === o.id
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.id)}
            className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              on ? "text-white" : "text-black/60 hover:text-black"
            }`}
          >
            {on && (
              <motion.span
                layoutId="billing-pill"
                transition={{ type: "spring", damping: 28, stiffness: 380 }}
                className="absolute inset-0 rounded-full bg-black"
              />
            )}
            <span className="relative flex items-center gap-2">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// Número que cambia deslizándose al pasar de mensual a anual
function Price({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="tabular-nums"
        >
          {formatARS(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const dark = Boolean(plan.highlight)
  const annual = billing === "annual"
  const muted = dark ? "text-white/55" : "text-black/50"
  const message = `Hola! Quiero probar ${SITE_NAME} ${TRIAL_DAYS} días gratis. Me interesa el plan ${plan.name} (hasta ${
    plan.employees
  } empleados), pago ${annual ? "anual" : "mensual"}.`

  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl p-6 sm:p-7 ${
        dark
          ? "bg-black text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] md:-my-4 md:py-10"
          : "border border-black/8 bg-white transition-[border-color,box-shadow] duration-300 hover:border-black/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      }`}
    >
      {dark && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-300 px-3 py-1 text-[11px] font-semibold text-black">
          ★ El más elegido
        </span>
      )}
      <h3 className="font-serif text-2xl font-medium tracking-tight">{plan.name}</h3>
      <p className={`mt-1 text-[13px] ${muted}`}>Hasta {plan.employees} empleados</p>

      <p className="mt-6 flex items-baseline gap-1 font-serif text-5xl font-medium tracking-tight">
        <Price value={annual ? annualPerMonth(plan) : plan.monthly} />
        <span className={`font-sans text-sm ${muted}`}>/mes</span>
      </p>
      <div className="mt-2 min-h-[44px] text-[13px]">
        {annual ? (
          <>
            <p className={muted}>Pagás {formatARS(plan.annual)} al año</p>
            <p className={`mt-0.5 font-semibold ${dark ? "text-[#5ee69b]" : "text-[var(--brand)]"}`}>
              Ahorrás {formatARS(annualSavings(plan))}
            </p>
          </>
        ) : (
          <p className={muted}>
            Pagando anual ahorrás <span className="font-semibold">{formatARS(annualSavings(plan))}</span>
          </p>
        )}
      </div>

      <CtaButton
        href={whatsappLink(message)}
        newTab
        variant={dark ? "inverted" : "primary"}
        autoAnimate={dark}
        className="mt-6 w-full"
      >
        Probar {TRIAL_DAYS} días gratis
      </CtaButton>
      <p className={`mt-2 text-center text-[11px] ${muted}`}>Sin tarjeta</p>

      <ul className={`mt-6 space-y-2.5 border-t pt-6 text-[13px] ${dark ? "border-white/10" : "border-black/8"}`}>
        {[plan.terminals, plan.users, plan.support].map((item) => (
          <li key={item} className="flex items-start gap-2 font-medium">
            <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-[#5ee69b]" : "text-[var(--brand)]"}`} />
            {item}
          </li>
        ))}
        {PAID_FEATURES.map((item) => (
          <li key={item} className={`flex items-start gap-2 ${dark ? "text-white/70" : "text-black/60"}`}>
            <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-white/40" : "text-black/30"}`} />
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-black/8" data-lenis-prevent>
      <table className="w-full min-w-[720px] text-left text-[13px]">
        <thead>
          <tr className="bg-neutral-50">
            <th className="px-4 py-3 font-medium text-black/50">Incluye</th>
            {COMPARISON_PLANS.map((name) => (
              <th
                key={name}
                className={`px-3 py-3 text-center font-semibold ${name === "Equipo" ? "text-[var(--brand)]" : ""}`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {COMPARISON.map((row) => (
            <tr key={row.label}>
              <td className="px-4 py-3 text-black/70">{row.label}</td>
              {row.values.map((value, i) => (
                <td key={i} className={`px-3 py-3 text-center ${i === 2 ? "bg-[#f1f8f4]" : ""}`}>
                  {value === true ? (
                    <Check className="mx-auto size-4 text-[var(--brand)]" aria-label="Incluido" />
                  ) : value === false ? (
                    <Minus className="mx-auto size-4 text-black/20" aria-label="No incluido" />
                  ) : (
                    <span className="text-black/70">{value}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// En celular: carrusel deslizable que arranca con el plan destacado (Equipo) en el centro.
// En computadora: las tres tarjetas en fila.
function PlansCarousel({ billing }: { billing: Billing }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const featured = Math.max(
    0,
    PLANS.findIndex((p) => p.highlight),
  )
  const [current, setCurrent] = useState(featured)

  const centerOn = (index: number, behavior: ScrollBehavior) => {
    const track = trackRef.current
    const card = cardRefs.current[index]
    if (!track || !card) return
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior })
  }

  // Al cargar, el plan destacado queda centrado
  useEffect(() => {
    centerOn(featured, "instant")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Qué tarjeta está más cerca del centro, para los puntitos
  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const middle = track.scrollLeft + track.clientWidth / 2
    let best = 0
    let bestDistance = Infinity
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const distance = Math.abs(card.offsetLeft + card.clientWidth / 2 - middle)
      if (distance < bestDistance) {
        bestDistance = distance
        best = i
      }
    })
    setCurrent(best)
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        data-lenis-prevent-horizontal
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[9vw] pt-5 pb-8 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:items-stretch lg:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {PLANS.map((plan, i) => (
          <div
            key={plan.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="w-[82vw] max-w-[360px] shrink-0 snap-center md:w-auto md:max-w-none"
          >
            <Reveal delay={i * 100} zoom className="h-full">
              <PlanCard plan={plan} billing={billing} />
            </Reveal>
          </div>
        ))}
      </div>

      {/* Puntitos del carrusel (solo celular) */}
      <div className="flex justify-center gap-2 md:hidden">
        {PLANS.map((plan, i) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => centerOn(i, "smooth")}
            aria-label={`Ver plan ${plan.name}`}
            aria-current={current === i ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i ? "w-6 bg-black" : "w-2 bg-black/20"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("annual")
  const [showTable, setShowTable] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <section id="precios" aria-labelledby="precios-heading" className="py-16 md:py-24 scroll-mt-20">
        <Reveal as="header" className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-black/50">Precios</p>
          <h2
            id="precios-heading"
            className="mt-3 font-serif text-3xl md:text-4xl font-medium tracking-tight text-balance"
          >
            <span className="marker">Pagás según el tamaño de tu equipo</span>
          </h2>
          <p className="mt-3 text-sm text-black/60 max-w-md mx-auto leading-relaxed">
            Precios en pesos. Probalo {TRIAL_DAYS} días con todo incluido, sin tarjeta.
          </p>
          <div className="mt-8">
            <BillingToggle value={billing} onChange={setBilling} />
          </div>
        </Reveal>

        <PlansCarousel billing={billing} />

        <Reveal className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-black/60">
            El plan {local.name} sale <span className="font-semibold text-black">{formatARS(perDay(local.monthly))}</span>{" "}
            por empleado por día, o{" "}
            <span className="font-semibold text-black">{formatARS(perDay(annualPerMonth(local)))}</span> pagando anual.
          </p>
          <a
            href={whatsappLink(`Hola! Quiero usar ${SITE_NAME} gratis (tengo hasta ${FREE_PLAN.employees} empleados).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
          >
            ¿Tenés hasta {FREE_PLAN.employees} empleados? Usalo gratis para siempre
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        {/* A medida */}
        <Reveal className="mt-10">
          <div className="flex flex-col gap-5 rounded-3xl border border-black/8 bg-neutral-50 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Building2 className="size-5 text-[var(--brand)]" />
              </span>
              <div>
                <p className="font-semibold">
                  ¿Más de {CUSTOM_PLAN.fromEmployees} empleados o varias sucursales?
                </p>
                <p className="mt-1 text-sm text-black/60">
                  Armamos un plan a tu medida, con alta asistida y soporte dedicado.
                </p>
              </div>
            </div>
            <CtaButton onClick={() => setQuoteOpen(true)} variant="secondary" size="md" className="shrink-0">
              Pedir cotización
            </CtaButton>
          </div>
        </Reveal>

        {/* Comparación completa */}
        <Reveal className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            aria-expanded={showTable}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-black/70 hover:bg-neutral-100 hover:text-black transition-colors"
          >
            {showTable ? "Ocultar comparación" : "Ver comparación completa"}
            <ChevronDown className={`size-4 transition-transform duration-300 ${showTable ? "rotate-180" : ""}`} />
          </button>
        </Reveal>
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
            showTable ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pt-6">
              <ComparisonTable />
            </div>
          </div>
        </div>

        <Reveal as="ul" className="mt-10 grid gap-2 sm:grid-cols-2 text-[12px] text-black/50">
          {CONDITIONS.map((c) => (
            <li key={c} className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-black/30" />
              {c}
            </li>
          ))}
        </Reveal>

        <QuoteDialog open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      </section>
    </MotionConfig>
  )
}
