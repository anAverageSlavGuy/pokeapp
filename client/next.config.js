/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: "../tsconfig.json"
  },
  images: {
    domains: ['raw.githubusercontent.com'],
    loader: 'custom',
    path: '/'
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/team/list',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
