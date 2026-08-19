<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Guide

## Core Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npx prisma generate`: Update Prisma client (run after schema changes)

## Tech Stack
- **Framework**: Next.js 16.3.1 (App Router), React 19
- **Database**: MariaDB via Prisma ORM
- **Auth**: `better-auth` (`src/lib/auth.ts`)
- **State**: Zustand (`src/lib/cart-store.ts`)
- **UI**: Shadcn, Tailwind CSS 4, Lucide React

## Structure
- `src/app/`: App Router pages and API routes
- `src/components/`: UI components
- `src/lib/`: Core utilities, auth, and DB client (`src/lib/prisma.ts`)
- `prisma/schema.prisma`: Database schema

