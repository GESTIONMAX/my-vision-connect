/**
 * Type représentant un produit
 */
export interface Produit {
  id: number;
  nom: string;
  description: string;
  prix: number;
  prixOriginal?: number; // Prix avant réduction
  disponible: boolean;
  dateCreation: string;
  dateModification: string;
  collectionId?: number;
  image?: string;
  images?: string[]; // Liste d'images du produit
  reference?: string;
  sportifCibleId?: number;
  categorie?: string; // Catégorie du produit
  rating?: number; // Note du produit (sur 5)
  nombreAvis?: number; // Nombre d'avis sur le produit
  est_nouveau?: boolean; // Indique si le produit est nouveau
  est_populaire?: boolean; // Indique si le produit est populaire
  est_en_avant?: boolean; // Indique si le produit est mis en avant
  slug?: string; // Slug pour l'URL du produit
  
  // Relations (optionnelles car peuvent être chargées à la demande)
  collection?: {
    id: number;
    nom: string;
    description?: string;
  };
  variantes?: {
    id: number;
    nom: string;
    prix?: number;
    description?: string;
    couleur?: string;
    disponible: boolean;
    produitId: number;
  }[];
  specifications?: {
    id: number;
    nom: string;
    valeur: string;
    produitId: number;
  }[];
  sportifCible?: {
    id: number;
    nom: string;
    description?: string;
  };
  assets?: {
    id: number;
    url: string;
    type: string;
    produitId: number;
  }[];
}
