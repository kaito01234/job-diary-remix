# ADR-0001: Remixフレームワークの採用

## Status

Accepted

## Date

2025-07-15

## Context

エンジニア向け日記アプリケーションを開発するにあたり、フルスタックWebフレームワークを選定する必要がある。

### 要件

- サーバーサイドレンダリング（SSR）のサポート
- TypeScriptのファーストクラスサポート
- 優れた開発者体験
- 無料ホスティングサービスへのデプロイが容易
- 将来的な移行性の確保

### 検討した選択肢

1. **Next.js**: 最も人気のあるReactフレームワーク
2. **Remix**: モダンなフルスタックフレームワーク
3. **SvelteKit**: 軽量で高速なフレームワーク
4. **Nuxt**: Vue.jsベースのフレームワーク

## Decision

Remixフレームワークを採用する。

## Consequences

### Positive

- Web標準に準拠したAPIデザイン
- ネストされたルーティングによる優れたデータ取得パターン
- フォーム処理が直感的（Progressive Enhancement）
- エラーハンドリングが優秀
- 複数のホスティングプラットフォームに対応（Vercel、Netlify、Cloudflare等）

### Negative

- Next.jsと比較してコミュニティが小さい
- 学習リソースが比較的少ない
- エコシステムがまだ発展途上

### Neutral

- React Routerの知識が必要
- サーバーサイドとクライアントサイドの境界を意識した設計が必要
