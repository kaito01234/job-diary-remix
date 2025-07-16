# Architecture Decision Records (ADR)

このディレクトリには、プロジェクトにおける重要な技術的決定を記録しています。

## ADRとは

Architecture Decision Records（ADR）は、ソフトウェアアーキテクチャに関する重要な決定を文書化したものです。これにより：

- なぜその技術を選択したのか
- どのような選択肢を検討したのか
- その決定によってどのような影響があるのか

を後から振り返ることができます。

## ADR一覧

| 番号 | タイトル | ステータス | 決定日 |
|------|---------|------------|--------|
| [0001](./0001-use-remix-framework.md) | Remixフレームワークの採用 | Accepted | 2025-07-15 |
| [0002](./0002-use-vercel-and-neon.md) | Vercel + Neonをホスティング・データベースに採用 | Accepted | 2025-07-15 |
| [0003](./0003-use-shadcn-ui.md) | UIコンポーネントライブラリにshadcn/uiを採用 | Accepted | 2025-07-15 |
| [0004](./0004-adopt-tdd-workflow.md) | TDD（テスト駆動開発）の採用 | Accepted | 2025-07-15 |

## ADRのステータス

- **Proposed**: 提案中
- **Accepted**: 承認済み
- **Deprecated**: 非推奨
- **Superseded**: 置き換え済み

## ADRの書き方

新しいADRを作成する際は、以下のテンプレートを使用してください：

```markdown
# ADR-XXXX: [タイトル]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
[なぜこの決定が必要なのか、背景情報を記載]

## Decision
[実際の決定内容]

## Consequences
### Positive
[この決定によるメリット]

### Negative
[この決定によるデメリット]

### Neutral
[どちらでもない影響]
```

## 参考リンク

- [Documenting Architecture Decisions - Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR Tools](https://github.com/npryce/adr-tools)