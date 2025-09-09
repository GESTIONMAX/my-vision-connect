
-- First, let's check what collections exist
SELECT * FROM collections ORDER BY sort_order;

-- Then check what products exist and their collection values
SELECT id, name, collection, category FROM products;

-- Update existing products to use the sport collection slug
UPDATE products 
SET collection = 'sport' 
WHERE category = 'sport' OR usage = 'sport';

-- Also ensure we have some sport products by updating specific products
UPDATE products 
SET collection = 'sport', category = 'sport'
WHERE name ILIKE '%sport%' OR description ILIKE '%sport%' OR name ILIKE '%athletic%';
