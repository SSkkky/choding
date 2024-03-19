"use client"
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { SessionProvider } from 'next-auth/react';
import UserQuestion from "@/components/question/Question";

export default function Empty({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <SessionProvider>
            <Header />
            <UserQuestion />
            {children}
            <Footer />
        </SessionProvider>
    );
}
