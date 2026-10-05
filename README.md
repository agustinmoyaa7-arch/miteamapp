# MiTeam · Landing

Web de presentación de **MiTeam**, el sistema de fichaje de personal para PyMEs (gastronomía, hotelería y comercio).

Next.js 16 · React 19 · Tailwind 4. Se exporta como **HTML estático** (`out/`), así que se puede subir a cualquier hosting, incluido el plan Premium de Hostinger.

## Comandos

```bash
npm install        # instalar dependencias (una sola vez)
npm run dev        # ver la web en http://localhost:3000
npm run build      # generar la versión para subir, en la carpeta out/
npm run typecheck  # revisar errores de tipos
```

> No corras `npm run build` con `npm run dev` abierto: si después el dev da 404, cerralo, borrá la carpeta `.next` y volvé a abrirlo.

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| WhatsApp, email, link de "Ingresar", planes y precios, condiciones | `lib/site.ts` |
| Preguntas frecuentes | `lib/faqs.ts` |
| Palabras que rotan en el título | `components/hero-title.tsx` |
| Demo del kiosco (nombres, tiempos) | `components/kiosk-demo.tsx` |
| Secciones del menú | `components/use-active-section.ts` |
| Colores de los botones | `components/cta-button.tsx` |

## Publicar en Hostinger

1. `npm run build`
2. Subir **el contenido** de la carpeta `out/` (no la carpeta en sí) a `public_html`. Incluye un `.htaccess` que fuerza https y saca el `www`.
