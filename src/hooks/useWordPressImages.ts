import { useQuery } from '@tanstack/react-query';
import { getProductAssetUrl, generateVariantImageUrls, IMAGE_TYPES, IMAGE_VIEWS } from '@/utils/wordpressAssets';

/**
 * Hook pour récupérer les images d'un produit depuis WordPress
 */
export const useProductImages = (productSlug: string, variantSlug?: string) => {
  return useQuery({
    queryKey: ['product-images', productSlug, variantSlug],
    queryFn: async () => {
      const images: Array<{
        url: string;
        type: keyof typeof IMAGE_TYPES;
        view?: keyof typeof IMAGE_VIEWS;
        alt: string;
        isPrimary: boolean;
      }> = [];

      if (variantSlug) {
        // Images spécifiques au variant
        const variantUrls = generateVariantImageUrls(productSlug, variantSlug);
        variantUrls.forEach((url, index) => {
          images.push({
            url,
            type: 'variant',
            view: ['front', 'side', 'angle'][index] as keyof typeof IMAGE_VIEWS,
            alt: `${productSlug} ${variantSlug} vue ${['face', 'profil', 'angle'][index]}`,
            isPrimary: index === 0
          });
        });
      } else {
        // Images de base du produit
        const baseViews: (keyof typeof IMAGE_VIEWS)[] = ['front', 'side', 'angle'];
        baseViews.forEach((view, index) => {
          images.push({
            url: getProductAssetUrl(productSlug, 'hero', undefined, undefined, view),
            type: 'hero',
            view,
            alt: `${productSlug} vue ${view}`,
            isPrimary: index === 0
          });
        });
        
        // Image lifestyle
        images.push({
          url: getProductAssetUrl(productSlug, 'lifestyle'),
          type: 'lifestyle',
          alt: `${productSlug} lifestyle`,
          isPrimary: false
        });
      }

      // Vérifier que les images existent (test de charge)
      const validImages = await Promise.allSettled(
        images.map(async (img) => {
          try {
            const response = await fetch(img.url, { method: 'HEAD' });
            return response.ok ? img : null;
          } catch {
            return null;
          }
        })
      );

      return validImages
        .map(result => result.status === 'fulfilled' ? result.value : null)
        .filter(Boolean);
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (nouvelle API react-query)
    enabled: !!productSlug
  });
};

/**
 * Hook pour récupérer une image spécifique
 */
export const useProductImage = (
  productSlug: string,
  type: keyof typeof IMAGE_TYPES,
  variantSlug?: string,
  view?: keyof typeof IMAGE_VIEWS
) => {
  return useQuery({
    queryKey: ['product-image', productSlug, type, variantSlug, view],
    queryFn: async () => {
      const url = getProductAssetUrl(productSlug, type, variantSlug, undefined, view);
      
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          return {
            url,
            type,
            view,
            alt: `${productSlug} ${type} ${view || ''}`.trim(),
            exists: true
          };
        }
        return null;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 15,
    enabled: !!productSlug && !!type
  });
};

/**
 * Hook pour récupérer les images de tous les variants d'un produit
 */
export const useVariantImages = (productSlug: string, variantSlugs: string[]) => {
  return useQuery({
    queryKey: ['variant-images', productSlug, variantSlugs],
    queryFn: async () => {
      const variantImages = await Promise.all(
        variantSlugs.map(async (variantSlug) => {
          const urls = generateVariantImageUrls(productSlug, variantSlug);
          const validUrls = await Promise.allSettled(
            urls.map(async (url) => {
              try {
                const response = await fetch(url, { method: 'HEAD' });
                return response.ok ? url : null;
              } catch {
                return null;
              }
            })
          );
          
          return {
            variantSlug,
            images: validUrls
              .map(result => result.status === 'fulfilled' ? result.value : null)
              .filter(Boolean)
          };
        })
      );
      
      return variantImages.filter(variant => variant.images.length > 0);
    },
    staleTime: 1000 * 60 * 15,
    enabled: !!productSlug && variantSlugs.length > 0
  });
};