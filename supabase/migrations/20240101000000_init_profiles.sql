create table public.profiles (
  name text primary key,
  coins integer default 0,
  math_level integer default 1,
  vietnamese_level integer default 1,
  english_level integer default 1
);
