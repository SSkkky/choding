import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();      
    return NextResponse.json(await connectToDB('post', data, `qna`,null));
}