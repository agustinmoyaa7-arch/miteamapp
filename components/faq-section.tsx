import { Reveal } from "@/components/reveal"
import { FAQS } from "@/lib/faqs"

export function FaqSection() {
  return (
    <section id="preguntas" aria-labelledby="faq-heading" className="py-16 md:py-24 scroll-mt-20">
      <div className="mx-auto max-w-3xl">
        <Reveal as="header" className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-black/50">Preguntas</p>
          <h2
            id="faq-heading"
            className="mt-3 font-serif text-3xl md:text-4xl font-medium tracking-tight text-balance"
          >
            <span className="marker">Lo que más nos preguntan</span>
          </h2>
        </Reveal>
        <dl className="divide-y divide-black/10 border-y border-black/10">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 60} className="py-6">
              <dt className="font-semibold text-base leading-snug text-balance">{item.q}</dt>
              <dd className="mt-2 text-sm text-black/65 leading-relaxed">{item.a}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
