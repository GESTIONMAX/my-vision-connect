
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const HeroCarousel = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const sliderImages = [
    {
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
      alt: "Innovation technologique",
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      alt: "Technologie avancée",
    },
    {
      src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&h=600&fit=crop",
      alt: "Innovation",
    },
    {
      src: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800&h=600&fit=crop",
      alt: "Vision moderne",
    },
    {
      src: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=800&h=600&fit=crop",
      alt: "Technologie futuriste",
    },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="mb-8"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {sliderImages.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <div className="relative overflow-hidden rounded-xl group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </motion.div>
  );
};
