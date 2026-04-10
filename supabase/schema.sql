-- Run this once in the Supabase SQL Editor (Database > SQL Editor > New query)

create table if not exists tasks_progress (
  id uuid default gen_random_uuid() primary key,
  task_key text not null unique,
  completed boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists daily_logs (
  id uuid default gen_random_uuid() primary key,
  log_key text not null unique,
  learned text,
  built text,
  struggled text,
  revise text,
  date timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_status (
  id uuid default gen_random_uuid() primary key,
  project_key text not null unique,
  status text not null default 'not_started',
  updated_at timestamptz not null default now()
);

-- Allow anonymous reads and writes (single-user app, no auth required)
alter table tasks_progress enable row level security;
alter table daily_logs enable row level security;
alter table project_status enable row level security;

create policy "anon all" on tasks_progress for all to anon using (true) with check (true);
create policy "anon all" on daily_logs for all to anon using (true) with check (true);
create policy "anon all" on project_status for all to anon using (true) with check (true);
