import { motion } from 'framer-motion';

interface EnhancedProductImageGalleryProps {
  productName: string;
  images: string[];
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
}

export const EnhancedProductImageGallery = ({
  productName,
  images,
  selectedImageIndex,
  onImageSelect
}: EnhancedProductImageGalleryProps) => {
  const displayImages = images.length > 0 ? images : ['/placeholder.svg'];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      {/* Main Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden border border-border">
        {displayImages[selectedImageIndex] !== '/placeholder.svg' ? (
          <img
            src={displayImages[selectedImageIndex]}
            alt={productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground text-2xl font-medium">
              {productName}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3">
        {displayImages.slice(0, 4).map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedImageIndex === index 
                ? 'border-primary shadow-md scale-105' 
                : 'border-border hover:border-primary/50 hover:scale-102'
            }`}
          >
            {image !== '/placeholder.svg' ? (
              <img
                src={image}
                alt={`${productName} vue ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-xs">
                  Vue {index + 1}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
};