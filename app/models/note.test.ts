import { describe, it, expect } from "vitest";
import { createNote } from "./note";

// TODO:
// - [ ] 日記を作成できる
// - [ ] タイトルは省略可能
// - [ ] 本文は必須
// - [ ] 日付は必須
// - [ ] タグを複数追加できる
// - [ ] 同じ日付の日記は1つまで
// - [ ] ユーザーIDが必須

describe("createNote", () => {
  it("必要な情報を指定して日記を作成できる", async () => {
    // Arrange
    const noteData = {
      date: new Date("2025-01-15"),
      title: "今日の学び",
      content:
        "TDDについて学んだ。レッド・グリーン・リファクタリングのサイクルが大切。",
      tags: ["TDD", "Testing"],
      userId: "user123",
    };

    // Act
    const note = await createNote(noteData);

    // Assert - アサーションファースト
    expect(note.content).toBe(
      "TDDについて学んだ。レッド・グリーン・リファクタリングのサイクルが大切。",
    );
    expect(note.title).toBe("今日の学び");
    expect(note.date).toEqual(new Date("2025-01-15"));
    expect(note.tags).toHaveLength(2);
    expect(note.userId).toBe("user123");
    expect(note.id).toBeDefined();
  });

  it("タイトルなしで日記を作成できる", async () => {
    // Arrange
    const noteData = {
      date: new Date("2025-01-15"),
      content: "タイトルを設定しない日記",
      tags: [],
      userId: "user123",
    };

    // Act
    const note = await createNote(noteData);

    // Assert
    expect(note.title).toBeNull();
    expect(note.content).toBe("タイトルを設定しない日記");
    expect(note.tags).toEqual([]);
  });
});
