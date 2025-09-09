
-- First, let's create the prismatic collection if it doesn't exist
INSERT INTO collections (name, slug, description, is_active, sort_order)
VALUES (
  'Prismatic',
  'prismatic',
  'Collection de lunettes avec verres à changement de couleur Prismatic™',
  true,
  2
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order;

-- Update products to be in the prismatic collection using 'lifestyle' category
UPDATE products 
SET collection = 'prismatic', category = 'lifestyle', usage = 'quotidien'
WHERE 
  name ILIKE '%aura%' 
  OR name ILIKE '%euphoria%'
  OR name ILIKE '%prismatic%'
  OR description ILIKE '%prismatic%'
  OR description ILIKE '%color-changing%'
  OR description ILIKE '%changement de couleur%';

-- Also check for products that might have prismatic features
UPDATE products 
SET collection = 'prismatic', category = 'lifestyle', usage = 'quotidien'
WHERE 
  features @> ARRAY['color-changing']
  OR features @> ARRAY['prismatic']
  OR features @> ARRAY['Color-changing lenses'];
