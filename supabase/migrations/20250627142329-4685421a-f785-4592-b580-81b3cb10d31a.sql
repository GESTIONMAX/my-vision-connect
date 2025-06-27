
-- Create collections table
CREATE TABLE IF NOT EXISTS public.collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create filter_options table (for frame colors, lens colors, etc.)
CREATE TABLE IF NOT EXISTS public.filter_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filter_type TEXT NOT NULL, -- 'frame_color', 'lens_color', 'face_size', etc.
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  hex_color TEXT, -- for color filters
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(filter_type, value)
);

-- Create tags table (for features like "IA intégrée", "Teinte électronique")
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- 'feature', 'tech', 'style', etc.
  icon TEXT, -- lucide icon name
  color TEXT DEFAULT 'blue', -- badge color
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add missing columns to existing products table if they don't exist
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Junction table for products and collections (many-to-many)
CREATE TABLE IF NOT EXISTS public.product_collections (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, collection_id)
);

-- Junction table for products and tags (many-to-many)
CREATE TABLE IF NOT EXISTS public.product_tags (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

-- Junction table for products and filter options (many-to-many)
CREATE TABLE IF NOT EXISTS public.product_filters (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  filter_option_id UUID REFERENCES public.filter_options(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, filter_option_id)
);

-- Add updated_at trigger for products if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON public.products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample collections
INSERT INTO public.collections (name, slug, description) VALUES
('Lifestyle', 'lifestyle', 'Lunettes pour le quotidien et les loisirs'),
('Sport', 'sport', 'Lunettes techniques pour les activités sportives'),
('Prismatic', 'prismatic', 'Collection premium avec technologies avancées'),
('Professional', 'professional', 'Lunettes pour les professionnels'),
('Bundles', 'bundles', 'Packs et offres groupées')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample filter options
INSERT INTO public.filter_options (filter_type, name, value, hex_color) VALUES
-- Frame colors
('frame_color', 'Noir', 'black', '#000000'),
('frame_color', 'Blanc', 'white', '#FFFFFF'),
('frame_color', 'Marron', 'brown', '#8B4513'),
('frame_color', 'Transparent', 'clear', '#F0F0F0'),
('frame_color', 'Or', 'gold', '#FFD700'),
-- Lens colors
('lens_color', 'Bleu', 'blue', '#0066CC'),
('lens_color', 'Fumé', 'smoke', '#666666'),
('lens_color', 'Violet', 'purple', '#8A2BE2'),
('lens_color', 'Feu', 'fire', '#FF4500'),
('lens_color', 'Calme', 'calm', '#87CEEB'),
-- Face sizes
('face_size', 'Étroit', 'narrow', null),
('face_size', 'Moyen', 'average', null),
('face_size', 'Large', 'wide', null),
('face_size', 'Moyen-Large', 'medium-wide', null)
ON CONFLICT (filter_type, value) DO NOTHING;

-- Insert sample tags
INSERT INTO public.tags (name, category, icon, color) VALUES
('Teinte électronique', 'tech', 'zap', 'blue'),
('IA intégrée', 'tech', 'cpu', 'purple'),
('Étanche IP67', 'feature', 'droplets', 'blue'),
('Audio intégré', 'tech', 'headphones', 'green'),
('GPS Navigation', 'tech', 'navigation', 'blue'),
('Verres polarisés', 'feature', 'sun', 'yellow'),
('Design féminin', 'style', 'heart', 'pink'),
('Style executive', 'style', 'briefcase', 'gray'),
('Ultra léger', 'feature', 'feather', 'green'),
('Cristaux Swarovski', 'luxury', 'gem', 'purple')
ON CONFLICT (name) DO NOTHING;

-- Enable RLS (Row Level Security) - Public read access for now
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.filter_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_filters ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (using DO blocks to handle if they already exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view collections' AND tablename = 'collections') THEN
    CREATE POLICY "Public can view collections" ON public.collections FOR SELECT USING (is_active = true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view filter options' AND tablename = 'filter_options') THEN
    CREATE POLICY "Public can view filter options" ON public.filter_options FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view tags' AND tablename = 'tags') THEN
    CREATE POLICY "Public can view tags" ON public.tags FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view product collections' AND tablename = 'product_collections') THEN
    CREATE POLICY "Public can view product collections" ON public.product_collections FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view product tags' AND tablename = 'product_tags') THEN
    CREATE POLICY "Public can view product tags" ON public.product_tags FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view product filters' AND tablename = 'product_filters') THEN
    CREATE POLICY "Public can view product filters" ON public.product_filters FOR SELECT USING (true);
  END IF;
END
$$;
