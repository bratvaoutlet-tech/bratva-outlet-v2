-- ============================================================================
-- Bratva Outlet V2 — Supabase Schema
-- Run this in the Supabase SQL Editor to set up all tables.
-- ============================================================================

-- ─── Extensions ─────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- ─── Customers ──────────────────────────────────────────────────────────────

create table if not exists customers (
  id          uuid primary key default uuid_generate_v4(),
  auth_id     uuid unique references auth.users(id) on delete set null,
  email       text not null unique,
  name        text not null,
  phone       text,
  cpf         text unique,
  avatar_url  text,

  -- Address fields (primary address)
  address_street        text,
  address_number        text,
  address_complement    text,
  address_neighborhood  text,
  address_city          text,
  address_state         text,
  address_zip_code      text,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_customers_email   on customers (email);
create index idx_customers_auth_id on customers (auth_id);

-- ─── Products ───────────────────────────────────────────────────────────────

create table if not exists products (
  id                uuid primary key default uuid_generate_v4(),
  name              text not null,
  slug              text not null unique,
  description       text not null default '',
  price             numeric(10,2) not null default 0,
  compare_at_price  numeric(10,2),
  images            text[] not null default '{}',
  category          text not null default 'geral',
  brand             text not null default '',
  sizes             text[] not null default '{}',
  colors            text[] not null default '{}',
  stock             integer not null default 0,
  is_active         boolean not null default true,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_products_slug      on products (slug);
create index idx_products_category  on products (category);
create index idx_products_is_active on products (is_active);

-- ─── Orders ─────────────────────────────────────────────────────────────────

create type order_status as enum (
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
);

create table if not exists orders (
  id              uuid primary key default uuid_generate_v4(),
  customer_id     uuid references customers(id) on delete set null,
  status          order_status not null default 'pending',
  items           jsonb not null default '[]',
  subtotal        numeric(10,2) not null default 0,
  shipping        numeric(10,2) not null default 0,
  discount        numeric(10,2) not null default 0,
  total           numeric(10,2) not null default 0,
  payment_method  text,
  tracking_code   text,
  notes           text,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_orders_customer_id on orders (customer_id);
create index idx_orders_status      on orders (status);
create index idx_orders_created_at  on orders (created_at desc);

-- ─── Cart Items ─────────────────────────────────────────────────────────────

create table if not exists cart_items (
  id          uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references customers(id) on delete cascade,
  product_id  uuid not null references products(id) on delete cascade,
  quantity    integer not null default 1 check (quantity > 0),
  size        text,
  color       text,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  unique (customer_id, product_id, size, color)
);

create index idx_cart_items_customer_id on cart_items (customer_id);

-- ─── Home Sections ──────────────────────────────────────────────────────────

create type section_type as enum (
  'hero',
  'banner',
  'carousel',
  'featured_products',
  'category_grid',
  'text_block',
  'custom_html'
);

create table if not exists home_sections (
  id          uuid primary key default uuid_generate_v4(),
  type        section_type not null,
  title       text,
  subtitle    text,
  content     jsonb not null default '{}',
  image_url   text,
  link_url    text,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_home_sections_sort    on home_sections (sort_order);
create index idx_home_sections_active  on home_sections (is_active);

-- ─── Updated_at Trigger ────────────────────────────────────────────────────

create or replace function trigger_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on customers
  for each row execute function trigger_set_updated_at();

create trigger set_updated_at before update on products
  for each row execute function trigger_set_updated_at();

create trigger set_updated_at before update on orders
  for each row execute function trigger_set_updated_at();

create trigger set_updated_at before update on cart_items
  for each row execute function trigger_set_updated_at();

create trigger set_updated_at before update on home_sections
  for each row execute function trigger_set_updated_at();

-- ─── RLS (Row Level Security) ───────────────────────────────────────────────

alter table customers    enable row level security;
alter table products     enable row level security;
alter table orders       enable row level security;
alter table cart_items   enable row level security;
alter table home_sections enable row level security;

-- Products: anyone can read active products
create policy "Products are viewable by everyone"
  on products for select using (is_active = true);

-- Home sections: anyone can read active sections
create policy "Home sections are viewable by everyone"
  on home_sections for select using (is_active = true);

-- Customers: users can read/update their own profile
create policy "Users can view own profile"
  on customers for select using (auth.uid() = auth_id);

create policy "Users can update own profile"
  on customers for update using (auth.uid() = auth_id);

-- Orders: users can view their own orders
create policy "Users can view own orders"
  on orders for select using (
    customer_id in (select id from customers where auth_id = auth.uid())
  );

create policy "Users can create own orders"
  on orders for insert with check (
    customer_id in (select id from customers where auth_id = auth.uid())
  );

-- Cart items: users can manage their own cart
create policy "Users can view own cart"
  on cart_items for select using (
    customer_id in (select id from customers where auth_id = auth.uid())
  );

create policy "Users can manage own cart"
  on cart_items for all using (
    customer_id in (select id from customers where auth_id = auth.uid())
  );
