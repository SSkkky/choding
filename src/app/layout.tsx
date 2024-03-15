"use client";

import type { Metadata } from "next";
import '@/styles/global.scss';
import '@/styles/base/reset.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { SessionProvider } from 'next-auth/react';
import UserQuestion from "@/components/question/Question";
import { Suspense } from 'react';

// export const metadata: Metadata = {
//   title: "초딩 - 초보들의 코딩공부",
//   description: "팀곰문곰팀의 초딩 웹사이트입니다.",
// };

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko">
      <body>
        <Suspense>
          <SessionProvider>
            <Header />
            <UserQuestion />
            {children}
            <Footer />
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
