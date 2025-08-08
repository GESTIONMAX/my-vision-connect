-- Mettre à jour la gamme Sport avec tous les produits visibles dans l'image
-- D'abord, nettoyer les associations existantes pour éviter les doublons
DELETE FROM public.product_collections WHERE collection_slug = 'sport';

-- Ajouter tous les produits de la gamme Sport
INSERT INTO public.product_collections (product_id, collection_slug)
SELECT p.id, 'sport'
FROM public.products p
WHERE p.name IN (
  'Music Shield',
  'Music Shield Pro', 
  'Music Shield Sport',
  'Shields Classic',
  'Shields Elite'
)
AND p.is_active = true;

-- Ajouter les produits Falcon et Shield manquants s'ils n'existent pas
INSERT INTO public.products (name, description, price, category, is_active, is_featured, stock_quantity, rating, review_count)
SELECT 'Falcon', 'Lunettes intelligentes performantes adaptées aux activités sportives', 299.99, 'sport', true, false, 15, 4.3, 45
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Falcon');

INSERT INTO public.products (name, description, price, category, is_active, is_featured, stock_quantity, rating, review_count)
SELECT 'Shield', 'Protection oculaire avancée avec design sport', 249.99, 'sport', true, false, 20, 4.1, 32
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Shield');

-- Associer les nouveaux produits à la collection Sport
INSERT INTO public.product_collections (product_id, collection_slug)
SELECT p.id, 'sport'
FROM public.products p
WHERE p.name IN ('Falcon', 'Shield')
AND p.is_active = true
AND NOT EXISTS (
  SELECT 1 FROM public.product_collections pc 
  WHERE pc.product_id = p.id AND pc.collection_slug = 'sport'
);