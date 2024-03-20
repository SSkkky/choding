/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'firebasestorage.googleapis.com', 'blog.kakaocdn.net', 'd2u3dcdbebyaiu.cloudfront.net', 'i.pinimg.com', 'i.namu.wiki', 'localhost', 'encrypted-tbn0.gstatic.com', 'encrypted-tbn1.gstatic.com', 'encrypted-tbn2.gstatic.com', 'encrypted-tbn3.gstatic.com', 'encrypted-tbn4.gstatic.com', 'encrypted-tbn5.gstatic.com', 'gstatic.com'],
  },
};

const nextConfigFunction = async (phase) => {
  const withPWA = (await import("@ducanh2912/next-pwa")).default({
    dest: "public", //서비스워커 출력 디렉토리
    cacheOnFrontEndNav: true, //캐싱활성화
    aggressiveFrontEndNavCaching: true,  //프론트화면 <link><script>..등을 캐싱
    reloadOnOnline: true,  //온라인상태가 되면 다시 로드
    swcMinify: true, //swc컴파일러 사용(babel보다 성능이 뛰어남)
    disable: false,  //pwa 비활성화
    workboxOptions: { disableDevLogs: true },
    //webpack 플러그인을 내부적으로 사용하는 경우 설정         
  });
  return withPWA(nextConfig);
};

export default nextConfigFunction;

