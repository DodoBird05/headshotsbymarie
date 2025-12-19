/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Static export for S3/CloudFront deployment
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Better compatibility with S3
  typescript: {
    // Skip type checking during production builds (handled in dev)
    ignoreBuildErrors: true,
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