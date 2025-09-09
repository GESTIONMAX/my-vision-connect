
-- Insert Music Shield variant without audio
INSERT INTO products (
  name, slug, description, price, original_price, category, collection, 
  color, usage, genre, features, specifications, is_popular, in_stock, images
) VALUES 
(
  'Music Shield Standard',
  'music-shield-standard',
  'Lunettes de sport avec branches ajustables et verres performants pour les athlètes exigeants. Version sans audio.',
  199,
  NULL,
  'sport',
  'sport',
  ARRAY['noir', 'rouge', 'bleu', 'orange'],
  'sport',
  'mixte',
  ARRAY['Branches ajustables', 'Verres performants', 'Design sport', 'Protection UV'],
  '{"protection": "UV400", "résistance": "IPX4", "matériau": "TR90 sport", "poids": "28g"}',
  false,
  true,
  ARRAY['/placeholder.svg']
);
