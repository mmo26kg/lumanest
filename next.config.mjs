/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const supbaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', supbaseUrl?.replace('https://', '').replace('/', '')],
  },
};

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig);
