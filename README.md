# Full-Stack + GenAI Engineer Roadmap Tracker

A personal 12-week learning roadmap tracker with Supabase persistence.

## What it does

- Track task completion week by week across a 12-week Full-Stack + GenAI curriculum
- Score system based on completed days (learn points + build points)
- Daily journal (learned / built / struggled / revise)
- Project status tracker (not started → in progress → done)
- All data persists in Supabase — survives page refreshes

## Tech Stack

- React 19 + Vite
- Supabase (PostgreSQL + Row Level Security)

## Setup

1. Clone the repo
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file from the example:
   ```
   cp .env.example .env
   ```
4. Fill in your Supabase credentials in `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Run the schema in Supabase SQL Editor (`supabase/schema.sql`)
6. Start the dev server:
   ```
   npm run dev
   ```

## Database Schema

Three tables in Supabase:

| Table | Purpose |
|-------|---------|
| `tasks_progress` | Task checkbox state keyed by `week-day-task` index |
| `daily_logs` | Daily journal entries (learned, built, struggled, revise) |
| `project_status` | Project status: `not_started`, `in_progress`, `done` |

All tables use anonymous RLS policies (single-user app, no auth required).
