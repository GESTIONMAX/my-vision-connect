-- Ajouter la catégorie "Lunettes sport collection" si elle n'existe pas déjà
INSERT INTO custom_categories (name, slug, handle, description, parent_category_id, is_active)
SELECT 'Lunettes sport collection', 'sport-lunettes', 'sport-lunettes', 'Collection de lunettes sport incluant SHIELD et MUSIC SHIELD', NULL, true
WHERE NOT EXISTS (SELECT 1 FROM custom_categories WHERE slug = 'sport-lunettes');

-- Récupérer l'ID de la catégorie nouvellement créée
DO $$ 
DECLARE
    category_id UUID;
BEGIN
    SELECT id INTO category_id FROM custom_categories WHERE slug = 'sport-lunettes';
    
    -- Associer les produits SHIELD à cette catégorie
    INSERT INTO product_category_mapping (shopify_product_id, custom_category_id)
    SELECT id, category_id 
    FROM chamelo_products 
    WHERE title ILIKE '%shield%' 
    AND NOT EXISTS (
        SELECT 1 FROM product_category_mapping pcm 
        WHERE pcm.shopify_product_id = chamelo_products.id AND pcm.custom_category_id = category_id
    );
    
    -- Si nécessaire, on peut aussi associer d'autres produits de sport
    -- INSERT INTO product_category_mapping (product_id, category_id)
    -- SELECT id, category_id 
    -- FROM products 
    -- WHERE (category = 'sport' OR tags LIKE '%sport%')
    -- AND NOT EXISTS (
    --    SELECT 1 FROM product_category_mapping pcm 
    --    WHERE pcm.product_id = products.id AND pcm.category_id = category_id
    -- );
END $$;
