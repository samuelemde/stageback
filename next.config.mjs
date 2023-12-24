await import("./src/env.mjs");

const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    windowHistorySupport: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/f/**',
      },
    ],
  },
};

export default withBundleAnalyzer(config);
