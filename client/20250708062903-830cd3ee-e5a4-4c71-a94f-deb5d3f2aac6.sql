-- Create sub_collections table
CREATE TABLE public.sub_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_collection_slug TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sub_collections ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Sub-collections are viewable by everyone" 
ON public.sub_collections 
FOR SELECT 
USING (true);

-- Create index for better performance
CREATE INDEX idx_sub_collections_parent_slug ON public.sub_collections(parent_collection_slug);
CREATE INDEX idx_sub_collections_active ON public.sub_collections(is_active);

-- Insert some sample sub-collections
INSERT INTO public.sub_collections (name, slug, description, parent_collection_slug, sort_order) VALUES
('Sport Pro', 'sport-pro', 'Lunettes sport haute performance', 'sport', 1),
('Sport Casual', 'sport-casual', 'Lunettes sport décontractées', 'sport', 2),
('Urban Style', 'urban-style', 'Style urbain moderne', 'lifestyle', 1),
('Classic Collection', 'classic-collection', 'Collection classique intemporelle', 'lifestyle', 2);