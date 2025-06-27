
import { motion } from 'framer-motion';

interface ProductImageGalleryProps {
  productName: string;
  images: string[];
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
}

export const ProductImageGallery = ({
  productName,
  images,
  selectedImageIndex,
  onImageSelect
}: ProductImageGalleryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 text-2xl font-medium">
            {productName}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImageIndex === index 
                ? 'border-blue-500' 
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-xs">
                Vue {index + 1}
              </span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
