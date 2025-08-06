-- Ajout des options pour les produits Chamelo
WITH product_data AS (
  SELECT id, sku FROM public.products 
  WHERE sku IN ('CHAM-MS-001', 'CHAM-SP-001', 'CHAM-UC-001')
)

-- Options pour Music Shield
INSERT INTO public.product_options (
  id, product_id, name, description, option_type, price_modifier, is_default, sort_order, is_available
)
SELECT 
  gen_random_uuid(),
  p.id,
  'Étui de Protection Premium',
  'Étui en cuir véritable avec compartiment de rangement',
  'accessory',
  29.99,
  false,
  1,
  true
FROM product_data p WHERE p.sku = 'CHAM-MS-001'

UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'Kit de Nettoyage Pro',
  'Kit complet avec solution et chiffons microfibres',
  'maintenance',
  15.99,
  false,
  2,
  true
FROM product_data p WHERE p.sku = 'CHAM-MS-001'

UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'Câble USB-C Magnétique',
  'Câble de charge magnétique waterproof',
  'charging',
  19.99,
  false,
  3,
  true
FROM product_data p WHERE p.sku = 'CHAM-MS-001'

-- Options pour Sport Pro
UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'Sangle Sport Néoprène',
  'Sangle élastique haute résistance pour sports extrêmes',
  'accessory',
  24.99,
  false,
  1,
  true
FROM product_data p WHERE p.sku = 'CHAM-SP-001'

UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'Verres de Rechange',
  'Jeu de verres de rechange polarisés',
  'replacement',
  49.99,
  false,
  2,
  true
FROM product_data p WHERE p.sku = 'CHAM-SP-001'

-- Options pour Urban Classic
UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'Chaîne Décorative Or',
  'Chaîne élégante plaqué or 18k',
  'accessory',
  39.99,
  false,
  1,
  true
FROM product_data p WHERE p.sku = 'CHAM-UC-001'

UNION ALL

SELECT 
  gen_random_uuid(),
  p.id,
  'Pochette en Soie',
  'Pochette de protection en soie naturelle',
  'protection',
  22.99,
  false,
  2,
  true
FROM product_data p WHERE p.sku = 'CHAM-UC-001';