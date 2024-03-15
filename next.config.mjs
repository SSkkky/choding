/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'firebasestorage.googleapis.com', 'blog.kakaocdn.net', 'd2u3dcdbebyaiu.cloudfront.net', 'i.pinimg.com', 'i.namu.wiki', 'localhost', 'encrypted-tbn0.gstatic.com', 'encrypted-tbn1.gstatic.com', 'encrypted-tbn2.gstatic.com', 'encrypted-tbn3.gstatic.com', 'encrypted-tbn4.gstatic.com', 'encrypted-tbn5.gstatic.com', 'gstatic.com'],
  },
};

export default nextConfig;

