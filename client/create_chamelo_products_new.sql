-- Script de création de la table chamelo_products pour Supabase local
CREATE TABLE IF NOT EXISTS public.chamelo_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT,
  title TEXT,
  description TEXT,
  category TEXT,
  price DECIMAL(10, 2),
  available TEXT,
  sku TEXT,
  source TEXT DEFAULT 'chamelo',
  description_length INTEGER,
  vendor TEXT,
  product_type TEXT,
  handle TEXT,
  url TEXT,
  lens_technology TEXT,
  images_count INTEGER DEFAULT 0,
  main_image TEXT,
  quality_score DECIMAL(5, 2) DEFAULT 0,
  ecommerce_readiness TEXT,
  collection TEXT,
  sub_collection TEXT,
  is_popular BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Créer un index sur external_id pour accélérer les recherches
CREATE INDEX IF NOT EXISTS chamelo_products_external_id_idx ON public.chamelo_products(external_id);

-- Créer un index sur la catégorie
CREATE INDEX IF NOT EXISTS chamelo_products_category_idx ON public.chamelo_products(category);

-- Créer un index sur la collection
CREATE INDEX IF NOT EXISTS chamelo_products_collection_idx ON public.chamelo_products(collection);

-- Activer la recherche full-text sur le titre et la description
CREATE INDEX IF NOT EXISTS chamelo_products_search_idx ON public.chamelo_products USING gin(to_tsvector('french', title || ' ' || COALESCE(description, '')));

-- Ajouter un commentaire explicatif sur la table
COMMENT ON TABLE public.chamelo_products IS 'Table des produits Chamelo importés depuis l''API ou CSV';
