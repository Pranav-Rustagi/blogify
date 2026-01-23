create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email varchar(255) unique not null,
  password_hash text not null,
  created_at timestamptz default (now() at time zone 'utc') not null
);

create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references users(id) on delete cascade not null,
  title varchar(255) not null,
  body text default '' not null,
  created_at timestamptz default (now() at time zone 'utc') not null,
  updated_at timestamptz default (now() at time zone 'utc') not null
);
