
-- Supprimer les anciennes collections qui ne correspondent plus à la nouvelle structure
DELETE FROM collections WHERE slug NOT IN ('sport', 'lifestyle', 'prismatic');

-- Créer/mettre à jour les 3 catégories principales
INSERT INTO collections (name, slug, description, is_active, sort_order, image_url) VALUES
('Sport', 'sport', 'Lunettes pour activités sportives et performance', true, 1, null),
('Lifestyle', 'lifestyle', 'Lunettes pour usage quotidien et mode de vie', true, 2, null),
('Prismatic', 'prismatic', 'Gamme haut de gamme et premium', true, 3, null)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order;

-- Créer une nouvelle table pour les sous-collections
CREATE TABLE IF NOT EXISTS sub_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_collection_slug TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (parent_collection_slug) REFERENCES collections(slug) ON DELETE CASCADE
);

-- Activer RLS sur la nouvelle table
ALTER TABLE sub_collections ENABLE ROW LEVEL SECURITY;

-- Politique RLS pour permettre la lecture publique des sous-collections actives
CREATE POLICY "Public can view active sub collections" ON sub_collections
  FOR SELECT USING (is_active = true);

-- Insérer les sous-collections selon la nouvelle structure
INSERT INTO sub_collections (name, slug, description, parent_collection_slug, sort_order) VALUES
-- Collections SPORT
('Shield', 'shield', 'Sports & Performance', 'sport', 1),
('Music Shield', 'music-shield', 'Audio Smart Glasses', 'sport', 2),
('Prime', 'prime', 'Sports & Performance', 'sport', 3),
('Falcon', 'falcon', 'Sports & Performance', 'sport', 4),
-- Collections LIFESTYLE
('Dragon', 'dragon', 'Premium Smart Glasses', 'lifestyle', 1),
('Veil', 'veil', 'Fashion & Lifestyle', 'lifestyle', 2),
('Dusk', 'dusk', 'Intelligent Eyewear', 'lifestyle', 3),
('Calm', 'calm', 'Prescription & RX', 'lifestyle', 4),
-- Collections PRISMATIC
('Euphoria', 'euphoria', 'Lifestyle Smart Glasses', 'prismatic', 1),
('Aura', 'aura', 'Lifestyle Smart Glasses', 'prismatic', 2)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  parent_collection_slug = EXCLUDED.parent_collection_slug,
  sort_order = EXCLUDED.sort_order;

-- Mettre à jour les produits existants pour utiliser les nouvelles sous-collections
-- Sport products
UPDATE products SET collection = 'shield' WHERE name ILIKE '%shield%' AND name NOT ILIKE '%music%';
UPDATE products SET collection = 'music-shield' WHERE name ILIKE '%music%shield%' OR name ILIKE '%audio%';
UPDATE products SET collection = 'prime' WHERE name ILIKE '%prime%';
UPDATE products SET collection = 'falcon' WHERE name ILIKE '%falcon%';

-- Lifestyle products
UPDATE products SET collection = 'dragon' WHERE name ILIKE '%dragon%';
UPDATE products SET collection = 'veil' WHERE name ILIKE '%veil%';
UPDATE products SET collection = 'dusk' WHERE name ILIKE '%dusk%';
UPDATE products SET collection = 'calm' WHERE name ILIKE '%calm%' OR description ILIKE '%prescription%';

-- Prismatic products
UPDATE products SET collection = 'euphoria' WHERE name ILIKE '%euphoria%';
UPDATE products SET collection = 'aura' WHERE name ILIKE '%aura%' AND name NOT ILIKE '%adapter%';

-- Mettre à jour les catégories des produits selon leur nouvelle collection
UPDATE products SET category = 'sport' WHERE collection IN ('shield', 'music-shield', 'prime', 'falcon');
UPDATE products SET category = 'lifestyle' WHERE collection IN ('dragon', 'veil', 'dusk', 'calm');
UPDATE products SET category = 'lifestyle' WHERE collection IN ('euphoria', 'aura');
