import SpecularButton from "@/components/ui/specular-button"

type CtaButtonProps = {
  children: React.ReactNode
  /** Link al que lleva. Sin href se dibuja como botón y usa onClick. */
  href?: string
  onClick?: () => void
  type?: "button" | "submit"
  variant?: "primary" | "secondary" | "inverted"
  size?: "sm" | "md" | "lg"
  /** El brillo gira solo, sin esperar al mouse. Para el botón principal de cada bloque. */
  autoAnimate?: boolean
  /** Abre en una pestaña nueva (WhatsApp). */
  newTab?: boolean
  className?: string
}

// Botones generales de la landing: SpecularButton con los colores de la marca.
const variants = {
  // Negro con brillo verde
  primary: {
    tint: "#0A0A0A",
    tintOpacity: 1,
    textColor: "#ffffff",
    lineColor: "#5ee69b",
    baseColor: "#3f3f46",
    shadow: "0 10px 28px -10px rgba(10, 10, 10, 0.55)",
  },
  // Blanco con borde gris y brillo verde
  secondary: {
    tint: "#ffffff",
    tintOpacity: 1,
    textColor: "#0A0A0A",
    lineColor: "#2f9e5f",
    baseColor: "#b5b5b5",
    shadow: "0 6px 18px -10px rgba(10, 10, 10, 0.25)",
  },
  // Blanco sobre fondo negro (tarjeta de precio destacada)
  inverted: {
    tint: "#ffffff",
    tintOpacity: 1,
    textColor: "#0A0A0A",
    lineColor: "#5ee69b",
    baseColor: "#ffffff",
    shadow: "0 6px 18px -10px rgba(0, 0, 0, 0.6)",
  },
}

export function CtaButton({
  children,
  href,
  variant = "primary",
  size = "sm",
  autoAnimate = false,
  newTab = false,
  className,
  onClick,
  type = "button",
}: CtaButtonProps) {
  const v = variants[variant]
  return (
    <SpecularButton
      href={href}
      onClick={onClick}
      type={type}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      size={size}
      radius={999}
      tint={v.tint}
      tintOpacity={v.tintOpacity}
      textColor={v.textColor}
      lineColor={v.lineColor}
      baseColor={v.baseColor}
      thickness={1.4}
      shineSize={14}
      autoAnimate={autoAnimate}
      className={className}
      style={{ "--sb-shadow": v.shadow } as React.CSSProperties}
    >
      {children}
    </SpecularButton>
  )
}
