-- Mettre à jour les variantes du Falcon avec les couleurs exactes
-- D'abord supprimer les anciennes variantes du Falcon
DELETE FROM public.product_variants 
WHERE product_id IN (SELECT id FROM public.products WHERE name = 'Falcon');

-- Ajouter les nouvelles variantes avec les couleurs exactes
WITH falcon_product AS (
  SELECT id FROM public.products WHERE name = 'Falcon' LIMIT 1
)
INSERT INTO public.product_variants (
  product_id,
  name,
  frame_color,
  lens_color,
  hex_color,
  price_modifier,
  stock_quantity,
  is_default,
  sort_order
)
SELECT 
  fp.id,
  'Ice Frame | Alpha Purple Lens',
  'Ice',
  'Alpha Purple',
  '#E0F2FE',
  0,
  15,
  true,
  1
FROM falcon_product fp
UNION ALL
SELECT 
  fp.id,
  'Ice Frame | Alpha Blue Lens',
  'Ice',
  'Alpha Blue',
  '#E0F2FE',
  0,
  12,
  false,
  2
FROM falcon_product fp;