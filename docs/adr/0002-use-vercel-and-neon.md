# ADR-0002: Vercel + Neonをホスティング・データベースに採用

## Status
Accepted

## Date
2025-07-15

## Context
個人プロジェクトとして、初期コストをかけずに数人のユーザーに使ってもらえる環境を構築する必要がある。

### 要件
- 無料枠でフルスタックアプリケーションをホスティング可能
- PostgreSQLデータベースのサポート
- 開発者体験が良好
- 将来的な移行が容易

### 検討した選択肢

#### ホスティング
1. **Vercel**: Next.js開発元が提供するプラットフォーム
2. **Cloudflare Pages**: エッジでの実行に特化
3. **Netlify**: Jamstack向けプラットフォーム
4. **Railway/Fly.io**: コンテナベースのホスティング

#### データベース
1. **Neon**: サーバーレスPostgreSQL
2. **Supabase**: PostgreSQL + 認証機能
3. **PlanetScale**: MySQL互換のサーバーレスDB
4. **Cloudflare D1**: SQLiteベースのエッジDB

## Decision
ホスティングにVercel、データベースにNeon PostgreSQLを採用する。

## Consequences

### Positive
- **Vercel**
  - Remixの公式サポート
  - Git連携による自動デプロイ
  - プレビュー環境の自動生成
  - 100GB/月の帯域幅（無料枠）
  
- **Neon**
  - 0.5GBまで無料
  - Prismaとの相性が良好
  - 自動バックアップ
  - ブランチング機能で開発環境の分離が容易

### Negative
- **Vercel**
  - リクエストボディサイズ上限4.5MB
  - WebSocket非対応
  - 商用利用は有料プラン必須
  
- **Neon**
  - 無料枠は0.5GBまで
  - コンピュート時間に制限あり

### Neutral
- 両サービスとも米国リージョンのみ無料
- コールドスタートが発生する可能性
- Node.js標準環境なので移行は比較的容易