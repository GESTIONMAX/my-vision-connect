
-- Insert Sport collection products
INSERT INTO products (
  name, slug, description, price, original_price, category, collection, 
  color, usage, genre, features, specifications, is_popular, in_stock, images
) VALUES 
-- Music Shield - Best Seller
(
  'Music Shield',
  'music-shield',
  'Lunettes de sport avec audio intégré et branches ajustables pour les athlètes exigeants.',
  249,
  NULL,
  'sport',
  'sport',
  ARRAY['noir', 'rouge', 'bleu', 'orange'],
  'sport',
  'mixte',
  ARRAY['Audio intégré', 'Branches ajustables', 'Verres performants', 'Design sport'],
  '{"autonomie": "12 heures", "audio": "Stéréo haute qualité", "résistance": "IPX4", "poids": "32g"}',
  true,
  true,
  ARRAY['/placeholder.svg']
),
-- Falcon
(
  'Falcon',
  'falcon',
  'Lunettes sport avec ajustement automatique de la teinte et design enveloppant pour la performance.',
  199,
  NULL,
  'sport',
  'sport',
  ARRAY['noir', 'fumé', 'iridescent', 'violet'],
  'sport',
  'mixte',
  ARRAY['Teinte automatique', 'Design enveloppant', 'Performance', 'Anti-éblouissement'],
  '{"teinte": "Ajustement automatique", "protection": "UV400", "matériau": "TR90 sport", "poids": "28g"}',
  false,
  true,
  ARRAY['/placeholder.svg']
),
-- Shield
(
  'Shield',
  'shield',
  'Nouvelle génération de lunettes de sport avec verres double teinte pour une protection optimale.',
  199,
  159,
  'sport',
  'sport',
  ARRAY['noir', 'rouge', 'bleu', 'orange', 'fumé', 'violet'],
  'sport',
  'mixte',
  ARRAY['Verres double teinte', 'Nouvelle génération', 'Protection avancée', 'Design sport'],
  '{"verres": "Double teinte (dual-tint)", "protection": "UV400+", "technologie": "Nouvelle génération", "poids": "30g"}',
  false,
  true,
  ARRAY['/placeholder.svg']
);
