import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import NaverProvider from "next-auth/providers/naver";
import { saveUserToMongoDB } from '@/app/utils/saveUserToMongoDB';

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
        }),
        NaverProvider({
            clientId: process.env.NEXT_PUBLIC_NAVER_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_NAVER_SECRET as string,
        }),
        CredentialsProvider({
            id: "credentials",
            name: 'Credentials',
            credentials: {
                email: { label: "userEmail", type: "email" },
                password: { label: "userPassaword", type: "password" },
                name: { label: "Name", type: "text" },
                level: { label: "Level", type: "text" },
                image: { label: "Image URL", type: "text" },
            },
            authorize: (credentials, req) => {
                if (credentials) {
                    const user = req.body?.body;
                    if (user) {
                        return JSON.parse(user);
                    } else {
                        return null;
                    }
                }
                return null;
            },
        })

    ], 
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 //30일
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user }) {
            const checkUser =  await saveUserToMongoDB(user);
            return true;
        },
        async jwt({ token, user }: any) {
            return {...token, ...user};
        },
        async session({ session, token }: any) {            
            session.user = token;
            return session;
        },
    }
}