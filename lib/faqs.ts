import { ANNUAL_DISCOUNT, FREE_PLAN, SITE_NAME, TRIAL_DAYS } from './site'

export const FAQS = [
  {
    q: `¿Qué es ${SITE_NAME}?`,
    a: `Un sistema de fichaje para PyMEs. Tus empleados marcan entrada y salida con un PIN en una tablet o PC del local, y vos ves desde el panel quién llegó tarde, quién faltó y cuántas horas hizo cada uno, comparado con el horario que armaste.`,
  },
  {
    q: '¿Tengo que comprar un reloj o un lector de huellas?',
    a: 'No. Alcanza con cualquier tablet, celular viejo o PC con internet. No usamos huellas ni fotos: cada empleado tiene su PIN de 4 dígitos, sin datos biométricos.',
  },
  {
    q: '¿Qué pasa si se corta internet?',
    a: 'El kiosco muestra una pantalla de espera y reintenta solo. Ningún fichaje se pierde. Si alguien se olvida de fichar la salida, el encargado lo corrige desde el panel y queda registrado quién hizo el cambio.',
  },
  {
    q: '¿Sirve para turnos de noche?',
    a: 'Sí. Un turno que arranca a las 20 y termina a las 2 de la mañana se registra como una sola jornada, sin partirla en dos días.',
  },
  {
    q: '¿Le sirve a mi contador?',
    a: 'Sí. A fin de mes cerrás el período y exportás a Excel o PDF las horas de cada empleado, con bonos y descuentos incluidos. El mes cerrado queda guardado y no se puede tocar sin reabrirlo.',
  },
  {
    q: '¿Cómo es la prueba gratis?',
    a: `Tenés ${TRIAL_DAYS} días con todas las funciones, sin tarjeta. Te ayudamos a cargar a tu equipo y a dejar la tablet lista. Al terminar elegís un plan o pasás al plan Gratis: si no te convence, no pagás nada.`,
  },
  {
    q: '¿Hay un plan gratis?',
    a: `Sí. Si tenés hasta ${FREE_PLAN.employees} empleados, usás el kiosco con PIN, el historial y los totales gratis para siempre, con una tablet.`,
  },
  {
    q: '¿Cómo se paga? ¿Aumentan los precios?',
    a: `Podés pagar mes a mes con Mercado Pago o anual por transferencia, con ${ANNUAL_DISCOUNT}% de descuento (dos meses de regalo). Los precios mensuales se actualizan cada 3 meses; el anual queda congelado por los 12 meses que pagaste.`,
  },
]
