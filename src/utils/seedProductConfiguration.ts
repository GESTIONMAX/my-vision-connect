// Script pour peupler les nouvelles tables de configuration avec des données d'exemple
// Ce script peut être utilisé pour tester le système de configuration des produits

export const sampleProductVariants = [
  // Variants pour Music Shield Pro
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020', // Music Shield Pro
    name: 'Monture Noire | Verres Fumés',
    frame_color: 'Noir Mat',
    lens_color: 'Fumé',
    hex_color: '#1a1a1a',
    price_modifier: 0,
    images: ['https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800'],
    stock_quantity: 15,
    is_default: true,
    sort_order: 1,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    name: 'Monture Blanche | Verres Bleus',
    frame_color: 'Blanc',
    lens_color: 'Bleu',
    hex_color: '#ffffff',
    price_modifier: 0,
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800'],
    stock_quantity: 12,
    is_default: false,
    sort_order: 2,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    name: 'Monture Rouge | Verres Transparents',
    frame_color: 'Rouge',
    lens_color: 'Transparent',
    hex_color: '#dc2626',
    price_modifier: 10,
    images: ['https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800'],
    stock_quantity: 8,
    is_default: false,
    sort_order: 3,
  },
];

export const sampleProductOptions = [
  // Options Audio pour Music Shield Pro
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    option_type: 'audio',
    name: 'Avec Audio',
    description: 'Audio Bluetooth intégré avec micro antibruit',
    price_modifier: 0,
    is_default: true,
    is_available: true,
    sort_order: 1,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    option_type: 'audio',
    name: 'Sans Audio',
    description: 'Version allégée sans composants audio',
    price_modifier: -50,
    is_default: false,
    is_available: true,
    sort_order: 2,
  },
  // Options Étui
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    option_type: 'case',
    name: 'Étui Standard',
    description: 'Étui de protection rigide inclus',
    price_modifier: 0,
    is_default: true,
    is_available: true,
    sort_order: 1,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    option_type: 'case',
    name: 'Étui Premium',
    description: 'Étui cuir avec compartiments pour accessoires',
    price_modifier: 25,
    is_default: false,
    is_available: true,
    sort_order: 2,
  },
];

export const sampleProductSpecifications = [
  // Spécifications pour Music Shield Pro
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    spec_category: 'dimensions',
    spec_name: 'Largeur',
    spec_value: '145',
    spec_unit: 'mm',
    display_order: 1,
    is_highlight: true,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    spec_category: 'dimensions',
    spec_name: 'Hauteur',
    spec_value: '52',
    spec_unit: 'mm',
    display_order: 2,
    is_highlight: false,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    spec_category: 'dimensions',
    spec_name: 'Poids',
    spec_value: '38',
    spec_unit: 'g',
    display_order: 3,
    is_highlight: true,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    spec_category: 'matériaux',
    spec_name: 'Monture',
    spec_value: 'TR90 Ultra-léger',
    spec_unit: '',
    display_order: 1,
    is_highlight: true,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    spec_category: 'matériaux',
    spec_name: 'Verres',
    spec_value: 'Polycarbonate électrochrome',
    spec_unit: '',
    display_order: 2,
    is_highlight: true,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    spec_category: 'fonctionnalités',
    spec_name: 'Autonomie Audio',
    spec_value: '10',
    spec_unit: 'heures',
    display_order: 1,
    is_highlight: true,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    spec_category: 'fonctionnalités',
    spec_name: 'Autonomie Teinte',
    spec_value: '72',
    spec_unit: 'heures',
    display_order: 2,
    is_highlight: false,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    spec_category: 'fonctionnalités',
    spec_name: 'Charge Rapide',
    spec_value: '90',
    spec_unit: 'minutes',
    display_order: 3,
    is_highlight: false,
  },
  {
    product_id: '7706d991-de8e-4f16-83f9-12e6db235020',
    spec_category: 'fonctionnalités',
    spec_name: 'Protection',
    spec_value: 'IPX4',
    spec_unit: '',
    display_order: 4,
    is_highlight: true,
  },
];

// Fonction pour insérer les données d'exemple
export const insertSampleData = async () => {
  console.log('Ces données peuvent être insérées dans Supabase pour tester le système de configuration:');
  console.log('Variants:', sampleProductVariants);
  console.log('Options:', sampleProductOptions);
  console.log('Specifications:', sampleProductSpecifications);
  
  // Cette fonction peut être utilisée avec le client Supabase pour insérer les données
  // Exemple d'utilisation:
  /*
  import { supabase } from '@/integrations/supabase/client';
  
  const { error: variantsError } = await supabase
    .from('product_variants')
    .insert(sampleProductVariants);
    
  const { error: optionsError } = await supabase
    .from('product_options')
    .insert(sampleProductOptions);
    
  const { error: specsError } = await supabase
    .from('product_specifications')
    .insert(sampleProductSpecifications);
  */
};