-- Associer le Falcon et Shield à la collection Sport
INSERT INTO public.product_collections (product_id, collection_slug)
SELECT p.id, 'sport'
FROM public.products p
WHERE p.name IN ('Falcon', 'Shield')
AND p.is_active = true
AND NOT EXISTS (
  SELECT 1 FROM public.product_collections pc 
  WHERE pc.product_id = p.id AND pc.collection_slug = 'sport'
);