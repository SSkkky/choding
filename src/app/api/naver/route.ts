import { NextResponse, NextRequest } from "next/server";
import axios from 'axios';



export async function GET(req: NextRequest) {

    const client_id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const client_secret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;

    const q = req.nextUrl.searchParams.get('q')


    const result = await axios({
        url: 'https://openapi.naver.com/v1/search/blog.json',
        method: 'get',
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
        params: {
            query: q,
            display: 6
        }
    });
    // console.log("시작입니다")

    return NextResponse.json(result.data);
}