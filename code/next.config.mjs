/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'hgslpyhghpqsouzsavjb.supabase.co',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
