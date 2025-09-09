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
  return {
    // Relations
      : [],
      : [],
  };
}

/**
 * Convertit une variante Supabase en format d'API REST
 */
  return {
  };
}

/**
 * Convertit une spécification Supabase en format d'API REST
 */
  return {
  };
}

/**
 * Convertit un favori Supabase en format d'API REST
 */
  return {
      : undefined
  };
}

/**
 * Convertit un profil Supabase en format d'API REST
 */
  return {
  };
}

/**
 * Convertit une configuration de produit Supabase en format d'API REST
 */
  return {
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
