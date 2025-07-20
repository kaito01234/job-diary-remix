import { PrismaClient } from "@prisma/client";
import createPrismaMock from "prisma-mock";

// Prismaのモッククライアントを作成
export const prismaMock = createPrismaMock<PrismaClient>();

// テスト間でデータをリセットするヘルパー
export const resetPrismaMock = () => {
  // prisma-mockは自動的に各テスト間でデータをリセットしてくれる
  // 必要に応じて追加のリセット処理をここに記述
};
