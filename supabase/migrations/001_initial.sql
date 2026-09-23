create extension if not exists "pgcrypto";

-- =========================================================
-- ORDERS
-- =========================================================

create table public.orders (
  id uuid primary key default gen_random_uuid(),

  order_number text unique not null,

  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  customer_message text,

  delivery_zone text not null,
  delivery_address text not null,
  delivery_postal_code text not null,
  delivery_city text not null,

  products_total_cents integer not null check (products_total_cents >= 0),
  delivery_fee_cents integer not null check (delivery_fee_cents >= 0),
  total_cents integer not null check (total_cents >= 0),

  status text not null default 'new'
    check (status in (
      'new',
      'confirmed',
      'paid',
      'delivered',
      'cancelled'
    )),

  created_at timestamptz not null default now()
);


-- =========================================================
-- ORDER ITEMS
-- =========================================================

create table public.order_items (
  id uuid primary key default gen_random_uuid(),

  order_id uuid not null
    references public.orders(id)
    on delete cascade,

  product_id text not null,
  product_name text not null,

  unit_price_cents integer not null
    check (unit_price_cents >= 0),

  quantity integer not null
    check (quantity > 0),

  line_total_cents integer not null
    check (line_total_cents >= 0)
);


-- =========================================================
-- INDEXES
-- =========================================================

create index orders_created_at_idx
  on public.orders(created_at desc);

create index orders_status_idx
  on public.orders(status);

create index order_items_order_id_idx
  on public.order_items(order_id);


-- =========================================================
-- ROW LEVEL SECURITY
-- =========================================================

alter table public.orders enable row level security;
alter table public.order_items enable row level security;