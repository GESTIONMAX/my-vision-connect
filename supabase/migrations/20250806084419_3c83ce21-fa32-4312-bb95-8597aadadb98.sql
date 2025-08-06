-- Ajouter les spécifications techniques détaillées pour la technologie Eclipse™
-- D'abord récupérer les IDs des produits de la gamme Sport
WITH sport_products AS (
  SELECT p.id, p.name FROM public.products p
  JOIN public.product_collections pc ON p.id = pc.product_id
  WHERE pc.collection_slug = 'sport'
)
INSERT INTO public.product_specifications (
  product_id,
  spec_category,
  spec_name,
  spec_value,
  spec_unit,
  display_order,
  is_highlight
)
SELECT 
  sp.id,
  'lens_technology',
  'Technologie Eclipse™ Tint-Adjustable',
  'Contrôle tactile intégré pour ajustement de teinte',
  '',
  1,
  true
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'lens_technology',
  'Vitesse d''ajustement',
  '0.1',
  'seconde',
  2,
  true
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'lens_technology',
  'Performance vs photochromique',
  '1800x plus rapide',
  '',
  3,
  true
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'lens_technology',
  'Type de contrôle',
  'Touch tint slider intégré',
  '',
  4,
  false
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'audio',
  'Audio intégré',
  'Haut-parleurs directionnels',
  '',
  5,
  true
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'protection',
  'Résistance aux impacts',
  'Protection sport haute performance',
  '',
  6,
  false
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'comfort',
  'Résistance à la transpiration',
  'Traitement hydrophobe avancé',
  '',
  7,
  false
FROM sport_products sp;