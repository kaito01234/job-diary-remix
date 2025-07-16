import { prisma } from '~/lib/prisma';

// 日記作成の入力型
export type CreateNoteInput = {
  date: Date;
  title?: string;
  content: string;
  tags: string[];
  userId: string;
};

// 日記作成
export async function createNote(data: CreateNoteInput) {
  return await prisma.note.create({
    data: {
      date: data.date,
      title: data.title || null,
      content: data.content,
      userId: data.userId,
      tags: {
        create: data.tags.map(tagName => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName }
            }
          }
        }))
      }
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  });
}