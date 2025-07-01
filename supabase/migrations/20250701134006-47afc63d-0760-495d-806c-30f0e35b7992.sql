
-- First, let's see what products we have that could be sport products
SELECT id, name, collection, category, usage FROM products 
WHERE name ILIKE '%aura%' OR name ILIKE '%sport%' OR name ILIKE '%basket%' OR category = 'sport';

-- Update products that should be in the sport collection
UPDATE products 
SET collection = 'sport', category = 'sport'
WHERE 
  name ILIKE '%starbury%' 
  OR name ILIKE '%basketball%'
  OR name ILIKE '%sport%'
  OR category = 'sport'
  OR usage = 'sport';

-- Also update some Aura products to be sport products since they seem to be performance glasses
UPDATE products 
SET collection = 'sport', category = 'sport', usage = 'sport'
WHERE name ILIKE '%aura%' AND (name NOT ILIKE '%adapter%' AND name NOT ILIKE '%bundle add-on%' AND name NOT ILIKE '%lens%');
