
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Zap, Shield } from 'lucide-react';

export const ProblemSolutionSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Fatigue oculaire",
      description: "La lumière bleue des écrans cause une fatigue constante"
    },
    {
      icon: AlertTriangle,
      title: "Adaptation lente",
      description: "Les verres traditionnels mettent du temps à s'adapter"
    },
    {
      icon: AlertTriangle,
      title: "Coût élevé",
      description: "Plusieurs paires de lunettes nécessaires selon l'usage"
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: "Adaptation instantanée",
      description: "Nos verres s'adaptent en 0.3 secondes à tout environnement"
    },
    {
      icon: Shield,
      title: "Protection totale",
      description: "100% de protection UV et filtre anti-lumière bleue"
    },
    {
      icon: CheckCircle,
      title: "Une seule paire",
      description: "Remplace toutes vos lunettes : soleil, lecture, écran"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Une révolution dans l'optique
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Fini les contraintes des verres traditionnels. Découvrez la technologie qui s'adapte à votre vie.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problèmes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-8">
              Les problèmes actuels
            </h3>
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                    <problem.icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {problem.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {problem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-8">
              Notre solution innovante
            </h3>
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <solution.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {solution.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {solution.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
