-- Créer les variantes manquantes pour la gamme Sport selon l'image
-- D'abord, récupérer les IDs des produits
WITH sport_product_ids AS (
  SELECT p.id, p.name FROM public.products p
  JOIN public.product_collections pc ON p.id = pc.product_id
  WHERE pc.collection_slug = 'sport'
)

-- Ajouter les variantes pour Music Shield (2 variantes supplémentaires)
INSERT INTO public.product_variants (
  product_id, name, frame_color, lens_color, hex_color, price_modifier, stock_quantity, is_default, sort_order
)
SELECT 
  spi.id, 'White and Red Frame | Red Lenses', 'White and Red', 'Red', '#FFFFFF', 25, 8, false, 5
FROM sport_product_ids spi WHERE spi.name = 'Music Shield'
UNION ALL
SELECT 
  spi.id, 'White Frame | Blue Lenses', 'White', 'Blue', '#FFFFFF', 20, 12, false, 6
FROM sport_product_ids spi WHERE spi.name = 'Music Shield'

-- Ajouter les variantes pour Falcon
UNION ALL
SELECT 
  spi.id, 'Blue Frame | Blue Lenses', 'Blue', 'Blue', '#1E40AF', 0, 15, true, 1
FROM sport_product_ids spi WHERE spi.name = 'Falcon'
UNION ALL
SELECT 
  spi.id, 'Light Blue Frame | Prismatic Lenses', 'Light Blue', 'Prismatic', '#60A5FA', 30, 10, false, 2
FROM sport_product_ids spi WHERE spi.name = 'Falcon'

-- Ajouter les variantes pour Shield (4 variantes)
UNION ALL
SELECT 
  spi.id, 'Black Frame | Dark Lenses', 'Black', 'Dark', '#000000', 0, 20, true, 1
FROM sport_product_ids spi WHERE spi.name = 'Shield'
UNION ALL
SELECT 
  spi.id, 'White Frame | Orange Lenses', 'White', 'Orange', '#FFFFFF', 15, 18, false, 2
FROM sport_product_ids spi WHERE spi.name = 'Shield'
UNION ALL
SELECT 
  spi.id, 'Orange Frame | Orange Lenses', 'Orange', 'Orange', '#EA580C', 20, 12, false, 3
FROM sport_product_ids spi WHERE spi.name = 'Shield'
UNION ALL
SELECT 
  spi.id, 'Green Frame | Yellow Lenses', 'Green', 'Yellow', '#16A34A', 25, 14, false, 4
FROM sport_product_ids spi WHERE spi.name = 'Shield';