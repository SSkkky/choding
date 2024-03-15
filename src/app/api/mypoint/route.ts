import { connectToDB } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email');
    const getPoint = await connectToDB('get', email, 'myPoint', null);
    return NextResponse.json(getPoint);
}


export async function POST(req: NextRequest) {
    console.log('point---------------------')
    const body = await req.json();
    connectToDB('post', body, 'myPoint', null);
    return NextResponse.json([]);
}


export async function PUT(req: NextRequest) {
    const body = await req.json();
    console.log(body)
    connectToDB('put', body, 'myPoint', null);
    return NextResponse.json([]);
}