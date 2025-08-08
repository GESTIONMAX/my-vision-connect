-- Ajouter les spécifications techniques pour la gamme Sport
-- Music Shield Pro (avec audio intégré)
WITH music_shield_pro AS (
  SELECT id FROM products WHERE name = 'Music Shield Pro' LIMIT 1
)
INSERT INTO product_specifications (
  product_id,
  spec_category,
  spec_name,
  spec_value,
  spec_unit,
  is_highlight,
  display_order
)
SELECT 
  msp.id,
  'Audio',
  'Built-in Audio',
  'Play music or take calls with discreet speakers',
  '',
  true,
  1
FROM music_shield_pro msp
UNION ALL
SELECT 
  msp.id,
  'Lens',
  'Adjustable Lens Tint',
  'Instantly adjust the tint with a simple slide',
  '',
  true,
  2
FROM music_shield_pro msp
UNION ALL
SELECT 
  msp.id,
  'Protection',
  'Sweatproof',
  'Made of corrosion-free grip to keep up with intense workouts',
  'IPX4',
  true,
  3
FROM music_shield_pro msp
UNION ALL
SELECT 
  msp.id,
  'Durability',
  'Impact-resistant',
  'Protect against accidental force and bumps',
  '',
  true,
  4
FROM music_shield_pro msp
UNION ALL
SELECT 
  msp.id,
  'Design',
  'Ultra lightweight',
  'Get all-day comfort without sacrificing style or quality',
  '28g',
  true,
  5
FROM music_shield_pro msp;

-- Music Shield Sport (version renforcée)
WITH music_shield_sport AS (
  SELECT id FROM products WHERE name = 'Music Shield Sport' LIMIT 1
)
INSERT INTO product_specifications (
  product_id,
  spec_category,
  spec_name,
  spec_value,
  spec_unit,
  is_highlight,
  display_order
)
SELECT 
  mss.id,
  'Audio',
  'Premium Audio',
  'Audio à conduction osseuse premium',
  '',
  true,
  1
FROM music_shield_sport mss
UNION ALL
SELECT 
  mss.id,
  'Protection',
  'Waterproof',
  'Étanchéité renforcée pour sports extrêmes',
  'IPX6',
  true,
  2
FROM music_shield_sport mss
UNION ALL
SELECT 
  mss.id,
  'Lens',
  'Adaptive Photochromic',
  'Adaptation instantanée du clair au foncé',
  '',
  true,
  3
FROM music_shield_sport mss
UNION ALL
SELECT 
  mss.id,
  'Durability',
  'Ultra-resistant',
  'Structure ultra-résistante testée par des pros',
  '',
  true,
  4
FROM music_shield_sport mss
UNION ALL
SELECT 
  mss.id,
  'Design',
  'Professional Grade',
  'Testées par des athlètes professionnels',
  '32g',
  true,
  5
FROM music_shield_sport mss;