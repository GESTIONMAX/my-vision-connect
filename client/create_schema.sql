-- Script pour créer le même schéma que Supabase Cloud
-- Créer les tables dans le bon ordre pour respecter les contraintes de clés étrangères

-- Collections (pas de dépendance)
CREATE TABLE IF NOT EXISTS public.collections (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_url text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT collections_pkey PRIMARY KEY (id)
);

-- Products (dépend de collections)
CREATE TABLE IF NOT EXISTS public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric,
  sku text UNIQUE,
  images text[],
  category text,
  collection_slug text,
  stock_quantity integer DEFAULT 0,
  review_count integer DEFAULT 0,
  rating numeric DEFAULT 0.0,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_collection_slug_fkey FOREIGN KEY (collection_slug) REFERENCES public.collections(slug)
);

-- Filter options (pas de dépendance)
CREATE TABLE IF NOT EXISTS public.filter_options (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  filter_type text NOT NULL,
  name text NOT NULL,
  value text NOT NULL,
  hex_color text,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT filter_options_pkey PRIMARY KEY (id)
);

-- Tags (pas de dépendance)
CREATE TABLE IF NOT EXISTS public.tags (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text,
  icon text,
  color text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tags_pkey PRIMARY KEY (id)
);

-- Product collections (dépend de products et collections)
CREATE TABLE IF NOT EXISTS public.product_collections (
  product_id uuid NOT NULL,
  collection_slug text NOT NULL,
  CONSTRAINT product_collections_pkey PRIMARY KEY (product_id, collection_slug),
  CONSTRAINT product_collections_collection_slug_fkey FOREIGN KEY (collection_slug) REFERENCES public.collections(slug),
  CONSTRAINT product_collections_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);

-- Product filters (dépend de products et filter_options)
CREATE TABLE IF NOT EXISTS public.product_filters (
  product_id uuid NOT NULL,
  filter_option_id uuid NOT NULL,
  CONSTRAINT product_filters_pkey PRIMARY KEY (product_id, filter_option_id),
  CONSTRAINT product_filters_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT product_filters_filter_option_id_fkey FOREIGN KEY (filter_option_id) REFERENCES public.filter_options(id)
);

-- Product tags (dépend de products et tags)
CREATE TABLE IF NOT EXISTS public.product_tags (
  product_id uuid NOT NULL,
  tag_id uuid NOT NULL,
  CONSTRAINT product_tags_pkey PRIMARY KEY (product_id, tag_id),
  CONSTRAINT product_tags_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT product_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id)
);

-- Profiles (dépend de auth.users qui doit exister dans Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL,
  email text,
  first_name text,
  last_name text,
  phone text,
  avatar_url text,
  user_type text DEFAULT 'customer'::text CHECK (user_type = ANY (ARRAY['customer'::text, 'business'::text, 'admin'::text, 'partner'::text])),
  company_name text,
  company_siret text,
  company_sector text,
  pricing_group text DEFAULT 'standard'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

-- Sub collections (dépend de collections)
CREATE TABLE IF NOT EXISTS public.sub_collections (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  parent_collection_slug text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer,
  image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT sub_collections_pkey PRIMARY KEY (id),
  CONSTRAINT sub_collections_parent_collection_slug_fkey FOREIGN KEY (parent_collection_slug) REFERENCES public.collections(slug)
);

-- Migration des données de chamelo_products vers products
-- (Ajoutez ceci seulement si vous souhaitez migrer vos données existantes)
/*
INSERT INTO public.collections (name, slug, description, is_active)
VALUES 
  ('Sport', 'sport', 'Collection de lunettes sport', true),
  ('Lifestyle', 'lifestyle', 'Collection lifestyle', true),
  ('Prismatic', 'prismatic', 'Collection prismatique', true);

INSERT INTO public.products (
  name, description, price, sku, category, collection_slug, is_active
)
SELECT
  title AS name,
  description,
  price,
  sku,
  category,
  CASE
    WHEN category ILIKE '%sport%' THEN 'sport'
    WHEN category ILIKE '%lifestyle%' THEN 'lifestyle'
    WHEN category ILIKE '%premium%' THEN 'prismatic'
    ELSE NULL
  END AS collection_slug,
  available = 'Out' AS is_active
FROM
  public.chamelo_products;
*/

-- Créer des vues pour faciliter l'affichage des données
CREATE OR REPLACE VIEW public.product_details AS
SELECT 
  p.id,
  p.name,
  p.description,
  p.price,
  p.sku,
  p.images,
  p.category,
  c.name AS collection_name,
  p.collection_slug,
  p.is_active,
  p.created_at
FROM 
  products p
LEFT JOIN
  collections c ON p.collection_slug = c.slug;
