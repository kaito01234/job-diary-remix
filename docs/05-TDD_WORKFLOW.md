# TDD開発ワークフロー

## t_wadaさんスタイルのTDD

### 基本原則

1. **テストファースト**: 実装の前に必ずテストを書く
2. **アサーションファースト**: 期待値（expect）から書き始める
3. **仮実装**: まずはベタ書きで通す
4. **三角測量**: 複数の具体例から一般化
5. **リファクタリング**: 重複を除去し、意図を明確に

### 開発の流れ

```
1. TODOリストを作る
2. テストを1つ選ぶ
3. Red: 失敗するテストを書く
4. Green: 最小限の実装で通す
5. Refactor: 重複を除去する
6. 1に戻る
```

## 実践例：日記作成機能

### Step 1: TODOリスト作成

```typescript
// TODO:
// - [ ] 日記を作成できる
// - [ ] タイトルは省略可能
// - [ ] 本文は必須
// - [ ] 日付は必須
// - [ ] タグを複数追加できる
// - [ ] 同じ日付の日記は1つまで
```

### Step 2: 最初のテスト（Red）

```typescript
// app/models/note.test.ts
import { describe, it, expect } from "vitest";
import { createNote } from "./note";

describe("createNote", () => {
  it("日記を作成できる", async () => {
    // Arrange（準備）
    const noteData = {
      date: new Date("2025-01-15"),
      title: "今日の学び",
      content: "TDDについて学んだ",
      tags: ["TDD", "Testing"],
      userId: "user123",
    };

    // Act（実行）
    const note = await createNote(noteData);

    // Assert（検証）- アサーションファースト
    expect(note.content).toBe("TDDについて学んだ");
    expect(note.title).toBe("今日の学び");
    expect(note.date).toEqual(new Date("2025-01-15"));
    expect(note.tags).toEqual(["TDD", "Testing"]);
  });
});
```

### Step 3: 仮実装（Green）

```typescript
// app/models/note.ts
export async function createNote(data: any) {
  // 仮実装：ベタ書きで返す
  return {
    id: "1",
    date: data.date,
    title: data.title,
    content: data.content,
    tags: data.tags,
    userId: data.userId,
  };
}
```

### Step 4: 三角測量

```typescript
// 2つ目の例を追加
it("タイトルなしで日記を作成できる", async () => {
  const noteData = {
    date: new Date("2025-01-15"),
    content: "タイトルなしの日記",
    tags: [],
    userId: "user123",
  };

  const note = await createNote(noteData);

  expect(note.title).toBeNull();
  expect(note.content).toBe("タイトルなしの日記");
});
```

### Step 5: 一般化（Refactor）

```typescript
// app/models/note.ts
import { prisma } from "~/lib/prisma";

export async function createNote(data: CreateNoteInput) {
  // 実際のDB操作に置き換え
  return await prisma.note.create({
    data: {
      date: data.date,
      title: data.title || null,
      content: data.content,
      userId: data.userId,
      tags: {
        connectOrCreate: data.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: {
      tags: true,
    },
  });
}
```

## テストの構成

### ディレクトリ構造

```
app/
├── models/
│   ├── note.ts
│   └── note.test.ts
├── routes/
│   ├── notes.new.tsx
│   └── notes.new.test.tsx
└── lib/
    ├── validations/
    │   ├── note.ts
    │   └── note.test.ts
    └── utils/
        ├── date.ts
        └── date.test.ts
```

### テストの種類

1. **ユニットテスト**
   - モデルのビジネスロジック
   - ユーティリティ関数
   - バリデーション

2. **インテグレーションテスト**
   - Remixのloader/action
   - データベース操作
   - 認証フロー

3. **E2Eテスト**（将来）
   - ユーザーシナリオ
   - 画面遷移
   - フォーム操作

## テスト作成のルール

### 1. テストケースの命名

```typescript
// ❌ Bad
it("test note creation", () => {});

// ✅ Good - 日本語で仕様を表現
it("必須項目が入力されていない場合はエラーを返す", () => {});
```

### 2. AAA（Arrange-Act-Assert）パターン

```typescript
it("タグ名は正規化される", () => {
  // Arrange: 準備
  const input = { tags: ["React", "REACT", "react"] };

  // Act: 実行
  const normalized = normalizeTags(input.tags);

  // Assert: 検証
  expect(normalized).toEqual(["react"]);
});
```

### 3. 1テスト1アサーション原則

```typescript
// ❌ Bad - 複数の概念をテスト
it("日記の作成と取得ができる", () => {
  const created = await createNote(data);
  expect(created).toBeDefined();

  const fetched = await getNote(created.id);
  expect(fetched.title).toBe(data.title);
});

// ✅ Good - 1つの概念のみ
it("日記を作成できる", () => {
  const note = await createNote(data);
  expect(note).toBeDefined();
});

it("作成した日記を取得できる", () => {
  const created = await createNote(data);
  const fetched = await getNote(created.id);
  expect(fetched.id).toBe(created.id);
});
```

## CI/CDでのテスト実行

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: "22"
          cache: "pnpm"

      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:coverage
```

## テストコマンド

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
```

## 参考資料

- [テスト駆動開発 - Kent Beck](https://www.amazon.co.jp/dp/4274217884)
- [t_wadaさんのTDD Boot Camp](https://github.com/twada/tddbc)
- [実践テスト駆動開発 - t_wada](https://speakerdeck.com/twada)
