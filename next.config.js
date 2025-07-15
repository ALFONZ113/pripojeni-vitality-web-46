
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // For static export to Netlify
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true // Required for static export
  },
  webpack: (config) => {
    // Optimize build for Netlify
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
  // Redirect configuration for old paths
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
