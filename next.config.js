/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
}

module.exports = nextConfig
