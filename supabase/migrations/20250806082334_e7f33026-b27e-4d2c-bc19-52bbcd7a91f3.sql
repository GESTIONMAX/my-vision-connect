-- Ajouter les modèles lifestyle à la table collections
INSERT INTO public.collections (name, slug, description, is_active, sort_order) VALUES
('Prima', 'prima', 'Style urbain moderne avec connectivité avancée', true, 10),
('Dark Classic', 'dark-classic', 'Élégance intemporelle pour un style sophistiqué', true, 11),
('Dragon', 'dragon', 'Design audacieux avec technologie de pointe', true, 12);

-- Mettre à jour les produits existants avec les bonnes collections
UPDATE public.products 
SET collection_slug = 'prima' 
WHERE name ILIKE '%prima%' AND collection_slug IS NULL;

UPDATE public.products 
SET collection_slug = 'dark-classic' 
WHERE name ILIKE '%dark classic%' AND collection_slug IS NULL;

UPDATE public.products 
SET collection_slug = 'dragon' 
WHERE name ILIKE '%dragon%' AND collection_slug IS NULL;