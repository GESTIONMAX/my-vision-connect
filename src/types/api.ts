/**
 * Interface standard pour les réponses API
 * @template T Type des données retournées par l'API
 */
export interface ApiResponse<T> {
  /** Données retournées par l'API */
  data: T;
  /** Indique si la requête a réussi */
  success: boolean;
  /** Message optionnel (confirmation, erreur, etc.) */
  message?: string;
  /** Détails des erreurs éventuelles */
  errors?: any;
}

/**
 * Interface pour les paramètres de pagination
 */
export interface PaginationParams {
  /** Page actuelle (commence à 1) */
  page?: number;
  /** Nombre d'éléments par page */
  limit?: number;
}

/**
 * Interface pour les réponses paginées
 * @template T Type des données dans la liste paginée
 */
export interface PaginatedResponse<T> {
  /** Liste des éléments pour la page actuelle */
  items: T[];
  /** Nombre total d'éléments (toutes pages confondues) */
  total: number;
  /** Page actuelle */
  page: number;
  /** Nombre d'éléments par page */
  limit: number;
  /** Nombre total de pages */
  totalPages: number;
  /** Indique s'il existe une page suivante */
  hasNext: boolean;
  /** Indique s'il existe une page précédente */
  hasPrev: boolean;
}
