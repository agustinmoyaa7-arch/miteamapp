import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import { FAQS } from '@/lib/faqs'
import { EMAIL, PLANS, SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
})

const TITLE = `${SITE_NAME} · Fichaje de personal para tu local`
const DESCRIPTION =
  'Dejá la planilla. Tus empleados fichan con un PIN en la tablet del local y vos ves tardanzas, ausencias y horas extra contra el horario que armaste. Sin relojes ni huellas. Probalo gratis 14 días.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'fichaje de personal',
    'control de asistencia',
    'reloj de fichaje',
    'control horario empleados',
    'planilla de horarios',
    'fichaje gastronomía',
    'control de asistencia PyME',
    'horas extra empleados',
    'Argentina',
    'Córdoba',
    'Villa Carlos Paz',
  ],
  authors: [{ name: 'New Wave' }],
  creator: 'New Wave',
  publisher: 'New Wave',
  category: 'Business',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/pixel-landscape.jpg',
        width: 1024,
        height: 1024,
        alt: `${SITE_NAME}: fichaje de personal para PyMEs`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/pixel-landscape.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: EMAIL,
      logo: `${SITE_URL}/icon.svg`,
      areaServed: 'AR',
    },
    {
      '@type': 'SoftwareApplication',
      name: SITE_NAME,
      operatingSystem: 'Web',
      applicationCategory: 'BusinessApplication',
      url: SITE_URL,
      description: DESCRIPTION,
      inLanguage: 'es-AR',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'ARS',
        lowPrice: 0,
        highPrice: Math.max(...PLANS.map((p) => p.monthly)),
        offerCount: PLANS.length + 1,
      },
      featureList: [
        'Fichaje con PIN en tablet o PC',
        'Cuadro semanal de horarios',
        'Reporte de lo planificado contra lo fichado',
        'Correcciones con auditoría',
        'Exportación a Excel y PDF',
        'Cierre de mes',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" className={`${geist.variable} ${geistMono.variable} ${fraunces.variable} bg-white`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-[#0A0A0A]">{children}</body>
    </html>
  )
}
