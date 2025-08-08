-- Insertion des produits Chamelo
INSERT INTO public.products (
  id,
  name,
  description,
  category,
  collection_slug,
  price,
  is_featured,
  is_active,
  lens_technology,
  sku
) VALUES 
(
  gen_random_uuid(),
  'Music Shield',
  'Lunettes connectées révolutionnaires pour les amateurs de musique. Audio intégré haute qualité avec contrôle tactile et design élégant.',
  'connected',
  'tech-collection',
  299.99,
  true,
  true,
  'Audio Integration',
  'CHAM-MS-001'
),
(
  gen_random_uuid(),
  'Sport Pro',
  'Performance ultime pour les sportifs. Résistance maximale aux chocs, traitement anti-buée et design aérodynamique.',
  'sport',
  'performance-collection', 
  199.99,
  true,
  true,
  'Anti-Fog Pro',
  'CHAM-SP-001'
),
(
  gen_random_uuid(),
  'Urban Classic',
  'Style urbain intemporel avec protection UV optimale. Confort quotidien et élégance assurés.',
  'lifestyle',
  'urban-collection',
  149.99,
  true,
  true,
  'UV Pro',
  'CHAM-UC-001'
);

-- Récupération des IDs pour les relations
WITH product_ids AS (
  SELECT id, sku FROM public.products 
  WHERE sku IN ('CHAM-MS-001', 'CHAM-SP-001', 'CHAM-UC-001')
)

-- Insertion des variants pour Music Shield
INSERT INTO public.product_variants (
  id, product_id, name, frame_color, lens_color, hex_color, price_modifier, is_default, sort_order, sku
)
SELECT 
  gen_random_uuid(),
  p.id,
  'Black Smoke',
  'Noir',
  'Fumé',
  '#1a1a1a',
  0,
  true,
  1,
  'CHAM-MS-001-BS'
FROM product_ids p WHERE p.sku = 'CHAM-MS-001'

UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'White Clear',
  'Blanc',
  'Transparent',
  '#ffffff',
  10,
  false,
  2,
  'CHAM-MS-001-WC'
FROM product_ids p WHERE p.sku = 'CHAM-MS-001'

UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'Blue Mirror',
  'Bleu',
  'Miroir Bleu',
  '#2563eb',
  25,
  false,
  3,
  'CHAM-MS-001-BM'
FROM product_ids p WHERE p.sku = 'CHAM-MS-001';