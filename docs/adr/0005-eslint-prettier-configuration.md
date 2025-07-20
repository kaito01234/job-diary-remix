# ADR-0005: ESLint/Prettier Configuration

## Status

Accepted

## Context

コードベースの品質と一貫性を保つため、静的解析ツールとコードフォーマッターの導入が必要だった。特に以下の要件があった：

- TypeScript/React/Remixの厳格なルール適用
- モダンなESLint flat config対応
- チーム開発での一貫したコードスタイル
- Remixエコシステムとの互換性

## Decision

### ESLint Configuration

- **ESLint v9** with flat config format (`eslint.config.js`)
- **eslint-plugin-unicorn** で100以上の厳格なJavaScript/TypeScriptルールを適用
- **@typescript-eslint/eslint-plugin v8** でTypeScript対応
- React、アクセシビリティ、import管理の包括的なルール

### Prettier Configuration

- **Prettier v3.6.2** でコードフォーマット統一
- セミコロンあり、シングルクォート使用の設定

### Key Plugin Choices

1. **eslint-plugin-unicorn**: Airbnbが非推奨・メンテナンス停止のため選択
2. **@typescript-eslint v8**: ESLint v9との互換性
3. **eslint-plugin-react-hooks**: React Hooksルールの厳格適用

## Implementation Details

### ESLint Flat Config Structure

```javascript
export default [
  // 基本設定（ignores）
  { ignores: ["**/build/**", "**/node_modules/**", ...] },

  // メイン設定
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: { /* parser, globals */ },
    plugins: { /* all plugins */ },
    rules: { /* comprehensive rules */ }
  },

  // テスト用設定
  { files: ["**/*.test.{js,jsx,ts,tsx}"], ... }
];
```

### Remix Compatibility Overrides

以下のunicornルールをRemixとの互換性のため無効化：

```javascript
"unicorn/prevent-abbreviations": "off",  // props, ctx等の標準略語
"unicorn/filename-case": "off",          // routes/notes.$noteId.tsx形式
"unicorn/no-null": "off",                // React DOM APIs
"unicorn/prefer-module": "off",          // 設定ファイルでのCommonJS
"unicorn/no-array-for-each": "off",      // JSXレンダリングパターン
"unicorn/prefer-top-level-await": "off", // Remix初期化順序
```

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 80
}
```

## Commands

```bash
# Linting
pnpm lint                 # ESLint実行
pnpm lint --fix          # 自動修正

# Formatting
pnpm format              # Prettier実行（実装予定）
```

## Consequences

### Positive

- **厳格な品質管理**: unicornプラグインで100以上のルール適用
- **モダンな設定**: ESLint v9 flat configで将来性確保
- **Remixとの協調**: フレームワーク特有の慣習を尊重
- **開発効率**: 自動修正とフォーマットで手作業削減
- **チーム統一**: 一貫したコードスタイル

### Negative

- **学習コスト**: 厳格なルールによる初期の開発速度低下
- **設定複雑性**: flat config移行による設定ファイルの複雑化
- **ビルド時間**: 厳格なlintingによるCI時間増加

### Neutral

- **定期メンテナンス**: プラグインのアップデート対応が必要
- **ルール調整**: プロジェクト成長に応じたルール見直し

## Notes

- ESLint flat configは将来のデフォルトとなる予定
- unicornプラグインは活発にメンテナンスされており、最新のJavaScript/TypeScriptベストプラクティスを反映
- Remixとの互換性オーバーライドは最小限に抑制
- テスト環境では一部ルールを緩和（`@typescript-eslint/no-explicit-any: "off"`等）

## References

- [ESLint v9 Flat Config Migration](https://eslint.org/docs/latest/use/configure/configuration-files)
- [eslint-plugin-unicorn Documentation](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [Remix File Conventions](https://remix.run/docs/en/main/file-conventions)
- [TypeScript ESLint v8](https://typescript-eslint.io/getting-started)
