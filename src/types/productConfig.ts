/**
 * Interface pour une configuration de produit
 */
export interface ProductConfiguration {
  /** Identifiant unique de la configuration */
  id: string;
  /** Identifiant du produit associé */
  produitId: string;
  /** Identifiant de l'utilisateur */
  userId: string;
  /** Sélections de variantes */
  selectedVariants: Record<string, string>;
  /** Options supplémentaires */
  options?: Record<string, any>;
  /** Prix calculé */
  calculatedPrice: number;
  /** Date de création */
  createdAt: Date;
  /** Date de dernière modification */
  updatedAt: Date;
  /** Produit associé (optionnel) */
  produit?: any;
}

/**
 * Interface pour la création d'une configuration de produit
 */
export interface CreateProductConfigurationDto {
  produitId: string;
  selectedVariants: Record<string, string>;
  options?: Record<string, any>;
}

/**
 * Interface pour la mise à jour d'une configuration de produit
 */
export interface UpdateProductConfigurationDto extends Partial<CreateProductConfigurationDto> {
  // Tous les champs sont optionnels pour une mise à jour
}

/**
 * Interface pour le calcul de prix
 */
export interface PriceCalculationRequest {
  produitId: string;
  selectedVariants: Record<string, string>;
  options?: Record<string, any>;
}

/**
 * Interface pour le résultat du calcul de prix
 */
export interface PriceCalculationResult {
  basePrice: number;
  variantPrices: Record<string, number>;
  optionPrices: Record<string, number>;
  totalPrice: number;
  discount?: {
    type: string;
    value: number;
    amount: number;
  };
}
