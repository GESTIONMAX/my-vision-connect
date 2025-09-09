/**
 * Interface pour les filtres de recherche de produits
 */
export interface ProductFilters {
  /** Terme de recherche (nom, description, etc.) */
  search?: string;
  /** Identifiant de la collection */
  collectionId?: string;
  /** Catégorie du produit */
  categorie?: string;
  /** Prix minimum */
  minPrice?: number;
  /** Prix maximum */
  maxPrice?: number;
  /** Public cible */
  sportifCibleId?: string;
  /** Page courante pour la pagination */
  page?: number;
  /** Nombre d'éléments par page */
  limit?: number;
}

/**
 * Interface pour un produit
 */
export interface Product {
  /** Identifiant unique du produit */
  id: string;
  /** Nom du produit */
  nom: string;
  /** Description du produit */
  description: string;
  /** Lien vers l'image principale du produit */
  image_principale?: string;
  /** Prix de base du produit */
  prix_base: number;
  /** Indique si le produit est actif/visible */
  actif: boolean;
  /** Identifiant de la collection à laquelle appartient le produit */
  collectionId?: string;
  /** Date de création */
  createdAt: Date;
  /** Date de dernière modification */
  updatedAt: Date;
  /** Catégorie du produit */
  categorie?: string;
  /** Sportif cible */
  sportifCibleId?: string;
  /** Relations (optionnelles, à charger séparément si nécessaire) */
  collection?: any;
  variantes?: any[];
  specifications?: any[];
  assets?: any[];
  sportifCible?: any;
}

/**
 * Interface pour la création d'un produit
 */
export interface CreateProductDto {
  nom: string;
  description: string;
  prix_base: number;
  collectionId?: string;
  categorie?: string;
  sportifCibleId?: string;
  actif?: boolean;
  image_principale?: string;
}

/**
 * Interface pour la mise à jour d'un produit
 */
export interface UpdateProductDto extends Partial<CreateProductDto> {
  // Tous les champs sont optionnels pour une mise à jour
}
