-- Ajouter les modèles prismatic à la table collections
INSERT INTO public.collections (name, slug, description, is_active, sort_order) VALUES
('Aura', 'aura', 'Lunettes connectées avec technologie Prismatic™ avancée', true, 20),
('Euphoria', 'euphoria', 'Réalité augmentée et expérience immersive avec Prismatic™', true, 21);

-- Mettre à jour les produits existants avec les bonnes collections
UPDATE public.products 
SET collection_slug = 'aura' 
WHERE name ILIKE '%aura%' AND collection_slug IS NULL;

UPDATE public.products 
SET collection_slug = 'euphoria' 
WHERE name ILIKE '%euphoria%' AND collection_slug IS NULL;