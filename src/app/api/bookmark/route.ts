import { connectToDB } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const collection: any = req.nextUrl.searchParams.get('colName');
    const data = await connectToDB('get', 0, collection, null);
    return NextResponse.json(data)
}


export async function POST(req: NextRequest) {
    console.log('point---------------------')
    const body = await req.json();
    connectToDB('post', body, 'myStudy', null);
    return NextResponse.json([]);
}


export async function PUT(req: NextRequest) {
    const body = await req.json();
    console.log(body)
    connectToDB('put', body, 'myStudy', null);
    return NextResponse.json([]);
}