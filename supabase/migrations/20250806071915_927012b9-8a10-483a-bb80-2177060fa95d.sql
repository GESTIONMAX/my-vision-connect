-- ============================================
-- AMÉLIORATION STRUCTURE POUR PRODUITS CONFIGURABLES
-- ============================================

-- 1. Table pour les variants de produits (couleurs, finitions, etc.)
CREATE TABLE public.product_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL,
  name TEXT NOT NULL, -- "Matte Black Frame | Smoke Lenses"
  sku TEXT, -- SKU spécifique au variant
  frame_color TEXT, -- "Matte Black"
  lens_color TEXT, -- "Smoke"
  hex_color TEXT, -- Code couleur pour l'affichage
  price_modifier NUMERIC DEFAULT 0, -- +/- prix de base
  images TEXT[], -- Images spécifiques au variant
  stock_quantity INTEGER DEFAULT 0,
  is_default BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Table pour les options configurables (audio, accessoires, etc.)
CREATE TABLE public.product_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL,
  option_type TEXT NOT NULL, -- "audio", "case", "accessory"
  name TEXT NOT NULL, -- "With Audio", "Without Audio"
  description TEXT,
  price_modifier NUMERIC DEFAULT 0, -- +/- prix de base
  is_default BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Table pour les combinaisons variant + option (matrix des prix)
CREATE TABLE public.product_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL,
  variant_id UUID,
  option_ids UUID[], -- Array des options sélectionnées
  final_price NUMERIC NOT NULL,
  sku TEXT, -- SKU de la configuration complète
  stock_quantity INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Table pour les spécifications techniques détaillées
CREATE TABLE public.product_specifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL,
  spec_category TEXT NOT NULL, -- "dimensions", "materials", "features"
  spec_name TEXT NOT NULL, -- "Width", "Frame Material", "Audio Range"
  spec_value TEXT NOT NULL,
  spec_unit TEXT, -- "mm", "g", "Hz"
  display_order INTEGER DEFAULT 0,
  is_highlight BOOLEAN DEFAULT false, -- Pour les specs importantes
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Table pour les guides de taille
CREATE TABLE public.size_guides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL,
  size_type TEXT NOT NULL, -- "frame", "face", "general"
  measurement_name TEXT NOT NULL, -- "Width", "Height", "Temple Length"
  min_value NUMERIC,
  max_value NUMERIC,
  recommended_value NUMERIC,
  unit TEXT NOT NULL, -- "mm", "cm"
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Table pour les images contextuelles (lifestyle, détails, etc.)
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL,
  variant_id UUID, -- Peut être NULL pour images génériques
  image_url TEXT NOT NULL,
  image_type TEXT NOT NULL, -- "hero", "lifestyle", "detail", "variant", "gallery"
  alt_text TEXT,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================
-- INDEXES POUR PERFORMANCE
-- ============================================

CREATE INDEX idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_product_variants_default ON public.product_variants(product_id, is_default);

CREATE INDEX idx_product_options_product_id ON public.product_options(product_id);
CREATE INDEX idx_product_options_type ON public.product_options(product_id, option_type);

CREATE INDEX idx_product_configurations_product_id ON public.product_configurations(product_id);
CREATE INDEX idx_product_configurations_variant ON public.product_configurations(variant_id);

CREATE INDEX idx_product_specifications_product_id ON public.product_specifications(product_id);
CREATE INDEX idx_product_specifications_category ON public.product_specifications(product_id, spec_category);

CREATE INDEX idx_size_guides_product_id ON public.size_guides(product_id);

CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_product_images_variant ON public.product_images(variant_id);
CREATE INDEX idx_product_images_type ON public.product_images(product_id, image_type);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Activer RLS sur toutes les nouvelles tables
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.size_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique (produits visibles par tous)
CREATE POLICY "Product variants are viewable by everyone" 
ON public.product_variants FOR SELECT USING (true);

CREATE POLICY "Product options are viewable by everyone" 
ON public.product_options FOR SELECT USING (true);

CREATE POLICY "Product configurations are viewable by everyone" 
ON public.product_configurations FOR SELECT USING (is_available = true);

CREATE POLICY "Product specifications are viewable by everyone" 
ON public.product_specifications FOR SELECT USING (true);

CREATE POLICY "Size guides are viewable by everyone" 
ON public.size_guides FOR SELECT USING (true);

CREATE POLICY "Product images are viewable by everyone" 
ON public.product_images FOR SELECT USING (true);

-- ============================================
-- TRIGGERS POUR TIMESTAMPS
-- ============================================

CREATE TRIGGER update_product_variants_updated_at
BEFORE UPDATE ON public.product_variants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- FONCTIONS UTILITAIRES
-- ============================================

-- Fonction pour calculer le prix final d'une configuration
CREATE OR REPLACE FUNCTION public.calculate_configuration_price(
  p_product_id UUID,
  p_variant_id UUID DEFAULT NULL,
  p_option_ids UUID[] DEFAULT NULL
) RETURNS NUMERIC AS $$
DECLARE
  base_price NUMERIC;
  variant_modifier NUMERIC := 0;
  options_modifier NUMERIC := 0;
BEGIN
  -- Prix de base du produit
  SELECT price INTO base_price 
  FROM public.products 
  WHERE id = p_product_id;
  
  -- Modificateur du variant
  IF p_variant_id IS NOT NULL THEN
    SELECT COALESCE(price_modifier, 0) INTO variant_modifier
    FROM public.product_variants
    WHERE id = p_variant_id;
  END IF;
  
  -- Modificateurs des options
  IF p_option_ids IS NOT NULL AND array_length(p_option_ids, 1) > 0 THEN
    SELECT COALESCE(SUM(price_modifier), 0) INTO options_modifier
    FROM public.product_options
    WHERE id = ANY(p_option_ids);
  END IF;
  
  RETURN base_price + variant_modifier + options_modifier;
END;
$$ LANGUAGE plpgsql;