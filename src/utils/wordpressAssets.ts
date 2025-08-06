/**
 * Utilitaires pour la gestion des assets WordPress
 */

// Configuration WordPress Media Library
export const WORDPRESS_CONFIG = {
  baseUrl: process.env.WORDPRESS_URL || 'https://votre-wordpress.com',
  mediaPath: '/wp-content/uploads',
  apiEndpoint: '/wp-json/wp/v2/media'
};

// Structure standardisée des dossiers d'assets
export const ASSET_STRUCTURE = {
  products: 'products',
  base: 'base',
  variants: 'variants', 
  options: 'options',
  technical: 'technical',
  lifestyle: 'lifestyle'
};

// Types d'images standardisés
export const IMAGE_TYPES = {
  hero: 'hero',
  main: 'main', 
  detail: 'detail',
  lifestyle: 'lifestyle',
  technical: 'technical',
  variant: 'variant',
  option: 'option'
} as const;

// Vues d'images standardisées
export const IMAGE_VIEWS = {
  front: 'front',
  side: 'side', 
  back: 'back',
  angle: 'angle',
  detail: 'detail',
  lifestyle: 'lifestyle'
} as const;

/**
 * Génère l'URL complète WordPress pour un asset
 */
export const getWordPressAssetUrl = (relativePath: string): string => {
  return `${WORDPRESS_CONFIG.baseUrl}${WORDPRESS_CONFIG.mediaPath}/${relativePath}`;
};

/**
 * Génère le chemin relatif structuré pour un asset produit
 */
export const generateAssetPath = (
  productSlug: string,
  type: keyof typeof IMAGE_TYPES,
  variantSlug?: string,
  optionSlug?: string,
  view?: keyof typeof IMAGE_VIEWS,
  extension: string = 'jpg'
): string => {
  const parts = [ASSET_STRUCTURE.products, productSlug];
  
  if (type === 'variant' && variantSlug) {
    parts.push(ASSET_STRUCTURE.variants, variantSlug);
  } else if (type === 'option' && optionSlug) {
    parts.push(ASSET_STRUCTURE.options, optionSlug);
  } else {
    parts.push(ASSET_STRUCTURE.base);
  }
  
  const filename = view ? `${type}-${view}.${extension}` : `${type}.${extension}`;
  parts.push(filename);
  
  return parts.join('/');
};

/**
 * Génère l'URL complète d'un asset produit
 */
export const getProductAssetUrl = (
  productSlug: string,
  type: keyof typeof IMAGE_TYPES,
  variantSlug?: string,
  optionSlug?: string,
  view?: keyof typeof IMAGE_VIEWS,
  extension: string = 'jpg'
): string => {
  const relativePath = generateAssetPath(productSlug, type, variantSlug, optionSlug, view, extension);
  return getWordPressAssetUrl(relativePath);
};

/**
 * Parse une URL WordPress pour extraire les métadonnées
 */
export const parseWordPressAssetUrl = (url: string) => {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.replace(WORDPRESS_CONFIG.mediaPath + '/', '').split('/');
  
  if (pathParts[0] !== ASSET_STRUCTURE.products) {
    return null;
  }
  
  const [, productSlug, category, ...rest] = pathParts;
  const filename = rest[rest.length - 1];
  const [type, view] = filename.split('.')[0].split('-');
  
  return {
    productSlug,
    category,
    type,
    view,
    filename,
    fullPath: pathParts.join('/')
  };
};

/**
 * Valide qu'une URL d'asset respecte la structure attendue
 */
export const isValidAssetStructure = (url: string): boolean => {
  try {
    const parsed = parseWordPressAssetUrl(url);
    return parsed !== null && 
           Object.values(IMAGE_TYPES).includes(parsed.type as any) &&
           (parsed.view === undefined || Object.values(IMAGE_VIEWS).includes(parsed.view as any));
  } catch {
    return false;
  }
};

/**
 * Génère les URLs pour toutes les vues d'un variant
 */
export const generateVariantImageUrls = (
  productSlug: string,
  variantSlug: string,
  views: (keyof typeof IMAGE_VIEWS)[] = ['front', 'side', 'angle']
): string[] => {
  return views.map(view => 
    getProductAssetUrl(productSlug, 'variant', variantSlug, undefined, view)
  );
};

/**
 * Configuration pour la migration Google Drive -> WordPress
 */
export const MIGRATION_CONFIG = {
  // Structure attendue dans Google Drive
  googleDriveStructure: {
    root: 'Chamelo-Assets',
    products: ['music-shield', 'sport-pro', 'urban-classic'],
    categories: ['base', 'variants', 'options', 'technical', 'lifestyle']
  },
  
  // Mapping des noms de fichiers
  fileMapping: {
    'main.jpg': 'hero-front.jpg',
    'detail.jpg': 'detail-front.jpg',
    'lifestyle.jpg': 'lifestyle-front.jpg'
  },
  
  // Extensions supportées
  supportedExtensions: ['jpg', 'jpeg', 'png', 'webp'],
  
  // Taille maximale de fichier (en MB)
  maxFileSize: 10
};