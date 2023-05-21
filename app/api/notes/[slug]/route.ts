// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getNote(slug: number) {
  const note = await prisma.notes.findUnique({
    where: {
      id: slug,
    },
  });
  return note;
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const { slug } = params;
  const note = await getNote(Number(slug));
  return NextResponse.json(note);
}
