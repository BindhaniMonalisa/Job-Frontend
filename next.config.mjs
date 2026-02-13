/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Falls back to production backend URL if NEXT_PUBLIC_API_URL is not set
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://job-backend-ruby.vercel.app';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ]
  },
};

export default nextConfig;
