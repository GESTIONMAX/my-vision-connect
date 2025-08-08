export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          image_url: string;
          is_active: boolean;
          name: string;
          slug: string;
          sort_order: number;
        };
        Insert: {
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string;
          is_active?: boolean;
          name: string;
          slug: string;
          sort_order?: number;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string;
          is_active?: boolean;
          name?: string;
          slug?: string;
          sort_order?: number;
        };
      };
      // Nouvelle table bestsellers
      bestsellers: {
        Row: {
          id: string;
          product_id: string;
          rank: number;
          featured: boolean;
          start_date: string;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          rank: number;
          featured?: boolean;
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          rank?: number;
          featured?: boolean;
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          price: number;
          images: string[];
          stock_quantity: number;
          sku: string;
          collection_slug: string;
          category: string;
          is_featured: boolean;
          is_active: boolean;
          rating: number;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      // Ajoutez d'autres tables au besoin
    };
    Views: {
      // Vue bestsellers
      view_bestsellers: {
        Row: {
          bestseller_id: string;
          rank: number;
          featured: boolean;
          id: string;
          name: string;
          slug: string;
          description: string;
          price: number;
          images: string[];
          stock_quantity: number;
          sku: string;
          collection_slug: string;
          category: string;
          is_featured: boolean;
          is_active: boolean;
          rating: number;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      // Ajoutez d'autres vues au besoin
    };
    Functions: {};
    Enums: {};
  };
}
