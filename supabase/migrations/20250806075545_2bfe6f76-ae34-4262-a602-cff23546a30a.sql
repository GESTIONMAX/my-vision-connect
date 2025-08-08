-- Ajout des variants pour tous les produits Chamelo
WITH product_data AS (
  SELECT id, sku, name FROM public.products 
  WHERE sku IN ('CHAM-MS-001', 'CHAM-SP-001', 'CHAM-UC-001')
)

-- Variants pour Music Shield
INSERT INTO public.product_variants (
  id, product_id, name, frame_color, lens_color, hex_color, price_modifier, is_default, sort_order, sku, stock_quantity
)
SELECT 
  gen_random_uuid(),
  p.id,
  'black-smoke',
  'Noir',
  'Fumé',
  '#1a1a1a',
  0,
  true,
  1,
  'CHAM-MS-001-BS',
  50
FROM product_data p WHERE p.sku = 'CHAM-MS-001'

UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'white-clear',
  'Blanc',
  'Transparent',
  '#ffffff',
  10,
  false,
  2,
  'CHAM-MS-001-WC',
  30
FROM product_data p WHERE p.sku = 'CHAM-MS-001'

UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'blue-mirror',
  'Bleu',
  'Miroir Bleu',
  '#2563eb',
  25,
  false,
  3,
  'CHAM-MS-001-BM',
  25
FROM product_data p WHERE p.sku = 'CHAM-MS-001'

-- Variants pour Sport Pro
UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'matte-black',
  'Noir Mat',
  'Gris Polarisé',
  '#2d2d2d',
  0,
  true,
  1,
  'CHAM-SP-001-MB',
  40
FROM product_data p WHERE p.sku = 'CHAM-SP-001'

UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'neon-green',
  'Vert Fluo',
  'Orange Sport',
  '#22c55e',
  15,
  false,
  2,
  'CHAM-SP-001-NG',
  35
FROM product_data p WHERE p.sku = 'CHAM-SP-001'

-- Variants pour Urban Classic
UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'tortoise',
  'Écaille',
  'Brun Dégradé',
  '#8b4513',
  0,
  true,
  1,
  'CHAM-UC-001-TT',
  60
FROM product_data p WHERE p.sku = 'CHAM-UC-001'

UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'crystal-grey',
  'Gris Cristal',
  'Gris Neutre',
  '#6b7280',
  5,
  false,
  2,
  'CHAM-UC-001-CG',
  45
FROM product_data p WHERE p.sku = 'CHAM-UC-001';