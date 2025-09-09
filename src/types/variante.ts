/**
 * Interface pour une variante de produit
 */
export interface Variante {
  /** Identifiant unique de la variante */
  id: string;
  /** Identifiant du produit associé */
  produitId: string;
  /** Nom de la variante */
  nom: string;
  /** Description de la variante */
  description?: string;
  /** Prix spécifique de la variante (si différent du prix de base du produit) */
  prix?: number;
  /** Code SKU (Stock Keeping Unit) */
  sku: string;
  /** Niveau de stock disponible */
  stock: number;
  /** Indique si la variante est active/visible */
  actif: boolean;
  /** Date de création */
  createdAt: Date;
  /** Date de dernière modification */
  updatedAt: Date;
  /** Relations (optionnelles) */
  produit?: any;
}

/**
 * Interface pour la création d'une variante
 */
export interface CreateVarianteDto {
  produitId: string;
  nom: string;
  description?: string;
  prix?: number;
  sku: string;
  stock: number;
  actif?: boolean;
}

/**
 * Interface pour la mise à jour d'une variante
 */
export interface UpdateVarianteDto extends Partial<CreateVarianteDto> {
  // Tous les champs sont optionnels pour une mise à jour
}

/**
 * Interface pour la création multiple de variantes
 */
export interface CreateManyVariantesDto {
  produitId: string;
  variantes: Omit<CreateVarianteDto, 'produitId'>[];
}
