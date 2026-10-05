// Todos los datos que cambian seguido viven acá: nombre, contacto, links y precios.

export const SITE_NAME = 'MiTeam'
export const SITE_URL = 'https://miteam.online'
export const EMAIL = 'hola@miteam.online'

// Número de WhatsApp en formato internacional, sin "+" ni espacios (ej: 5493541123456).
// PENDIENTE: cargar el número real.
export const WHATSAPP_NUMBER = '5493540000000'

// Dirección del panel de la app (botón "Ingresar").
export const APP_LOGIN_URL = 'https://app.miteam.online/admin'

export const TRIAL_DAYS = 14

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const TRIAL_MESSAGE = `Hola! Quiero probar ${SITE_NAME} gratis ${TRIAL_DAYS} días en mi local.`

export function formatARS(value: number) {
  return value === 0 ? '$0' : `$${value.toLocaleString('es-AR')}`
}

// ── Planes y precios (ARS) ────────────────────────────────────────────────

export type Billing = 'monthly' | 'annual'

export type Plan = {
  id: 'local' | 'equipo' | 'empresa'
  name: string
  employees: number
  /** Precio por mes pagando mes a mes */
  monthly: number
  /** Total del año pagando anual (2 meses de regalo) */
  annual: number
  terminals: string
  users: string
  support: string
  highlight?: boolean
}

/** Descuento del pago anual, igual en todos los planes (2 meses de regalo). */
export const ANNUAL_DISCOUNT = 17

export const PLANS: Plan[] = [
  {
    id: 'local',
    name: 'Local',
    employees: 8,
    monthly: 18000,
    annual: 180000,
    terminals: '2 tablets',
    users: 'Dueño + 1 encargado',
    support: 'Soporte por WhatsApp',
  },
  {
    id: 'equipo',
    name: 'Equipo',
    employees: 25,
    monthly: 35000,
    annual: 348000,
    terminals: '5 tablets',
    users: 'Hasta 5 usuarios del panel',
    support: 'WhatsApp prioritario',
    highlight: true,
  },
  {
    id: 'empresa',
    name: 'Empresa',
    employees: 50,
    monthly: 60000,
    annual: 600000,
    terminals: 'Tablets sin límite',
    users: 'Usuarios sin límite',
    support: 'Alta asistida incluida',
  },
]

/** Precio mensual equivalente pagando anual */
export const annualPerMonth = (plan: Plan) => Math.round(plan.annual / 12)
/** Lo que se ahorra en el año pagando anual */
export const annualSavings = (plan: Plan) => plan.monthly * 12 - plan.annual

export const FREE_PLAN = { employees: 3 }
export const CUSTOM_PLAN = { fromEmployees: 50 }

/** Funciones que traen todos los planes pagos (el Gratis solo trae la primera). */
export const PAID_FEATURES = [
  'Kiosco con PIN, historial y totales',
  'Cuadro semanal y turnos',
  'Plan vs. real: tardanzas, ausencias y horas extra',
  'Cierre de mes con Excel y PDF',
  'Pulso diario del equipo',
  'Colores y logo propios',
]

/** Tabla comparativa completa. true = incluido, false = no, texto = detalle. */
export const COMPARISON: { label: string; values: (boolean | string)[] }[] = [
  { label: 'Empleados', values: ['Hasta 3', 'Hasta 8', 'Hasta 25', 'Hasta 50', 'Más de 50'] },
  { label: 'Kiosco con PIN, historial y totales', values: [true, true, true, true, true] },
  { label: 'Cuadro semanal y turnos', values: [false, true, true, true, true] },
  { label: 'Plan vs. real (tardanzas, ausencias, horas extra)', values: [false, true, true, true, true] },
  { label: 'Cierre de mes con Excel y PDF', values: [false, true, true, true, true] },
  { label: 'Pulso diario del equipo', values: [false, true, true, true, true] },
  { label: 'Colores y logo propios', values: [false, true, true, true, true] },
  { label: 'Terminales (tablets)', values: ['1', '2', '5', 'Sin límite', 'Sin límite'] },
  { label: 'Usuarios del panel', values: ['Solo el dueño', 'Dueño + 1 encargado', 'Hasta 5', 'Sin límite', 'Sin límite'] },
  {
    label: 'Soporte',
    values: ['Mail', 'WhatsApp', 'WhatsApp prioritario', 'Alta asistida incluida', 'Alta asistida + soporte dedicado'],
  },
]
export const COMPARISON_PLANS = ['Gratis', 'Local', 'Equipo', 'Empresa', 'A medida']

export const CONDITIONS = [
  `${TRIAL_DAYS} días de prueba con todo incluido, sin tarjeta. Al terminar, elegís un plan o pasás al Gratis.`,
  'Los precios mensuales se actualizan cada 3 meses. El anual queda congelado por los 12 meses pagados.',
  'Alta asistida gratis para los primeros 10 clientes. Después, $25.000 por única vez en Local y Equipo.',
  'Pago mensual con suscripción de Mercado Pago. Pago anual por transferencia bancaria.',
]
