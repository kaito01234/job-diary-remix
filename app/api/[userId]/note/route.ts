// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  const { userId } = params;

  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
  });
  return NextResponse.json(notes);
}

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  const { userId } = params;
  const { date, title, comment } = await req.json();

  const note = await prisma.note.create({
    data: {
      date,
      title,
      comment,
      userId,
    },
  });
  return NextResponse.json(note.id);
}
