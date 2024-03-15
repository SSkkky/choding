import { connectToDB } from '@/lib/mongodb';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const collection: any = req.nextUrl.searchParams.get('colName');
    const email: any = req.nextUrl.searchParams.get('email');
    if (collection === 'myPoint') {
        const data = await connectToDB('get', email, collection, null);
        return NextResponse.json(data)
    }
    const data = await connectToDB('get', 0, collection, null);
    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
    const collection: any = req.nextUrl.searchParams.get('colName');
    const data = await req.json()
    return NextResponse.json(await connectToDB('post', data, collection, null));
}