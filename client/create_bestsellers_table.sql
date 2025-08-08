-- Création d'une table dédiée aux meilleures ventes

-- Option 1: Table de référence séparée qui associe les produits aux meilleures ventes
-- Cette approche permet de gérer facilement l'ordre d'affichage et d'ajouter des métadonnées spécifiques aux bestsellers

CREATE TABLE IF NOT EXISTS bestsellers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL,
  rank INTEGER NOT NULL, -- Position d'affichage (1, 2, 3, etc.)
  featured BOOLEAN DEFAULT false, -- Pour mettre en avant certains bestsellers
  start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Date de début comme bestseller
  end_date TIMESTAMP WITH TIME ZONE, -- Date de fin optionnelle (NULL = pas de date de fin)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Contrainte de clé étrangère vers la table products
  CONSTRAINT fk_product FOREIGN KEY (product_id) 
    REFERENCES products (id) ON DELETE CASCADE,
    
  -- Contrainte d'unicité pour éviter les doublons
  CONSTRAINT unique_product_bestseller UNIQUE (product_id)
);

-- Créer un index pour améliorer les performances de recherche
CREATE INDEX IF NOT EXISTS idx_bestsellers_product_id ON bestsellers(product_id);

-- Créer une vue pour faciliter la récupération des bestsellers avec leurs détails
CREATE OR REPLACE VIEW view_bestsellers AS
SELECT 
  b.id as bestseller_id,
  b.rank,
  b.featured,
  p.*
FROM 
  bestsellers b
JOIN 
  products p ON b.product_id = p.id
WHERE 
  (b.end_date IS NULL OR b.end_date > CURRENT_TIMESTAMP)
ORDER BY 
  b.rank ASC;

-- Exemple d'insertion de bestsellers (à adapter avec vos IDs réels)
-- INSERT INTO bestsellers (product_id, rank) 
-- VALUES 
--   ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 1),
--   ('ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj', 2);

-- Option 2: Si vous préférez ajouter un champ à la table products existante
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS is_bestseller BOOLEAN DEFAULT false;
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS bestseller_rank INTEGER DEFAULT NULL;
