/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
};

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig);
