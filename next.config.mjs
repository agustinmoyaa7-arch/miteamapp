/** @type {import('next').NextConfig} */
const nextConfig = {
  // La landing se exporta como HTML estático (carpeta `out/`), así se puede
  // subir a cualquier hosting, incluso el plan de Hostinger que no corre Node.
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
