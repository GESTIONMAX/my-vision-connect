export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      filter_options: {
        Row: {
          created_at: string
          filter_type: string
          hex_color: string | null
          id: string
          name: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string
          filter_type: string
          hex_color?: string | null
          id?: string
          name: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string
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
          collection_slug: string
          product_id: string
        }
        Insert: {
          collection_slug: string
          product_id: string
        }
        Update: {
          collection_slug?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_collections_collection_slug_fkey"
            columns: ["collection_slug"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["slug"]
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
      product_configurations: {
        Row: {
          created_at: string
          final_price: number
          id: string
          is_available: boolean | null
          option_ids: string[] | null
          product_id: string
          sku: string | null
          stock_quantity: number | null
          variant_id: string | null
        }
        Insert: {
          created_at?: string
          final_price: number
          id?: string
          is_available?: boolean | null
          option_ids?: string[] | null
          product_id: string
          sku?: string | null
          stock_quantity?: number | null
          variant_id?: string | null
        }
        Update: {
          created_at?: string
          final_price?: number
          id?: string
          is_available?: boolean | null
          option_ids?: string[] | null
          product_id?: string
          sku?: string | null
          stock_quantity?: number | null
          variant_id?: string | null
        }
        Relationships: []
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
      product_images: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          id: string
          image_type: string
          image_url: string
          is_primary: boolean | null
          product_id: string
          sort_order: number | null
          variant_id: string | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          image_type: string
          image_url: string
          is_primary?: boolean | null
          product_id: string
          sort_order?: number | null
          variant_id?: string | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          image_type?: string
          image_url?: string
          is_primary?: boolean | null
          product_id?: string
          sort_order?: number | null
          variant_id?: string | null
        }
        Relationships: []
      }
      product_options: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_available: boolean | null
          is_default: boolean | null
          name: string
          option_type: string
          price_modifier: number | null
          product_id: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_available?: boolean | null
          is_default?: boolean | null
          name: string
          option_type: string
          price_modifier?: number | null
          product_id: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_available?: boolean | null
          is_default?: boolean | null
          name?: string
          option_type?: string
          price_modifier?: number | null
          product_id?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      product_specifications: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_highlight: boolean | null
          product_id: string
          spec_category: string
          spec_name: string
          spec_unit: string | null
          spec_value: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_highlight?: boolean | null
          product_id: string
          spec_category: string
          spec_name: string
          spec_unit?: string | null
          spec_value: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_highlight?: boolean | null
          product_id?: string
          spec_category?: string
          spec_name?: string
          spec_unit?: string | null
          spec_value?: string
        }
        Relationships: []
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
      product_variants: {
        Row: {
          created_at: string
          frame_color: string | null
          hex_color: string | null
          id: string
          images: string[] | null
          is_default: boolean | null
          lens_color: string | null
          name: string
          price_modifier: number | null
          product_id: string
          sku: string | null
          sort_order: number | null
          stock_quantity: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          frame_color?: string | null
          hex_color?: string | null
          id?: string
          images?: string[] | null
          is_default?: boolean | null
          lens_color?: string | null
          name: string
          price_modifier?: number | null
          product_id: string
          sku?: string | null
          sort_order?: number | null
          stock_quantity?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          frame_color?: string | null
          hex_color?: string | null
          id?: string
          images?: string[] | null
          is_default?: boolean | null
          lens_color?: string | null
          name?: string
          price_modifier?: number | null
          product_id?: string
          sku?: string | null
          sort_order?: number | null
          stock_quantity?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          collection_slug: string | null
          created_at: string
          description: string | null
          description_length: number | null
          ecommerce_readiness: string | null
          id: string
          images: string[] | null
          images_count: number | null
          is_active: boolean | null
          is_featured: boolean | null
          lens_technology: string | null
          name: string
          price: number | null
          quality_score: number | null
          rating: number | null
          review_count: number | null
          sku: string | null
          source: string | null
          stock_quantity: number | null
          updated_at: string
          url: string | null
        }
        Insert: {
          category?: string | null
          collection_slug?: string | null
          created_at?: string
          description?: string | null
          description_length?: number | null
          ecommerce_readiness?: string | null
          id?: string
          images?: string[] | null
          images_count?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          lens_technology?: string | null
          name: string
          price?: number | null
          quality_score?: number | null
          rating?: number | null
          review_count?: number | null
          sku?: string | null
          source?: string | null
          stock_quantity?: number | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          category?: string | null
          collection_slug?: string | null
          created_at?: string
          description?: string | null
          description_length?: number | null
          ecommerce_readiness?: string | null
          id?: string
          images?: string[] | null
          images_count?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          lens_technology?: string | null
          name?: string
          price?: number | null
          quality_score?: number | null
          rating?: number | null
          review_count?: number | null
          sku?: string | null
          source?: string | null
          stock_quantity?: number | null
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_collection_slug_fkey"
            columns: ["collection_slug"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["slug"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          company_sector: string | null
          company_siret: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          pricing_group: string | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          company_sector?: string | null
          company_siret?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          pricing_group?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          company_sector?: string | null
          company_siret?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          pricing_group?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      size_guides: {
        Row: {
          created_at: string
          description: string | null
          id: string
          max_value: number | null
          measurement_name: string
          min_value: number | null
          product_id: string
          recommended_value: number | null
          size_type: string
          sort_order: number | null
          unit: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          max_value?: number | null
          measurement_name: string
          min_value?: number | null
          product_id: string
          recommended_value?: number | null
          size_type: string
          sort_order?: number | null
          unit: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          max_value?: number | null
          measurement_name?: string
          min_value?: number | null
          product_id?: string
          recommended_value?: number | null
          size_type?: string
          sort_order?: number | null
          unit?: string
        }
        Relationships: []
      }
      sub_collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          parent_collection_slug: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          parent_collection_slug: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          parent_collection_slug?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_collections_parent_collection_slug_fkey"
            columns: ["parent_collection_slug"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["slug"]
          },
        ]
      }
      tags: {
        Row: {
          category: string | null
          color: string | null
          created_at: string
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_configuration_price: {
        Args: {
          p_product_id: string
          p_variant_id?: string
          p_option_ids?: string[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
