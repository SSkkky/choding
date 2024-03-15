// src/app/api/google/route.ts

import type { NextRequest } from 'next/server';
import { googleSearch } from '@/lib/googleSearch';

export async function GET(req: NextRequest) {
  // console.log('---------------------');
  // console.log(req.nextUrl.searchParams);

  const query = req.nextUrl.searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ message: '400!! 검색어 쿼리가 없어용' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const results = await googleSearch(query);
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: '500!! 서버 내부 에러' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
