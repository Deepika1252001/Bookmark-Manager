import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const tag = searchParams.get('tag');

  let where = {};

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { url: { contains: search } },
    ];
  }

  if (tag) {
    where.tag = tag;
  }

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookmarks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, url, tag } = body;

    if (!title || !url || !tag) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        title,
        url,
        tag,
      },
    });

    return NextResponse.json(bookmark, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create bookmark' }, { status: 500 });
  }
}
