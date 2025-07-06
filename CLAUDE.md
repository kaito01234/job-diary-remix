# job-diary リビルドプロジェクト

**重要**: `CLAUDE_PERSONAL.md` ファイルが存在する場合は、そちらも必ず読み込んでコミュニケーション設定を確認してください。

## プロジェクト概要
既存のjob-diaryアプリ（Next.js App Router）を新しい技術スタックで作り直すプロジェクト

### 既存アプリの問題点
- Next.js App Routerが使いにくい
- 複雑な構成になってしまっている

## 決定した技術スタック
- **フロントエンド**: Remix
- **データベース**: Neon (Serverless Postgres)
- **ORM**: Prisma
- **UI**: shadcn/ui
- **言語**: TypeScript

### 選定理由
- **Remix**: Next.jsより使いやすい、Web標準重視、フルスタック対応
- **Neon**: Serverless Postgres、自動スケーリング、ブランチング機能
- **Prisma**: 既存スキーマ活用可能、Neon対応、型安全性
- **shadcn/ui**: 2024-2025年の人気トレンド、Tailwind CSS + Radix UI、軽量

## 既存アプリの機能
- ユーザー認証（NextAuth）
- 日記の作成・編集・一覧表示
- 日付、タイトル、コメント機能
- レスポンシブデザイン

## 次回の作業予定
1. Remixプロジェクトの初期設定
2. shadcn/uiのセットアップ
3. Neon + Prismaの設定
4. 既存スキーマのPostgreSQL移行

## 作業履歴
- 2025-07-05: 技術選定完了
- 2025-07-06: 
  - Next.js関連ファイルをtemp/nextjs-backupに退避
  - Remixプロジェクトの初期セットアップ完了
  - パッケージマネージャーをnpmからpnpmに変更
  - devcontainer.jsonをシンプルに再構成（Node.js 22.17.0, pnpm 10.12.4で固定）