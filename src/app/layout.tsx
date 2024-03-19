import type { Metadata } from "next";
import '@/styles/global.scss';
import '@/styles/base/reset.scss';
import { Suspense } from 'react';
import Empty from "@/components/empty/Empty";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  metadataBase: new URL('https://choding.vercel.app/'),
  title: "초딩 - 초보들의 코딩공부",
  description: "팀곰문곰팀의 초딩 웹사이트입니다.",
  openGraph: {
    title: '초딩 - 초보들의 코딩공부',
    description: '팀곰문곰팀의 초딩 웹사이트입니다.',
    images: '/choding.png'
  },
  twitter: {
    title: '초딩 - 초보들의 코딩공부',
    description: '팀곰문곰팀의 초딩 웹사이트입니다.',
    images: '/choding.png'
  },
  icons: {
    icon: '/favicon-16x16.png',
    apple: '/favicon-16x16.png',
    shortcut: '/choding.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/favicon-32x32.png',
    }
  },
  keywords: ['next', 'react', 'routing'],
  authors: [{ name: '팀 곰문곰' }],
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
    }
  }
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko">
      <body>
        <Suspense>
          <Empty>{children}</Empty>
        </Suspense>
      </body>
    </html>
  );
}
