export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'classic' | 'sport' | 'pro' | 'femme' | 'homme' | 'lifestyle';
  color: string[];
  usage: 'quotidien' | 'sport' | 'conduite' | 'travail';
  genre: 'mixte' | 'homme' | 'femme';
  images: string[];
  features: string[];
  specifications: { [key: string]: string };
  isNew?: boolean;
  isPopular?: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  collection?: 'lifestyle' | 'prismatic' | 'sport';
}

export const products: Product[] = [
  {
    id: '1',
    name: 'NeoShades Classic',
    slug: 'neoshades-classic',
    description: 'Lunettes connectées à teinte électronique pour un usage quotidien. Design intemporel et technologie avancée.',
    price: 299,
    category: 'classic',
    color: ['noir', 'marron', 'bleu'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Teinte électronique', 'Autonomie 48h', 'Design classique', 'Protection UV 100%'],
    specifications: {
      'Autonomie': '48 heures',
      'Temps de charge': '2 heures',
      'Protection UV': '100%',
      'Poids': '35g',
      'Matériau': 'Acétate premium',
      'Connectivité': 'Bluetooth 5.0'
    },
    isPopular: true,
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '2',
    name: 'NeoShades Sport',
    slug: 'neoshades-sport',
    description: 'Lunettes connectées robustes pour les activités sportives. Résistantes aux chocs et à l\'eau.',
    price: 399,
    originalPrice: 449,
    category: 'sport',
    color: ['noir', 'rouge', 'blanc'],
    usage: 'sport',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Résistant aux chocs', 'Étanche IP67', 'Monture légère', 'Verres polarisés'],
    specifications: {
      'Autonomie': '36 heures',
      'Temps de charge': '1.5 heures',
      'Protection': 'IP67',
      'Poids': '28g',
      'Matériau': 'TR90 sport',
      'Verres': 'Polarisés anti-reflets'
    },
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    collection: 'sport'
  },
  {
    id: '3',
    name: 'NeoShades Pro',
    slug: 'neoshades-pro',
    description: 'Le summum de la technologie. IA intégrée, GPS et appels mains libres pour les professionnels.',
    price: 599,
    category: 'pro',
    color: ['noir', 'titane'],
    usage: 'travail',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['IA intégrée', 'GPS navigation', 'Appels mains libres', 'Écran OLED'],
    specifications: {
      'Autonomie': '72 heures',
      'Temps de charge': '3 heures',
      'Écran': 'OLED couleur',
      'Poids': '42g',
      'Matériau': 'Titane premium',
      'Processeur': 'Qualcomm Snapdragon'
    },
    isNew: true,
    rating: 5.0,
    reviewCount: 203,
    inStock: true,
    collection: 'prismatic'
  },
  {
    id: '4',
    name: 'NeoShades Femme Élégance',
    slug: 'neoshades-femme-elegance',
    description: 'Design féminin raffiné avec teinte électronique adaptative. Parfait pour toutes les occasions.',
    price: 349,
    category: 'femme',
    color: ['rose gold', 'violet', 'blanc nacré'],
    usage: 'quotidien',
    genre: 'femme',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Design féminin', 'Teinte adaptative', 'Cristaux Swarovski', 'App beauté'],
    specifications: {
      'Autonomie': '45 heures',
      'Temps de charge': '2 heures',
      'Détails': 'Cristaux Swarovski',
      'Poids': '32g',
      'Matériau': 'Acétate italien',
      'App': 'Mode beauté intégrée'
    },
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '5',
    name: 'NeoShades Homme Executive',
    slug: 'neoshades-homme-executive',
    description: 'Style masculin sophistiqué pour les dirigeants. Technologie discrète et performance optimale.',
    price: 449,
    category: 'homme',
    color: ['noir mat', 'gun metal', 'bleu nuit'],
    usage: 'travail',
    genre: 'homme',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Style executive', 'Technologie discrète', 'Filtre lumière bleue', 'Mode confidentialité'],
    specifications: {
      'Autonomie': '60 heures',
      'Temps de charge': '2.5 heures',
      'Filtre': 'Lumière bleue premium',
      'Poids': '38g',
      'Matériau': 'Aluminium aerospace',
      'Mode': 'Confidentialité business'
    },
    rating: 4.6,
    reviewCount: 98,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '6',
    name: 'NeoShades Drive',
    slug: 'neoshades-drive',
    description: 'Spécialement conçues pour la conduite. Adaptation automatique aux conditions de luminosité.',
    price: 379,
    category: 'classic',
    color: ['noir', 'marron havane'],
    usage: 'conduite',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Mode conduite', 'Adaptation auto', 'Anti-éblouissement', 'Vision nocturne'],
    specifications: {
      'Autonomie': '50 heures',
      'Temps de charge': '2 heures',
      'Mode': 'Conduite intelligente',
      'Poids': '36g',
      'Matériau': 'TR90 flexible',
      'Vision': 'Nocturne améliorée'
    },
    rating: 4.5,
    reviewCount: 67,
    inStock: false,
    collection: 'lifestyle'
  },
  {
    id: '7',
    name: 'NeoShades Urban',
    slug: 'neoshades-urban',
    description: 'Style urbain moderne pour la vie quotidienne. Design épuré et fonctionnalités essentielles.',
    price: 259,
    category: 'lifestyle',
    color: ['noir', 'blanc', 'gris'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Style urbain', 'Léger et confortable', 'Teinte automatique', 'Bluetooth'],
    specifications: {
      'Autonomie': '40 heures',
      'Temps de charge': '1.5 heures',
      'Poids': '30g',
      'Matériau': 'Polycarbonate',
      'Style': 'Urbain moderne'
    },
    rating: 4.4,
    reviewCount: 85,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '8',
    name: 'NeoShades Casual',
    slug: 'neoshades-casual',
    description: 'Lunettes décontractées pour tous les jours. Confort optimal et style intemporel.',
    price: 229,
    category: 'lifestyle',
    color: ['marron', 'vert olive', 'bleu marine'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Confort optimal', 'Style décontracté', 'Protection UV', 'Design léger'],
    specifications: {
      'Autonomie': '35 heures',
      'Temps de charge': '1.5 heures',
      'Poids': '28g',
      'Matériau': 'Acétate bio',
      'Style': 'Casual chic'
    },
    rating: 4.3,
    reviewCount: 92,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '9',
    name: 'NeoShades Retro',
    slug: 'neoshades-retro',
    description: 'Style rétro vintage avec technologie moderne. Parfait pour un look authentique et branché.',
    price: 289,
    category: 'lifestyle',
    color: ['marron tortue', 'noir vintage', 'vert sauge'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Design vintage', 'Monture épaisse', 'Filtres Instagram', 'Mode photo'],
    specifications: {
      'Autonomie': '42 heures',
      'Temps de charge': '2 heures',
      'Style': 'Vintage authentique',
      'Poids': '34g',
      'Matériau': 'Acétate premium',
      'Filtres': 'Photo vintage intégrés'
    },
    rating: 4.5,
    reviewCount: 73,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '10',
    name: 'NeoShades Minimalist',
    slug: 'neoshades-minimalist',
    description: 'Design épuré et minimaliste pour les amateurs de simplicité. Élégance discrète garantie.',
    price: 249,
    category: 'lifestyle',
    color: ['transparent', 'noir mat', 'argent'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Design minimaliste', 'Ultra léger', 'Transparence', 'Mode silencieux'],
    specifications: {
      'Autonomie': '38 heures',
      'Temps de charge': '1.5 heures',
      'Style': 'Minimaliste',
      'Poids': '26g',
      'Matériau': 'Titanium léger',
      'Design': 'Invisible'
    },
    rating: 4.6,
    reviewCount: 94,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '11',
    name: 'NeoShades Creative',
    slug: 'neoshades-creative',
    description: 'Lunettes pour les créatifs et artistes. Fonctionnalités spéciales pour la création de contenu.',
    price: 329,
    category: 'lifestyle',
    color: ['multicolore', 'prisme', 'arc-en-ciel'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Mode créatif', 'Capture 4K', 'Palette couleurs', 'Live streaming'],
    specifications: {
      'Autonomie': '45 heures',
      'Temps de charge': '2 heures',
      'Vidéo': '4K 60fps',
      'Poids': '37g',
      'Matériau': 'Polymère coloré',
      'Créativité': 'Outils intégrés'
    },
    isNew: true,
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '12',
    name: 'NeoShades Eco',
    slug: 'neoshades-eco',
    description: 'Lunettes écologiques fabriquées à partir de matériaux recyclés. Pour un mode de vie responsable.',
    price: 199,
    category: 'lifestyle',
    color: ['bambou naturel', 'liège', 'bois foncé'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Matériaux recyclés', 'Empreinte carbone neutre', 'Biodégradable', 'Solaire'],
    specifications: {
      'Autonomie': '50 heures',
      'Temps de charge': 'Solaire + USB',
      'Matériau': '100% recyclé',
      'Poids': '29g',
      'Écologie': 'Carbone neutre',
      'Charge': 'Panneau solaire'
    },
    rating: 4.4,
    reviewCount: 88,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '13',
    name: 'NeoShades Travel',
    slug: 'neoshades-travel',
    description: 'Compagnon idéal pour les voyageurs. GPS, traduction et guide touristique intégrés.',
    price: 369,
    category: 'lifestyle',
    color: ['kaki aventure', 'bleu océan', 'terre de sienne'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['GPS mondial', 'Traduction temps réel', 'Guide touristique', 'Mode hors-ligne'],
    specifications: {
      'Autonomie': '55 heures',
      'Temps de charge': '2.5 heures',
      'GPS': 'Mondial précis',
      'Poids': '35g',
      'Langues': '100+ langues',
      'Cartes': 'Monde entier'
    },
    rating: 4.8,
    reviewCount: 112,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '14',
    name: 'NeoShades Student',
    slug: 'neoshades-student',
    description: 'Spécialement conçues pour les étudiants. Prix abordable et fonctionnalités d\'apprentissage.',
    price: 179,
    originalPrice: 219,
    category: 'lifestyle',
    color: ['bleu étudiant', 'rouge campus', 'vert académie'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Prix étudiant', 'Mode étude', 'Anti-fatigue', 'Notifications cours'],
    specifications: {
      'Autonomie': '30 heures',
      'Temps de charge': '1 heure',
      'Prix': 'Tarif étudiant',
      'Poids': '25g',
      'Étude': 'Mode concentration',
      'Garantie': '3 ans étudiant'
    },
    isPopular: true,
    rating: 4.3,
    reviewCount: 267,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '15',
    name: 'NeoShades Night',
    slug: 'neoshades-night',
    description: 'Parfaites pour la vie nocturne. Éclairage LED discret et mode soirée intégré.',
    price: 319,
    category: 'lifestyle',
    color: ['noir brillant', 'violet nuit', 'or rose'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['LED discrètes', 'Mode soirée', 'Anti-éblouissement', 'Musique sync'],
    specifications: {
      'Autonomie': '25 heures',
      'Temps de charge': '1.5 heures',
      'Éclairage': 'LED RGB',
      'Poids': '33g',
      'Musique': 'Synchronisation',
      'Mode': 'Soirée optimisé'
    },
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '16',
    name: 'Chamelo Urban Black',
    slug: 'chamelo-urban-black',
    description: 'Style urbain discret et sobre. Verres noirs foncés pour un usage quotidien polyvalent en ville.',
    price: 279,
    category: 'lifestyle',
    color: ['noir', 'noir mat'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Teinte électronique', 'Protection UV400', 'Design urbain', 'Polyvalent'],
    specifications: {
      'Autonomie': '42 heures',
      'Temps de charge': '2 heures',
      'Protection UV': 'UV400',
      'Poids': '32g',
      'Matériau': 'Acétate urbain',
      'Style': 'Urbain discret'
    },
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '17',
    name: 'Chamelo Urban Gray',
    slug: 'chamelo-urban-gray',
    description: 'Élégance professionnelle avec verres gris et monture noire mate. Parfait pour le travail et les déplacements.',
    price: 299,
    category: 'lifestyle',
    color: ['gris', 'noir mat'],
    usage: 'travail',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Verres gris', 'Style professionnel', 'Monture mate', 'Anti-reflets'],
    specifications: {
      'Autonomie': '45 heures',
      'Temps de charge': '2 heures',
      'Protection UV': 'UV400',
      'Poids': '34g',
      'Matériau': 'Acétate premium mat',
      'Style': 'Professionnel élégant'
    },
    rating: 4.6,
    reviewCount: 76,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '18',
    name: 'Chamelo Urban Silver',
    slug: 'chamelo-urban-silver',
    description: 'Design moderne et technologique avec verres miroir argentés. Innovation et style pour lumière modérée à forte.',
    price: 329,
    category: 'lifestyle',
    color: ['argent', 'miroir argenté'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Verres miroir', 'Monture métallique', 'Style tech', 'Anti-éblouissement'],
    specifications: {
      'Autonomie': '40 heures',
      'Temps de charge': '1.5 heures',
      'Protection UV': 'UV400',
      'Poids': '36g',
      'Matériau': 'Alliage métallique',
      'Style': 'Moderne technologique'
    },
    isNew: true,
    rating: 4.7,
    reviewCount: 94,
    inStock: true,
    collection: 'lifestyle'
  },
  {
    id: '19',
    name: 'Chamelo Urban Blue',
    slug: 'chamelo-urban-blue',
    description: 'Original et tendance avec verres bleus foncés. Pour un lifestyle mode et urbain créatif.',
    price: 309,
    category: 'lifestyle',
    color: ['bleu foncé', 'noir', 'bleu'],
    usage: 'quotidien',
    genre: 'mixte',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: ['Verres bleus', 'Style tendance', 'Design créatif', 'Mode urbaine'],
    specifications: {
      'Autonomie': '43 heures',
      'Temps de charge': '2 heures',
      'Protection UV': 'UV400',
      'Poids': '33g',
      'Matériau': 'Acétate coloré',
      'Style': 'Urbain créatif'
    },
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    collection: 'lifestyle'
  }
];

export const categories = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'classic', label: 'Classic' },
  { value: 'sport', label: 'Sport' },
  { value: 'pro', label: 'Pro' },
  { value: 'femme', label: 'Femme' },
  { value: 'homme', label: 'Homme' },
  { value: 'lifestyle', label: 'Lifestyle' }
];

export const colors = [
  { value: 'all', label: 'Toutes les couleurs' },
  { value: 'noir', label: 'Noir' },
  { value: 'marron', label: 'Marron' },
  { value: 'bleu', label: 'Bleu' },
  { value: 'rouge', label: 'Rouge' },
  { value: 'blanc', label: 'Blanc' },
  { value: 'rose gold', label: 'Rose Gold' },
  { value: 'violet', label: 'Violet' },
  { value: 'titane', label: 'Titane' }
];

export const usages = [
  { value: 'all', label: 'Tous les usages' },
  { value: 'quotidien', label: 'Quotidien' },
  { value: 'sport', label: 'Sport' },
  { value: 'conduite', label: 'Conduite' },
  { value: 'travail', label: 'Travail' }
];

export const genres = [
  { value: 'all', label: 'Tous les genres' },
  { value: 'mixte', label: 'Mixte' },
  { value: 'homme', label: 'Homme' },
  { value: 'femme', label: 'Femme' }
];

export const sortOptions = [
  { value: 'popularity', label: 'Popularité' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'newest', label: 'Nouveautés' },
  { value: 'rating', label: 'Mieux notés' }
];
