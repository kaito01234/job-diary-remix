// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllNotes() {
  const notes = await prisma.notes.findMany();
  return notes;
}

export async function GET() {
  const notes = await getAllNotes();
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const { date, title, comment } = await req.json();

  await prisma.notes.create({
    data: {
      date,
      title,
      comment,
    },
  });

  const notes = await getAllNotes();
  return NextResponse.json(notes);
}

export async function PUT(req: NextRequest) {
  const { id, date, title, comment } = await req.json();

  await prisma.notes.update({
    data: {
      date,
      title,
      comment,
    },
    where: {
      id: id,
    },
  });

  const notes = await getAllNotes();
  return NextResponse.json(notes);
}
