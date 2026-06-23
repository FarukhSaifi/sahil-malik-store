import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  compiler: {
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-slot",
      "class-variance-authority",
    ],
    inlineCss: true,
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,
  },

  turbopack: {
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [256, 384, 512, 640],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-DNS-Prefetch-Control", value: "on" }],
      },
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  allowedDevOrigins: ["localhost:3000", "*.localhost:3000"],
};

export default nextConfig;
