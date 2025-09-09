
-- Update products to be in the lifestyle collection
UPDATE products 
SET collection = 'lifestyle', category = 'lifestyle', usage = 'quotidien'
WHERE 
  name ILIKE '%prime%' 
  OR name ILIKE '%dusk%'
  OR name ILIKE '%dragon%'
  OR name ILIKE '%classic%'
  OR name ILIKE '%lite%'
  OR (collection IS NULL AND category IS NULL);

-- Also update some general products that should be lifestyle
UPDATE products 
SET collection = 'lifestyle', category = 'lifestyle', usage = 'quotidien'
WHERE 
  collection IS NULL 
  AND name NOT ILIKE '%adapter%' 
  AND name NOT ILIKE '%bundle%' 
  AND name NOT ILIKE '%sport%'
  AND name NOT ILIKE '%aura%';
