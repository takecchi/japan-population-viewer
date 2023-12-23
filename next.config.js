const { withKumaUI } = require('@kuma-ui/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
};

module.exports = withKumaUI(nextConfig);
