
import { motion } from 'framer-motion';
import { Eye, Zap, Smartphone } from 'lucide-react';

export const FloatingIcons = () => {
  const floatingIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="flex justify-center items-center gap-8 mb-8">
      <motion.div
        variants={floatingIconVariants}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
      >
        <Eye className="h-8 w-8 text-white" />
      </motion.div>
      
      <motion.div
        variants={floatingIconVariants}
        animate={{
          y: [0, -15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl"
      >
        <Zap className="h-10 w-10 text-white" />
      </motion.div>
      
      <motion.div
        variants={floatingIconVariants}
        animate={{
          y: [0, -8, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
      >
        <Smartphone className="h-8 w-8 text-white" />
      </motion.div>
    </div>
  );
};
