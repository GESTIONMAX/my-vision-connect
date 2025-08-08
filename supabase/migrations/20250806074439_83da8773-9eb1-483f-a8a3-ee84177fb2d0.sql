-- Create storage bucket for product images backup/cache
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);

-- Create storage policies for product images
CREATE POLICY "Product images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Service role can upload product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'service_role');

CREATE POLICY "Service role can update product images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'product-images' AND auth.role() = 'service_role');