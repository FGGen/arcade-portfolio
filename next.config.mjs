/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/arcade-portfolio',
  assetPrefix: '/arcade-portfolio',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
