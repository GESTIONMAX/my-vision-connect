
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';

export const SupportHero = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Support Professionnel
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Une équipe d'experts dédiée pour vous accompagner dans votre succès
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
              <Clock className="h-5 w-5 mr-2" />
              <span>Support 24/7</span>
            </div>
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
              <Users className="h-5 w-5 mr-2" />
              <span>Équipe dédiée</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
