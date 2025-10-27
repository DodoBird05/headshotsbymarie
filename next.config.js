/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Required for Docker deployment
  typescript: {
    // Skip type checking during production builds (handled in dev)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint during production builds (handled in dev)
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Reduce memory usage by optimizing common imports
    optimizePackageImports: ['lucide-react'],
  },
  // Better error handling and memory management
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,      // Keep pages in memory for 1 minute
    pagesBufferLength: 5,           // Limit concurrent page compilation
  },
}

module.exports = nextConfig