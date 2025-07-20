import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    // 開発用のテストユーザーを作成
    const user = await prisma.user.upsert({
      where: { id: "temp-user-id" },
      update: {},
      create: {
        id: "temp-user-id",
        email: "test@example.com",
        name: "テストユーザー",
      },
    });

    console.log("✅ Seed data created successfully");
    console.log("📝 Test user:", user);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();