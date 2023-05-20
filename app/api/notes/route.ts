// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function getAllNotes() {
  const notes = await prisma.notes.findMany();
  return notes;
}

export async function GET() {
  const notes = await getAllNotes();
  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  const { content } = await request.json();

  await prisma.notes.create({
    data: {
      content: content,
    },
  });

  const notes = await getAllNotes();
  return NextResponse.json(notes);
}
