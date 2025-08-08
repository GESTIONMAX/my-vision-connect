-- Ajouter les spécifications techniques détaillées de batterie et performance
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
  'battery',
  'Autonomie ajustement de teinte',
  '100',
  'heures',
  10,
  true
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'battery',
  'Autonomie audio intégré',
  '6.5',
  'heures',
  11,
  true
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'battery',
  'Temps de charge (80%)',
  '30',
  'minutes',
  12,
  false
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'battery',
  'Capacité de la batterie',
  '180',
  'mAh',
  13,
  false
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'optical',
  'Transmission lumière visible',
  '63-17',
  '%',
  14,
  true
FROM sport_products sp
UNION ALL
SELECT 
  sp.id,
  'performance',
  'Vitesse ajustement teinte',
  '0.1',
  'seconde',
  15,
  true
FROM sport_products sp;