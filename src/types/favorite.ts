/**
 * Interface pour un favori (produit préféré d'un utilisateur)
 */
export interface Favorite {
  /** Identifiant unique du favori */
  id: string;
  /** Identifiant de l'utilisateur */
  userId: string;
  /** Identifiant du produit */
  produitId: string;
  /** Date de création */
  createdAt: Date;
  /** Produit associé au favori (optionnel) */
  produit?: any;
}

/**
 * Interface pour la création d'un favori
 */
export interface CreateFavoriteDto {
  produitId: string;
}

/**
 * Interface pour les paramètres de pagination des favoris
 */
export interface FavoriteFilters {
  /** Page courante pour la pagination */
  page?: number;
  /** Nombre d'éléments par page */
  limit?: number;
  /** Inclure les détails complets des produits */
  includeProducts?: boolean;
}
