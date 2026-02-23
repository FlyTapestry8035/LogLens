-- LogLens Database Schema
-- Run this in your Supabase SQL editor

-- Users table
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  github_id text unique not null,
  email text not null,
  name text,
  avatar_url text,
  created_at timestamptz default now() not null
);

-- Apps table
create table if not exists apps (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade not null,
  name text not null,
  api_key text unique not null,
  created_at timestamptz default now() not null
);

-- Logs table
create table if not exists logs (
  id uuid default gen_random_uuid() primary key,
  app_id uuid references apps(id) on delete cascade not null,
  level text check (level in ('info', 'warn', 'error')) not null,
  message text not null,
  metadata jsonb,
  timestamp timestamptz default now() not null
);

-- Analyses table
create table if not exists analyses (
  id uuid default gen_random_uuid() primary key,
  app_id uuid references apps(id) on delete cascade not null,
  summary text not null,
  anomalies_detected boolean default false not null,
  raw_response text not null,
  created_at timestamptz default now() not null
);

-- Indexes for performance
create index if not exists idx_apps_user_id on apps(user_id);
create index if not exists idx_apps_api_key on apps(api_key);
create index if not exists idx_logs_app_id on logs(app_id);
create index if not exists idx_logs_timestamp on logs(app_id, timestamp desc);
create index if not exists idx_analyses_app_id on analyses(app_id);
create index if not exists idx_analyses_created_at on analyses(app_id, created_at desc);
