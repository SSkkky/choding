// src/app/api/mongodb/[postId]/route.ts
import { connectToDB } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: any) {
  try {
    const collection: string | null = req.nextUrl.searchParams.get('colName');
    const postId: number = params.postId;
    const data = await connectToDB('detail', { postId: postId }, collection, null);
    return NextResponse.json(data);

  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const collection: any = req.nextUrl.searchParams.get('colName');
  const data = await req.json()
  return NextResponse.json(await connectToDB('post', data, collection, null));
}

export async function DELETE(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  const idx = pathname.split('/').pop();
  const collection: any = req.nextUrl.searchParams.get('colName');
  const body = {postId : Number(idx)}
  return NextResponse.json(await connectToDB('delete', body, collection, null));
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  const idx = pathname.split('/').pop();
  const collection: any = req.nextUrl.searchParams.get('colName');
  const data = await req.json();

  console.log('----------------------')
  console.log(idx, collection, data)
  console.log('----------------------')

  return NextResponse.json(await connectToDB('put', data, collection, idx));
}
