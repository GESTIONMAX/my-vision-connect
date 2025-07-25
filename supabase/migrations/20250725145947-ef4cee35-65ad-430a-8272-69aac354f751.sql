-- Agrandir les champs de texte pour permettre des descriptions détaillées
ALTER TABLE products 
ALTER COLUMN description TYPE TEXT,
ALTER COLUMN lens_technology TYPE TEXT,
ALTER COLUMN ecommerce_readiness TYPE TEXT;