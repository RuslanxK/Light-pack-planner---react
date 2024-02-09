/** @type {import('next').NextConfig} */


const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  
    images: {
      domains: ['images.unsplash.com', 'platform-lookaside.fbsbx.com', 'lh3.googleusercontent.com'],
    },

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

  export default nextConfig;