/**
 * Utilitaires pour faciliter la migration de Supabase vers l'API REST
 * Ce fichier contient des fonctions qui aideront à convertir les données
 * entre les formats de Supabase et les nouveaux formats d'API REST.
 */

import type { Profile } from '@/types/auth';
import type { Product } from '@/types/product';
import type { Variante } from '@/types/variante';
import type { Specification } from '@/types/specification';
import type { Favorite } from '@/types/favorite';
import type { ProductConfiguration } from '@/types/productConfig';

/**
 * Convertit un produit Supabase en format d'API REST
 */
export function convertSupabaseProductToRest(supabaseProduct: any): Product {
  return {
    id: supabaseProduct.id,
    nom: supabaseProduct.nom || supabaseProduct.name,
    description: supabaseProduct.description,
    prix_base: supabaseProduct.prix_base || supabaseProduct.base_price,
    image_principale: supabaseProduct.image_principale || supabaseProduct.main_image,
    actif: supabaseProduct.actif || supabaseProduct.active || true,
    collectionId: supabaseProduct.collection_id,
    categorie: supabaseProduct.categorie || supabaseProduct.category,
    sportifCibleId: supabaseProduct.sportif_cible_id,
    createdAt: new Date(supabaseProduct.created_at),
    updatedAt: new Date(supabaseProduct.updated_at),
    // Relations
    collection: supabaseProduct.collection,
    variantes: Array.isArray(supabaseProduct.variantes)
      ? supabaseProduct.variantes.map(convertSupabaseVarianteToRest)
      : [],
    specifications: Array.isArray(supabaseProduct.specifications)
      ? supabaseProduct.specifications.map(convertSupabaseSpecificationToRest)
      : [],
    assets: supabaseProduct.assets,
    sportifCible: supabaseProduct.sportif_cible
  };
}

/**
 * Convertit une variante Supabase en format d'API REST
 */
export function convertSupabaseVarianteToRest(supabaseVariante: any): Variante {
  return {
    id: supabaseVariante.id,
    produitId: supabaseVariante.produit_id || supabaseVariante.product_id,
    nom: supabaseVariante.nom || supabaseVariante.name,
    description: supabaseVariante.description || '',
    prix: supabaseVariante.prix || supabaseVariante.price,
    sku: supabaseVariante.sku || '',
    stock: supabaseVariante.stock || 0,
    actif: supabaseVariante.actif || supabaseVariante.active || true,
    createdAt: new Date(supabaseVariante.created_at),
    updatedAt: new Date(supabaseVariante.updated_at),
    produit: supabaseVariante.produit || supabaseVariante.product
  };
}

/**
 * Convertit une spécification Supabase en format d'API REST
 */
export function convertSupabaseSpecificationToRest(supabaseSpec: any): Specification {
  return {
    id: supabaseSpec.id,
    produitId: supabaseSpec.produit_id || supabaseSpec.product_id,
    nom: supabaseSpec.nom || supabaseSpec.name,
    valeur: supabaseSpec.valeur || supabaseSpec.value,
    ordre: supabaseSpec.ordre || supabaseSpec.order,
    groupe: supabaseSpec.groupe || supabaseSpec.group,
    actif: supabaseSpec.actif || supabaseSpec.active || true,
    createdAt: new Date(supabaseSpec.created_at),
    updatedAt: new Date(supabaseSpec.updated_at),
    produit: supabaseSpec.produit || supabaseSpec.product
  };
}

/**
 * Convertit un favori Supabase en format d'API REST
 */
export function convertSupabaseFavoriteToRest(supabaseFav: any): Favorite {
  return {
    id: supabaseFav.id,
    userId: supabaseFav.user_id,
    produitId: supabaseFav.produit_id || supabaseFav.product_id,
    createdAt: new Date(supabaseFav.created_at),
    produit: supabaseFav.produit || supabaseFav.product
      ? convertSupabaseProductToRest(supabaseFav.produit || supabaseFav.product)
      : undefined
  };
}

/**
 * Convertit un profil Supabase en format d'API REST
 */
export function convertSupabaseProfileToRest(supabaseProfile: any): Profile {
  return {
    id: supabaseProfile.id,
    email: supabaseProfile.email,
    first_name: supabaseProfile.first_name,
    last_name: supabaseProfile.last_name,
    phone: supabaseProfile.phone,
    company_name: supabaseProfile.company_name,
    company_siret: supabaseProfile.company_siret,
    company_sector: supabaseProfile.company_sector,
    user_type: supabaseProfile.user_type,
    pricing_group: supabaseProfile.pricing_group,
    avatar_url: supabaseProfile.avatar_url,
    created_at: supabaseProfile.created_at,
    updated_at: supabaseProfile.updated_at
  };
}

/**
 * Convertit une configuration de produit Supabase en format d'API REST
 */
export function convertSupabaseProductConfigToRest(supabaseConfig: any): ProductConfiguration {
  return {
    id: supabaseConfig.id,
    produitId: supabaseConfig.produit_id || supabaseConfig.product_id,
    userId: supabaseConfig.user_id,
    selectedVariants: supabaseConfig.selected_variants || {},
    options: supabaseConfig.options || {},
    calculatedPrice: supabaseConfig.calculated_price || supabaseConfig.price || 0,
    createdAt: new Date(supabaseConfig.created_at),
    updatedAt: new Date(supabaseConfig.updated_at),
    produit: supabaseConfig.produit || supabaseConfig.product
      ? convertSupabaseProductToRest(supabaseConfig.produit || supabaseConfig.product)
      : undefined
  };
}

/**
 * Fonction utilitaire pour déterminer s'il faut utiliser la nouvelle API REST ou Supabase
 * Cette fonction vérifie la variable d'environnement VITE_USE_NEW_API
 * @returns Booléen indiquant s'il faut utiliser la nouvelle API REST (true) ou Supabase (false)
 */
export function shouldUseNewApi(): boolean {
  // Dans Vite, les variables d'environnement sont accessibles via import.meta.env
  return import.meta.env.VITE_USE_NEW_API === 'true';
}
