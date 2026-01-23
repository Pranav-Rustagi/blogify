create extension if not exists "pgcrypto";
create extension if not exists "citext";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email citext unique not null,
  password_hash text not null,
  created_at timestamptz default now() not null
);

create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references users(id) on delete cascade not null,
  title text not null,
  body text default '' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
