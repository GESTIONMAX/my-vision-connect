-- Script pour créer les tables de catégories personnalisées
-- et de mappage des produits

-- Activation de l'extension uuid-ossp si elle n'est pas déjà activée
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des catégories personnalisées
CREATE TABLE IF NOT EXISTS custom_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  handle TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_category_id UUID REFERENCES custom_categories(id),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table de mappage entre produits Shopify et catégories personnalisées
CREATE TABLE IF NOT EXISTS product_category_mapping (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shopify_product_id TEXT NOT NULL,
  custom_category_id UUID REFERENCES custom_categories(id) NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(shopify_product_id, custom_category_id)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_product_category_mapping_product ON product_category_mapping(shopify_product_id);
CREATE INDEX IF NOT EXISTS idx_product_category_mapping_category ON product_category_mapping(custom_category_id);

-- Fonction pour mettre à jour le timestamp 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour le timestamp 'updated_at' de custom_categories
CREATE TRIGGER update_custom_categories_updated_at
BEFORE UPDATE ON custom_categories
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Trigger pour mettre à jour le timestamp 'updated_at' de product_category_mapping
CREATE TRIGGER update_product_category_mapping_updated_at
BEFORE UPDATE ON product_category_mapping
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Ajout des catégories principales pour démarrer
INSERT INTO custom_categories (name, slug, handle, description, image_url) 
VALUES 
  ('Sport Collection', 'sport-collection', 'sport', 'Collection de lunettes pour le sport', '/images/collections/sport.jpg'),
  ('Lifestyle Collection', 'lifestyle-collection', 'lifestyle', 'Collection de lunettes lifestyle', '/images/collections/lifestyle.jpg'),
  ('Prismatic Collection', 'prismatic-collection', 'prismatic', 'Collection de lunettes prismatiques', '/images/collections/prismatic.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Ajout des sous-catégories pour la collection Sport
WITH sport_id AS (SELECT id FROM custom_categories WHERE handle = 'sport')
INSERT INTO custom_categories (name, slug, handle, description, image_url, parent_category_id) 
VALUES 
  ('Shield', 'shield', 'shield', 'Lunettes Shield de la collection Sport', '/images/products/shield.jpg', (SELECT id FROM sport_id)),
  ('Music Fields', 'music-fields', 'music-shield', 'Lunettes Music Fields de la collection Sport', '/images/products/music-shield.jpg', (SELECT id FROM sport_id))
ON CONFLICT (slug) DO NOTHING;

-- Ajout des sous-catégories pour la collection Lifestyle
WITH lifestyle_id AS (SELECT id FROM custom_categories WHERE handle = 'lifestyle')
INSERT INTO custom_categories (name, slug, handle, description, image_url, parent_category_id) 
VALUES 
  ('Veil', 'veil', 'veil', 'Lunettes Veil de la collection Lifestyle', '/images/products/veil.jpg', (SELECT id FROM lifestyle_id)),
  ('Dragon', 'dragon', 'dragon', 'Lunettes Dragon de la collection Lifestyle', '/images/products/dragon.jpg', (SELECT id FROM lifestyle_id))
ON CONFLICT (slug) DO NOTHING;

-- Ajout des sous-catégories pour la collection Prismatic
WITH prismatic_id AS (SELECT id FROM custom_categories WHERE handle = 'prismatic')
INSERT INTO custom_categories (name, slug, handle, description, image_url, parent_category_id) 
VALUES 
  ('Euphoria', 'euphoria', 'euphoria', 'Lunettes Euphoria de la collection Prismatic', '/images/products/euphoria.jpg', (SELECT id FROM prismatic_id)),
  ('Aura', 'aura', 'aura', 'Lunettes Aura de la collection Prismatic', '/images/products/aura.jpg', (SELECT id FROM prismatic_id))
ON CONFLICT (slug) DO NOTHING;
