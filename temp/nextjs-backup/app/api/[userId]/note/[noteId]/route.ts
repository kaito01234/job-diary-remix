// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/libs/prisma';

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { userId: string; noteId: string };
  }
) {
  const { userId, noteId } = params;

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (note?.userId !== userId) return new NextResponse('', { status: 401 });
  return NextResponse.json(note);
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { userId: string; noteId: string };
  }
) {
  const { userId, noteId } = params;
  const { date, title, comment } = await req.json();

  const note = await prisma.note.update({
    data: {
      date,
      title,
      comment,
      userId,
    },
    where: {
      id: noteId,
    },
  });

  if (note?.userId !== userId) return new NextResponse('', { status: 401 });
  return NextResponse.json(note.id);
}
