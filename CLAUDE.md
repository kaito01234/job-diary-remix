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

Tests are not yet implemented. Vitest is planned for future implementation.

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
  id        String   // cuid()
  date      DateTime // diary date
  title     String   // title
  comment   String   // content
  userId    String   // user ID
  createdAt DateTime // creation timestamp
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

### Pending Features

- User authentication (NextAuth equivalent)
- Note CRUD operations
- Date filtering and search functionality
- Full responsive design
- Neon production environment connection

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

# Important Instructions

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
