-- Supabase Schema for Productive To-do App

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create Tasks Table
create table if not exists tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null check (char_length(trim(title)) > 0),
  description text,
  is_completed boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table tasks enable row level security;

-- Policies (For simplicity in this demo, we allow public access, but in prod this should be authenticated)
-- Allow public read access
create policy "Public tasks are viewable by everyone"
  on tasks for select
  using ( true );

-- Allow public insert access
create policy "Everyone can insert tasks"
  on tasks for insert
  with check ( true );

-- Allow public update access
create policy "Everyone can update tasks"
  on tasks for update
  using ( true );

-- Allow public delete access
create policy "Everyone can delete tasks"
  on tasks for delete
  using ( true );

-- Realtime Subscription
-- To enable realtime, you must enable replication on the table in Supabase Dashboard or via SQL:
alter publication supabase_realtime add table tasks;
