import { CalendarDays, CheckCircle2, FileSpreadsheet, Lock, PencilLine } from "lucide-react"
import { FeaturePlay } from "@/components/feature-play"
import { Reveal } from "@/components/reveal"
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack"

type Feature = {
  title: string
  description: string
  preview: () => React.ReactNode
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Cuadro semanal: los turnos se van completando al pasar el mouse
function WeeklyPreview() {
  const days = ["L", "M", "M", "J", "V", "S", "D"]
  const people = [
    { name: "Lucía", shifts: [1, 1, 0, 1, 1, 1, 0], color: "bg-sky-200 border-sky-300" },
    { name: "Martín", shifts: [0, 1, 1, 1, 0, 1, 1], color: "bg-amber-200 border-amber-300" },
    { name: "Sofi", shifts: [1, 0, 1, 1, 1, 0, 1], color: "bg-emerald-200 border-emerald-300" },
  ]
  return (
    <div className="absolute inset-0 p-4 text-[10px]">
      <div className="grid grid-cols-[44px_repeat(7,1fr)] gap-1">
        <span />
        {days.map((d, i) => (
          <span key={i} className="text-center text-black/40 font-medium">
            {d}
          </span>
        ))}
        {people.map((p, row) => (
          <div key={p.name} className="contents">
            <span className="text-black/60 truncate leading-6">{p.name}</span>
            {p.shifts.map((on, col) => (
              <span key={col} className="h-6 rounded bg-neutral-100 overflow-hidden">
                {on ? (
                  <span
                    className={`block h-full rounded border ${p.color} origin-left scale-x-0 transition-transform duration-500 card-on:scale-x-100`}
                    style={{ transitionDelay: `${row * 120 + col * 40}ms` }}
                  />
                ) : null}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-black/50">
        <CalendarDays className="size-3" />
        <span>Turno &quot;Mañana&quot; · 9 a 17</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Historial: aparece la corrección de una salida olvidada
function HistoryPreview() {
  const rows = [
    { name: "Lucía", in: "09:02", out: "17:05" },
    { name: "Martín", in: "12:10", out: "20:00" },
  ]
  return (
    <div className="absolute inset-0 p-4 flex flex-col gap-1.5">
      {rows.map((r) => (
        <div
          key={r.name}
          className="flex items-center gap-2 rounded-md bg-white border border-black/8 px-2.5 py-1.5 text-[11px]"
        >
          <span className="font-medium flex-1 truncate">{r.name}</span>
          <span className="tabular-nums text-black/60">
            {r.in} → {r.out}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-2 rounded-md bg-white border border-black/8 px-2.5 py-1.5 text-[11px]">
        <span className="font-medium flex-1 truncate">Sofi</span>
        <span className="tabular-nums text-black/60">
          20:00 →{" "}
          <span className="text-rose-500 card-on:hidden">sin salida</span>
          <span className="hidden card-on:inline">01:30 +1</span>
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-md bg-amber-50 border border-amber-200 px-2.5 py-1.5 opacity-0 -translate-y-2 transition-all duration-500 delay-200 card-on:opacity-100 card-on:translate-y-0">
        <PencilLine className="size-3 text-amber-700 shrink-0" />
        <span className="text-[10px] font-medium text-amber-900 truncate">Corregido por Ana (encargada)</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Excel para el contador: las horas y los totales se completan
function SpreadsheetPreview() {
  const rows = [
    { name: "Lucía", hours: "168 h", total: "$588.000" },
    { name: "Martín", hours: "142 h", total: "$497.000" },
    { name: "Sofi", hours: "121 h", total: "$423.500" },
    { name: "Nico", hours: "96 h", total: "$336.000" },
  ]
  return (
    <div className="absolute inset-0 p-4 font-mono text-[10px]">
      <div className="grid grid-cols-[1fr_52px_72px] gap-px bg-black/5 rounded-md overflow-hidden border border-black/5">
        <div className="bg-neutral-50 px-2 py-1 text-black/50 font-medium">Empleado</div>
        <div className="bg-neutral-50 px-2 py-1 text-black/50 font-medium">Horas</div>
        <div className="bg-neutral-50 px-2 py-1 text-black/50 font-medium">Total</div>
        {rows.map((r, i) => (
          <div key={r.name} className="contents">
            <div className="bg-white px-2 py-1.5">{r.name}</div>
            <div
              className="bg-white px-2 py-1.5 text-black/70 opacity-0 -translate-x-1 transition-all duration-500 card-on:opacity-100 card-on:translate-x-0"
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              {r.hours}
            </div>
            <div
              className="bg-white px-2 py-1.5 text-emerald-600 opacity-0 -translate-x-1 transition-all duration-500 card-on:opacity-100 card-on:translate-x-0"
              style={{ transitionDelay: `${i * 80 + 400}ms` }}
            >
              {r.total}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-black/50 font-sans">
        <FileSpreadsheet className="size-3" />
        <span>septiembre.xlsx · listo para el contador</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Pulso del día: el empleado elige cómo estuvo su día al salir
function PulsePreview() {
  const moods = ["😞", "🙁", "😐", "🙂", "😄"]
  return (
    <div className="absolute inset-0 p-4 flex flex-col items-center justify-center gap-3">
      <p className="text-[11px] font-medium text-black/70">¿Cómo estuvo tu día?</p>
      <div className="flex gap-2">
        {moods.map((m, i) => (
          <span
            key={i}
            className={`flex size-9 items-center justify-center rounded-full border text-lg transition-all duration-300 ${
              i === 3
                ? "border-black/10 bg-white card-on:scale-115 card-on:border-amber-300 card-on:bg-amber-50"
                : "border-black/10 bg-white card-on:opacity-40"
            }`}
          >
            {m}
          </span>
        ))}
      </div>
      <p className="text-[10px] text-black/50 italic opacity-0 transition-opacity duration-500 delay-200 card-on:opacity-100">
        &quot;Mucho movimiento, pero salió todo bien&quot;
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Cierre de mes: los meses anteriores quedan cerrados
function MonthsPreview() {
  const months = [
    { name: "Agosto", closed: true },
    { name: "Septiembre", closed: true },
    { name: "Octubre", closed: false },
  ]
  return (
    <div className="absolute inset-0 p-4 flex flex-col gap-1.5">
      {months.map((m, i) => (
        <div
          key={m.name}
          className="flex items-center gap-2 rounded-md bg-white border border-black/8 px-2.5 py-2 text-[11px]"
        >
          <span className="font-medium flex-1">{m.name}</span>
          {m.closed ? (
            <span
              className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[9px] text-black/60 transition-colors duration-300 card-on:bg-black card-on:text-white"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <Lock className="size-2.5" />
              Cerrado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              En curso
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Personalización: el kiosco toma los colores de tu marca
function BrandPreview() {
  const swatches = ["bg-neutral-900", "bg-sky-600", "bg-rose-600", "bg-emerald-600"]
  return (
    <div className="absolute inset-0 p-4 flex items-center justify-center gap-4">
      <div className="flex flex-col gap-1.5">
        {swatches.map((s, i) => (
          <span
            key={s}
            className={`size-5 rounded-full ${s} ${i === 2 ? "ring-2 ring-offset-2 ring-black/0 card-on:ring-black/30" : ""} transition-all`}
          />
        ))}
      </div>
      <div className="w-[120px] rounded-xl bg-neutral-900 p-1.5">
        <div className="rounded-lg bg-neutral-800 px-3 py-3 text-center transition-colors duration-500 card-on:bg-rose-700">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/50">Tu local</p>
          <p className="font-serif text-xl text-white tabular-nums">20:15</p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="h-3 rounded bg-white/15" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const features: Feature[] = [
  {
    title: "Cuadro semanal de horarios",
    description: "Armá la semana de cada empleado en una grilla. Guardá turnos como plantillas y aplicalos con un clic.",
    preview: WeeklyPreview,
  },
  {
    title: "Correcciones sin trampa",
    description: "¿Alguien se olvidó de fichar? Lo corregís desde el panel y queda registrado quién hizo el cambio.",
    preview: HistoryPreview,
  },
  {
    title: "Excel para el contador",
    description: "Horas, bonos y descuentos de cada empleado, listos para liquidar. También en PDF.",
    preview: SpreadsheetPreview,
  },
  {
    title: "El pulso de tu equipo",
    description: "Te enterás si tu equipo está quemado antes de que alguien renuncie. Al salir, cada uno cuenta cómo estuvo su día.",
    preview: PulsePreview,
  },
  {
    title: "Cierre de mes en un clic",
    description: "Cerrás el mes en un clic y se lo mandás al contador. Lo cerrado queda guardado y nadie lo puede tocar.",
    preview: MonthsPreview,
  },
  {
    title: "Con la cara de tu local",
    description: "Tu logo, tus colores y tu mensaje en la tablet. Vos decidís si cada empleado puede ver sus horas.",
    preview: BrandPreview,
  },
]

// Fondo de cada tarjeta: tienen que ser opacos porque se apilan una sobre otra
const tones = [
  "bg-white",
  "bg-[#f1f8f4]",
  "bg-[#fdf8ee]",
  "bg-[#f0f6fb]",
  "bg-[#fbf2f3]",
  "bg-[#f5f3fb]",
]

// Las funciones como tarjetas que se apilan al hacer scroll (ScrollStack)
export function FeatureGrid() {
  return (
    <ScrollStack
      useWindowScroll
      className="mt-10 md:mt-12"
      innerClassName="min-h-0! px-0! pt-0! pb-[36vh]! md:pb-[26vh]!"
      itemDistance={40}
      itemStackDistance={22}
      stackPosition="18%"
      scaleEndPosition="10%"
      baseScale={0.9}
      itemScale={0.02}
    >
      {features.map((f, i) => {
        const Preview = f.preview
        return (
          <ScrollStackItem
            key={f.title}
            itemClassName={`${tones[i % tones.length]} h-auto! md:h-[19rem]! p-5! sm:p-7! md:p-9! my-0! rounded-[28px]! border border-black/8 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)]!`}
          >
            <Reveal className="h-full">
              <FeaturePlay className="grid h-full grid-cols-1 md:grid-cols-[1fr_1.1fr] items-center gap-6 md:gap-10">
              <div>
                <span className="font-mono text-xs text-black/35 tabular-nums">
                  {String(i + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl font-medium tracking-tight leading-tight text-balance">
                  {f.title}
                </h3>
                <p className="mt-3 max-w-sm text-[14px] text-black/60 leading-relaxed">{f.description}</p>
                <div className="mt-5 flex items-center gap-1.5 text-[12px] text-black/40 transition-colors duration-500 card-on:text-[var(--brand)]">
                  <CheckCircle2 className="size-3.5" />
                  <span>Incluido en todos los planes</span>
                </div>
              </div>
              <div className="relative h-48 sm:h-52 md:h-full overflow-hidden rounded-2xl border border-black/5 bg-white/80">
                {/* La vista previa está dibujada a 300 × 176 px: se centra y se agranda */}
                <div className="absolute left-1/2 top-1/2 h-44 w-[300px] -translate-x-1/2 -translate-y-1/2 scale-[1.05] sm:scale-[1.15] md:scale-[1.2] lg:scale-[1.3]">
                  <Preview />
                </div>
              </div>
              </FeaturePlay>
            </Reveal>
          </ScrollStackItem>
        )
      })}
    </ScrollStack>
  )
}
