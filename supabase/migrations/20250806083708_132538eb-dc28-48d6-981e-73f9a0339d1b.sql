-- Ajouter les variants de couleurs pour Music Shield
-- D'abord, récupérer l'ID du produit Music Shield
WITH music_shield_product AS (
  SELECT id FROM public.products 
  WHERE name ILIKE '%music shield%' 
  LIMIT 1
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
  msp.id,
  'Matte Black Frame | Fire Lenses',
  'Matte Black',
  'Fire',
  '#000000',
  0,
  10,
  true,
  1
FROM music_shield_product msp
UNION ALL
SELECT 
  msp.id,
  'Matte Black Frame | Smoke Lenses',
  'Matte Black',
  'Smoke',
  '#000000',
  0,
  10,
  false,
  2
FROM music_shield_product msp
UNION ALL
SELECT 
  msp.id,
  'White and Red Frame | Blue Lenses',
  'White and Red',
  'Blue',
  '#FFFFFF',
  0,
  10,
  false,
  3
FROM music_shield_product msp
UNION ALL
SELECT 
  msp.id,
  'White Frame | Fire Lenses',
  'White',
  'Fire',
  '#FFFFFF',
  0,
  10,
  false,
  4
FROM music_shield_product msp;