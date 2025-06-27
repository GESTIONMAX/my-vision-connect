export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      collections: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      filter_options: {
        Row: {
          created_at: string | null
          filter_type: string
          hex_color: string | null
          id: string
          name: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          filter_type: string
          hex_color?: string | null
          id?: string
          name: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          filter_type?: string
          hex_color?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      product_collections: {
        Row: {
          collection_id: string
          product_id: string
        }
        Insert: {
          collection_id: string
          product_id: string
        }
        Update: {
          collection_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_collections_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_collections_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_filters: {
        Row: {
          filter_option_id: string
          product_id: string
        }
        Insert: {
          filter_option_id: string
          product_id: string
        }
        Update: {
          filter_option_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_filters_filter_option_id_fkey"
            columns: ["filter_option_id"]
            isOneToOne: false
            referencedRelation: "filter_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_filters_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_tags: {
        Row: {
          product_id: string
          tag_id: string
        }
        Insert: {
          product_id: string
          tag_id: string
        }
        Update: {
          product_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_tags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          collection: string | null
          color: string[] | null
          created_at: string | null
          description: string | null
          features: string[] | null
          genre: string | null
          id: string
          images: string[] | null
          in_stock: boolean | null
          is_bundle: boolean | null
          is_featured: boolean | null
          is_new: boolean | null
          is_popular: boolean | null
          name: string
          original_price: number | null
          price: number
          review_count: number | null
          slug: string
          specifications: Json | null
          stock_quantity: number | null
          updated_at: string | null
          usage: string | null
        }
        Insert: {
          category?: string | null
          collection?: string | null
          color?: string[] | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          genre?: string | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          is_bundle?: boolean | null
          is_featured?: boolean | null
          is_new?: boolean | null
          is_popular?: boolean | null
          name: string
          original_price?: number | null
          price: number
          review_count?: number | null
          slug: string
          specifications?: Json | null
          stock_quantity?: number | null
          updated_at?: string | null
          usage?: string | null
        }
        Update: {
          category?: string | null
          collection?: string | null
          color?: string[] | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          genre?: string | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          is_bundle?: boolean | null
          is_featured?: boolean | null
          is_new?: boolean | null
          is_popular?: boolean | null
          name?: string
          original_price?: number | null
          price?: number
          review_count?: number | null
          slug?: string
          specifications?: Json | null
          stock_quantity?: number | null
          updated_at?: string | null
          usage?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          category: string
          color: string | null
          created_at: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
