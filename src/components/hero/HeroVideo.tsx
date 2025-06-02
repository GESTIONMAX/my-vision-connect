
import { motion } from 'framer-motion';

export const HeroVideo = () => {
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

  return (
    <motion.div
      variants={itemVariants}
      className="mb-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/nb1_yCncBzg?si=nb1_yCncBzg&start=18"
              title="EUROGLOBAL - Démonstration"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
