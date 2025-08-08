-- Création des collections Chamelo
INSERT INTO public.collections (
  id,
  name,
  slug,
  description,
  is_active,
  sort_order
) VALUES 
(
  gen_random_uuid(),
  'Tech Collection',
  'tech-collection',
  'Collection de lunettes connectées innovantes',
  true,
  1
),
(
  gen_random_uuid(),
  'Performance Collection',
  'performance-collection',
  'Collection haute performance pour sportifs',
  true,
  2
),
(
  gen_random_uuid(),
  'Urban Collection',
  'urban-collection',
  'Collection lifestyle urbaine',
  true,
  3
);

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