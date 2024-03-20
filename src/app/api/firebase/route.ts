import { NextRequest, NextResponse } from "next/server";
import admin, { ServiceAccount } from 'firebase-admin';

interface NotificationData {
    data: {
        title: string;
        body: string;
        image: string;
        icon: string;
        click_action: string;
    },
    token: string
}

const sendFCMNotification = async (data: NotificationData) => {
    const serviceAccount: ServiceAccount = {
        projectId: process.env.NEXT_PUBLIC_PROJECTID,
        privateKey: process.env.NEXT_PUBLIC_PRIVATEKEY,
        clientEmail: process.env.NEXT_PUBLIC_CLIENTEMAIL,
    };

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    const res = await admin.messaging().send(data);
    return res;
};

export async function POST(req: NextRequest) {
    const { message } = await req.json();
    const fcmNoti = await sendFCMNotification(message);
    return NextResponse.json([]);
};