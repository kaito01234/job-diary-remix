import { prisma } from "~/lib/prisma";

// 日記作成の入力型
export type CreateNoteInput = {
  date: Date;
  content: string;
  tags: string[];
  userId: string;
};

// 日記作成
export async function createNote(data: CreateNoteInput) {
  // 重複タグを除去
  const uniqueTags = [...new Set(data.tags)];

  return await prisma.note.create({
    data: {
      date: data.date,
      title: null,
      content: data.content,
      userId: data.userId,
      tags: {
        create: uniqueTags.map((tagName) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName },
            },
          },
        })),
      },
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
}
