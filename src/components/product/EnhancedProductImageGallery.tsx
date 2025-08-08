import { motion } from 'framer-motion';
import { useProductImages } from '@/hooks/useWordPressImages';
import { Skeleton } from '@/components/ui/skeleton';

interface EnhancedProductImageGalleryProps {
  productName: string;
  productSlug: string;
  variantSlug?: string;
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
}

export const EnhancedProductImageGallery = ({
  productName,
  productSlug,
  variantSlug,
  selectedImageIndex,
  onImageSelect
}: EnhancedProductImageGalleryProps) => {
  // Récupérer les images depuis WordPress
  const { data: wordpressImages, isLoading } = useProductImages(productSlug, variantSlug);
  
  // Utiliser les images WordPress si disponibles
  const images = wordpressImages?.map(img => img.url) || [];
  const currentImage = images[selectedImageIndex];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      {/* Main Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden border border-border">
        {currentImage ? (
          <img
            src={currentImage}
            alt={wordpressImages?.[selectedImageIndex]?.alt || productName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.nextElementSibling) {
                e.currentTarget.nextElementSibling.classList.remove('hidden');
              }
            }}
          />
        ) : null}
        <div className={`w-full h-full flex items-center justify-center ${currentImage ? 'hidden' : ''}`}>
          <span className="text-muted-foreground text-2xl font-medium">
            {productName}
          </span>
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((imageUrl, index) => {
          const imageData = wordpressImages?.[index];
          return (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImageIndex === index 
                  ? 'border-primary shadow-md scale-105' 
                  : 'border-border hover:border-primary/50 hover:scale-102'
              }`}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={imageData?.alt || `${productName} vue ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.classList.remove('hidden');
                    }
                  }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center ${imageUrl ? 'hidden' : ''}`}>
                <span className="text-muted-foreground text-xs">
                  {imageData?.view || `Vue ${index + 1}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};