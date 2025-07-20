import "@testing-library/jest-dom";
import { vi } from "vitest";

// Prismaのモックをセットアップ
vi.mock("~/lib/prisma", async () => {
  const { prismaMock } = await import("./mocks/prisma");
  return {
    prisma: prismaMock,
  };
});

// グローバルなテストユーティリティ
declare global {
  let testHelpers: {
    mockDate: (date: Date) => void;
    cleanup: () => void;
  };
}

globalThis.testHelpers = {
  // 日付のモック用ヘルパー
  mockDate: (date: Date) => {
    vi.useFakeTimers();
    vi.setSystemTime(date);
  },

  // テスト後のクリーンアップ
  cleanup: () => {
    vi.useRealTimers();
    vi.clearAllMocks();
  },
};
