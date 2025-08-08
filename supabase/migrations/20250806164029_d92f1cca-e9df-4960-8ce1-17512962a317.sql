-- Migration complète vers un schéma propre et relationnel

-- 1. Ajouter contrainte UNIQUE sur collections.slug
ALTER TABLE collections ADD CONSTRAINT collections_slug_unique UNIQUE (slug);

-- 2. Créer la nouvelle table specifications
CREATE TABLE specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Sauvegarder les données actuelles de product_specifications
CREATE TEMP TABLE temp_specs AS 
SELECT DISTINCT spec_name as name, spec_category as description
FROM product_specifications 
WHERE spec_name IS NOT NULL;

-- 4. Insérer les spécifications uniques dans la nouvelle table
INSERT INTO specifications (name, description)
SELECT DISTINCT name, description FROM temp_specs;

-- 5. Créer une nouvelle table product_specifications relationnelle
CREATE TABLE product_specifications_new (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  specification_id UUID REFERENCES specifications(id) ON DELETE CASCADE,
  value TEXT,
  unit TEXT,
  display_order INTEGER DEFAULT 0,
  is_highlight BOOLEAN DEFAULT false,
  PRIMARY KEY (product_id, specification_id)
);

-- 6. Migrer les données vers la nouvelle structure
INSERT INTO product_specifications_new (product_id, specification_id, value, unit, display_order, is_highlight)
SELECT 
  ps.product_id,
  s.id as specification_id,
  ps.spec_value,
  ps.spec_unit,
  ps.display_order,
  ps.is_highlight
FROM product_specifications ps
JOIN specifications s ON s.name = ps.spec_name
WHERE ps.spec_value IS NOT NULL;

-- 7. Remplacer l'ancienne table
DROP TABLE product_specifications;
ALTER TABLE product_specifications_new RENAME TO product_specifications;

-- 8. Restructurer la table products (sauvegarder d'abord)
ALTER TABLE products 
  DROP COLUMN IF EXISTS collection_slug,
  DROP COLUMN IF EXISTS category,
  DROP COLUMN IF EXISTS images,
  DROP COLUMN IF EXISTS sku,
  DROP COLUMN IF EXISTS stock_quantity,
  DROP COLUMN IF EXISTS lens_technology,
  DROP COLUMN IF EXISTS quality_score,
  DROP COLUMN IF EXISTS ecommerce_readiness,
  DROP COLUMN IF EXISTS url,
  DROP COLUMN IF EXISTS source,
  DROP COLUMN IF EXISTS description_length,
  DROP COLUMN IF EXISTS images_count,
  DROP COLUMN IF EXISTS review_count,
  DROP COLUMN IF EXISTS rating,
  DROP COLUMN IF EXISTS is_featured;

-- 9. Ajouter les nouvelles colonnes pour products
ALTER TABLE products 
  ADD COLUMN description_short TEXT,
  ADD COLUMN description_long TEXT;

-- 10. Migrer description existante vers description_long
UPDATE products SET description_long = description WHERE description IS NOT NULL;
ALTER TABLE products DROP COLUMN description;

-- 11. Renommer price en price_base et ajouter contrainte NOT NULL
ALTER TABLE products ALTER COLUMN price SET NOT NULL;
ALTER TABLE products RENAME COLUMN price TO price_base;

-- 12. Ajouter contrainte UNIQUE sur name
ALTER TABLE products ADD CONSTRAINT products_name_unique UNIQUE (name);

-- 13. Restructurer product_variants
ALTER TABLE product_variants 
  DROP COLUMN IF EXISTS name,
  DROP COLUMN IF EXISTS images,
  DROP COLUMN IF EXISTS stock_quantity,
  DROP COLUMN IF EXISTS sort_order,
  DROP COLUMN IF EXISTS is_default,
  DROP COLUMN IF EXISTS hex_color;

-- 14. Ajouter les nouvelles colonnes pour variants
ALTER TABLE product_variants 
  ADD COLUMN has_audio BOOLEAN DEFAULT false,
  ADD COLUMN color_frame_new TEXT,
  ADD COLUMN color_lens_new TEXT,
  ADD COLUMN price NUMERIC(10, 2);

-- 15. Migrer les données de couleurs
UPDATE product_variants SET 
  color_frame_new = frame_color,
  color_lens_new = lens_color;

-- 16. Supprimer anciennes colonnes et renommer
ALTER TABLE product_variants 
  DROP COLUMN frame_color,
  DROP COLUMN lens_color;

ALTER TABLE product_variants 
  RENAME COLUMN color_frame_new TO color_frame,
  RENAME COLUMN color_lens_new TO color_lens;

-- 17. Calculer le prix des variants (base + modifier)
UPDATE product_variants 
SET price = (
  SELECT p.price_base + COALESCE(pv.price_modifier, 0)
  FROM products p 
  WHERE p.id = product_variants.product_id
);

-- 18. Supprimer price_modifier maintenant inutile
ALTER TABLE product_variants DROP COLUMN price_modifier;

-- 19. Ajouter contrainte NOT NULL sur price et sku UNIQUE
ALTER TABLE product_variants 
  ALTER COLUMN price SET NOT NULL,
  ADD CONSTRAINT product_variants_sku_unique UNIQUE (sku);

-- 20. Créer nouvelle table product_collections relationnelle
CREATE TABLE product_collections_new (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, collection_id)
);

-- 21. Migrer les données de product_collections
INSERT INTO product_collections_new (product_id, collection_id)
SELECT DISTINCT pc.product_id, c.id
FROM product_collections pc
JOIN collections c ON c.slug = pc.collection_slug;

-- 22. Remplacer l'ancienne table
DROP TABLE product_collections;
ALTER TABLE product_collections_new RENAME TO product_collections;

-- 23. Activer RLS sur toutes les nouvelles tables
ALTER TABLE specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;

-- 24. Créer les politiques RLS
CREATE POLICY "Specifications are viewable by everyone" 
ON specifications FOR SELECT USING (true);

CREATE POLICY "Product specifications are viewable by everyone" 
ON product_specifications FOR SELECT USING (true);

CREATE POLICY "Product collections are viewable by everyone" 
ON product_collections FOR SELECT USING (true);