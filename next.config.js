/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/chat',
            destination: process.env.CORE_SERVICE,
          },
        ]
      },
}

module.exports = nextConfig
