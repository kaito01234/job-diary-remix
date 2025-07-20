# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Job Diary - A diary application rebuilt with modern web technologies. Originally built with Next.js App Router, now migrated to Remix for improved developer experience and performance.

### Tech Stack

- **Framework**: Remix v2.16.8 (Vite bundler)
- **Database**: PostgreSQL (Docker for development, Neon for production)
- **ORM**: Prisma v6.11.1
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm 10.12.4
- **Node.js**: 22.17.0 (fixed in devcontainer)

## Development Commands

### Core Commands

```bash
pnpm dev          # Start development server (http://localhost:5173)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking
```

### Database Commands

```bash
pnpm db:up        # Start Docker PostgreSQL
pnpm db:down      # Stop Docker PostgreSQL
pnpm db:migrate   # Run migrations (development)
pnpm db:reset     # Reset database (development)
pnpm db:studio    # Launch Prisma Studio (GUI for DB)
pnpm db:generate  # Generate Prisma client
```

### Testing

```bash
pnpm test         # Run tests with Vitest
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage report
pnpm test:ui      # Run tests with Vitest UI
```

**Test Framework**: Vitest
**Testing Approach**: TDD (Test-Driven Development) - t_wada style
**Mock Library**: prisma-mock for database testing

## Architecture

### Directory Structure

```
app/
├── components/     # Reusable components
│   ├── ui/        # shadcn/ui components
│   └── Header.tsx # Application header
├── lib/           # Utilities
│   ├── prisma.ts  # Prisma client singleton
│   └── utils.ts   # Helper functions (cn, etc.)
├── routes/        # Remix routes (file-based routing)
│   ├── _index.tsx # Home page
│   └── notes.*    # Note-related pages
├── root.tsx       # Root layout
└── tailwind.css   # Global styles
```

### Remix Routing Conventions

- `routes/_index.tsx` → `/`
- `routes/notes._index.tsx` → `/notes`
- `routes/notes.new.tsx` → `/notes/new`
- `routes/notes.$noteId.tsx` → `/notes/:noteId` (dynamic route)

### Data Models (Prisma)

```typescript
// User (for authentication - implementation pending)
model User {
  id            String
  email         String?
  name          String?
  notes         Note[]
}

// Note (main entity)
model Note {
  id        String    // cuid()
  date      DateTime  // diary date
  title     String?   // title (optional)
  content   String    // content (previously comment)
  userId    String    // user ID
  createdAt DateTime  // creation timestamp
  updatedAt DateTime  // update timestamp
  tags      NoteTag[] // many-to-many relation
}

// Tag
model Tag {
  id        String    // cuid()
  name      String    // unique tag name
  notes     NoteTag[] // many-to-many relation
}

// NoteTag (junction table)
model NoteTag {
  noteId    String
  tagId     String
  note      Note
  tag       Tag
}
```

### Prisma Client Usage

```typescript
import { prisma } from "~/lib/prisma";

// Use in Loader/Action
export const loader = async () => {
  const notes = await prisma.note.findMany();
  return json({ notes });
};
```

### Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add [component-name]
```

## Current Implementation Status

### Completed

- Remix project setup
- shadcn/ui integration (New York style)
- Prisma setup with PostgreSQL connection
- Basic routing structure
- Header component
- Vitest setup with TDD workflow
- prisma-mock integration for testing
- Note model with Tag support (many-to-many)
- First createNote function with tests

### Pending Features

- User authentication (NextAuth equivalent)
- Note CRUD operations (Read, Update, Delete)
- Date filtering and search functionality
- Full responsive design
- Neon production environment connection
- CI/CD with GitHub Actions

## Environment Variables

`.env` file required:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/job-diary"
```

Use `.env.production` for production environment.

## Important Notes

1. **Prisma Client**: Run `pnpm db:generate` to generate the client during development
2. **Type Safety**: TypeScript strict mode is enabled. All type errors must be resolved
3. **Path Aliases**: `~/` points to `./app/` (configured in tsconfig.json)
4. **Styling**: Use Tailwind CSS. Keep custom CSS to a minimum
5. **Components**: Prefer shadcn/ui components

## Work History

### 2025-07-05

- Technology selection completed
- First collaboration on different repository (job-diary)
- Joint technology selection from initial phase
- Embracing new tech stack (Remix + shadcn/ui)
- Recognized importance of documentation, learned to distinguish between CLAUDE.md and CLAUDE_PERSONAL.md

### 2025-07-06

- Backed up Next.js files to temp/nextjs-backup
- Completed initial Remix project setup
- Changed package manager from npm to pnpm
- Simplified devcontainer.json (fixed to Node.js 22.17.0, pnpm 10.12.4)
- Completed shadcn/ui setup, Neon configuration, and basic page creation
- Migrated from job-diary to job-diary-remix repository
- Learned to exclude .env.production and CLAUDE_PERSONAL.md in security checks
- Encountered database connection issue in devcontainer environment → resolved
- Basic application structure completed

### 2025-07-15

- Created comprehensive requirements documentation with ADR format
- Decided on TDD approach with t_wada style
- Set up Vitest testing framework
- Integrated prisma-mock for database testing
- Updated Prisma schema to support Tags (many-to-many relationship)
- Implemented first test and createNote function following Red-Green-Refactor cycle
- Established Git commit conventions with Co-Authored-By

### 2025-07-20

- Completed all CRUD operations (Create, Read, Update, Delete) for notes
- Fixed database connection issues (host.docker.internal → localhost)
- Resolved development server startup problems with Vitest imports
- Implemented comprehensive code quality tools:
  - ESLint v9 with flat config format
  - eslint-plugin-unicorn (100+ strict rules)
  - Prettier for consistent formatting
  - Remix-specific rule overrides for compatibility
- Created ADR-0005 documenting linting decisions
- Updated project documentation and development schedule
- Achieved clean, production-ready codebase with no technical debt

## Git Commit Conventions

### Commit Message Format

All commits should include Claude as co-author:

```
feat: 機能の説明

詳細な説明（必要に応じて）

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Commit Types

- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメントのみの変更
- `style:` コードの動作に影響しない変更（スペース、フォーマット等）
- `refactor:` バグ修正や機能追加を伴わないコード変更
- `test:` テストの追加や修正
- `chore:` ビルドプロセスやツールの変更

## Development Methodology

### TDD (Test-Driven Development) - t_wada Style

We follow t_wada's TDD approach with these principles:

1. **Red-Green-Refactor Cycle**
   - Red: Write a failing test first
   - Green: Write minimal code to pass the test
   - Refactor: Improve code while keeping tests green

2. **Key Practices**
   - **Assertion First**: Write expectations before implementation
   - **Fake Implementation**: Start with hardcoded values
   - **Triangulation**: Generalize from multiple examples
   - **TODO List Driven**: Break down features into small testable units
   - **Japanese Test Names**: Tests as specifications in Japanese

3. **Test Structure**

   ```typescript
   describe("機能名", () => {
     it("仕様の説明（日本語）", () => {
       // Arrange: 準備
       // Act: 実行
       // Assert: 検証（アサーションファースト）
     });
   });
   ```

4. **Development Flow**
   - Create TODO list for the feature
   - Pick one test from TODO
   - Write failing test (Red)
   - Make it pass with minimal code (Green)
   - Refactor to remove duplication
   - Repeat until TODO list is complete

# Important Instructions

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
