/**
 * Interface pour une spécification de produit
 */
export interface Specification {
  /** Identifiant unique de la spécification */
  id: string;
  /** Identifiant du produit associé */
  produitId: string;
  /** Nom de la spécification (ex: "Matériau", "Dimensions", etc.) */
  nom: string;
  /** Valeur de la spécification (ex: "Cuir", "10x20x5 cm", etc.) */
  valeur: string;
  /** Ordre d'affichage */
  ordre?: number;
  /** Groupe de la spécification (pour regrouper des spécifications similaires) */
  groupe?: string;
  /** Indique si la spécification est active/visible */
  actif: boolean;
  /** Date de création */
  createdAt: Date;
  /** Date de dernière modification */
  updatedAt: Date;
  /** Relations (optionnelles) */
  produit?: any;
}

/**
 * Interface pour la création d'une spécification
 */
export interface CreateSpecificationDto {
  produitId: string;
  nom: string;
  valeur: string;
  ordre?: number;
  groupe?: string;
  actif?: boolean;
}

/**
 * Interface pour la mise à jour d'une spécification
 */
export interface UpdateSpecificationDto extends Partial<CreateSpecificationDto> {
  // Tous les champs sont optionnels pour une mise à jour
}

/**
 * Interface pour la création multiple de spécifications
 */
export interface CreateManySpecificationsDto {
  produitId: string;
  specifications: Omit<CreateSpecificationDto, 'produitId'>[];
}
