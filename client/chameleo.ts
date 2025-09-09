export interface ChameleoProduct {
  id: string;
  name: string;
  handle: string;
  description: string;
  body_html?: string;
  price_min: number;
  price_max?: number;
  compare_at_price?: number;
  main_image?: string;
  available: boolean;
  variants: ChameleoVariant[];
  images: ChameleoImage[];
  tags: string[];
  collections?: string[];
  title?: string;
  vendor?: string;
  product_type?: string;
  status?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  scraped_at?: string;
}

export interface ChameleoVariant {
  id: string;
  price: string;
  available: boolean;
  name?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  sku?: string;
  compare_at_price?: number;
  featured_image?: string;
}

export interface ChameleoImage {
  id: string;
  url: string;
  src?: string;
  alt?: string;
  position?: number;
}

export interface ChameleoCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: string | { src?: string };
  products_count?: number;
  published_at?: string;
  updated_at?: string;
}

export interface ChameleoFilters {
  collection_id?: string;
  collection?: string;
  tags?: string[];
  search?: string;
  sort_by?: string;
  price_range?: [number, number];
  page?: number;
  limit?: number;
  category?: string;
  available?: boolean | string;
}
