-- Correction des alertes de sécurité

-- 1. Activer RLS sur toutes les tables publiques qui n'en ont pas
ALTER TABLE filter_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_filters ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE size_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- 2. Corriger la fonction handle_new_user avec search_path sécurisé
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
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
$$;

-- 3. Corriger la fonction update_updated_at_column avec search_path sécurisé
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 4. Corriger la fonction calculate_configuration_price avec search_path sécurisé
CREATE OR REPLACE FUNCTION public.calculate_configuration_price(p_product_id uuid, p_variant_id uuid DEFAULT NULL::uuid, p_option_ids uuid[] DEFAULT NULL::uuid[])
RETURNS numeric
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  base_price NUMERIC;
  variant_modifier NUMERIC := 0;
  options_modifier NUMERIC := 0;
BEGIN
  -- Prix de base du produit
  SELECT price_base INTO base_price 
  FROM public.products 
  WHERE id = p_product_id;
  
  -- Modificateur du variant
  IF p_variant_id IS NOT NULL THEN
    SELECT COALESCE(price, 0) INTO variant_modifier
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
$$;