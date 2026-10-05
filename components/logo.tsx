// Marca provisoria: un reloj con la aguja marcando, dentro de un cuadrado redondeado.
export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#0A0A0A" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#fff" strokeWidth="2.2" />
      <path d="M16 10.5V16l3.6 2.4" fill="none" stroke="#FBBF24" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}
