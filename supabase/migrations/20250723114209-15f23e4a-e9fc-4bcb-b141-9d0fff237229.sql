-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  user_type TEXT DEFAULT 'customer' CHECK (user_type IN ('customer', 'business', 'admin', 'partner')),
  company_name TEXT,
  company_siret TEXT,
  company_sector TEXT,
  pricing_group TEXT DEFAULT 'standard',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create collections table
CREATE TABLE public.collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sub_collections table
CREATE TABLE public.sub_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_collection_slug TEXT NOT NULL REFERENCES public.collections(slug),
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create filter_options table
CREATE TABLE public.filter_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filter_type TEXT NOT NULL,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  hex_color TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(filter_type, value)
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  sku TEXT UNIQUE,
  images TEXT[],
  category TEXT,
  collection_slug TEXT REFERENCES public.collections(slug),
  stock_quantity INTEGER DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create junction tables
CREATE TABLE public.product_collections (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  collection_slug TEXT REFERENCES public.collections(slug) ON DELETE CASCADE,
  PRIMARY KEY (product_id, collection_slug)
);

CREATE TABLE public.product_tags (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

CREATE TABLE public.product_filters (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  filter_option_id UUID REFERENCES public.filter_options(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, filter_option_id)
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sub_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.filter_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_filters ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Collections are viewable by everyone" 
ON public.collections 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Sub-collections are viewable by everyone" 
ON public.sub_collections 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Filter options are viewable by everyone" 
ON public.filter_options 
FOR SELECT 
USING (true);

CREATE POLICY "Tags are viewable by everyone" 
ON public.tags 
FOR SELECT 
USING (true);

CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Product collections are viewable by everyone" 
ON public.product_collections 
FOR SELECT 
USING (true);

CREATE POLICY "Product tags are viewable by everyone" 
ON public.product_tags 
FOR SELECT 
USING (true);

CREATE POLICY "Product filters are viewable by everyone" 
ON public.product_filters 
FOR SELECT 
USING (true);

-- Insert sample data
INSERT INTO public.collections (name, slug, description, sort_order) VALUES
('Sport', 'sport', 'Collection sport et activités', 1),
('Lifestyle', 'lifestyle', 'Collection lifestyle et quotidien', 2),
('Prismatic', 'prismatic', 'Collection prismatique avancée', 3);

INSERT INTO public.sub_collections (name, slug, description, parent_collection_slug, sort_order) VALUES
('Sport Pro', 'sport-pro', 'Lunettes sport haute performance', 'sport', 1),
('Sport Casual', 'sport-casual', 'Lunettes sport décontractées', 'sport', 2),
('Urban Style', 'urban-style', 'Style urbain moderne', 'lifestyle', 1),
('Classic Collection', 'classic-collection', 'Collection classique intemporelle', 'lifestyle', 2);

INSERT INTO public.filter_options (filter_type, name, value, sort_order) VALUES
('color', 'Noir', 'black', 1),
('color', 'Blanc', 'white', 2),
('color', 'Rouge', 'red', 3),
('color', 'Bleu', 'blue', 4),
('size', 'S', 'small', 1),
('size', 'M', 'medium', 2),
('size', 'L', 'large', 3),
('price_range', '0-50€', '0-50', 1),
('price_range', '50-100€', '50-100', 2),
('price_range', '100-200€', '100-200', 3);

INSERT INTO public.tags (name, category, icon, color) VALUES
('Nouveau', 'status', 'star', '#FFD700'),
('Populaire', 'status', 'trending-up', '#FF6B6B'),
('Sport', 'category', 'activity', '#4ECDC4'),
('Élégant', 'style', 'sparkles', '#A8E6CF');

-- Create indexes for better performance
CREATE INDEX idx_collections_active ON public.collections(is_active);
CREATE INDEX idx_sub_collections_parent_slug ON public.sub_collections(parent_collection_slug);
CREATE INDEX idx_sub_collections_active ON public.sub_collections(is_active);
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_products_collection ON public.products(collection_slug);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_filter_options_type ON public.filter_options(filter_type);