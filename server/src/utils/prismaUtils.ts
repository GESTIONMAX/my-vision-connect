import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Fonction pour initialiser la base de données avec des données de test
 */
export async function seedDatabase() {
  try {
    console.log('🌱 Début de la génération des données de test...');

    // Créer un utilisateur administrateur
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@test.com' }
    });

    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Admin123!', salt);

      await prisma.user.create({
        data: {
          email: 'admin@test.com',
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN'
        }
      });
      console.log('👤 Utilisateur administrateur créé');
    }

    // Créer un utilisateur normal
    const userExists = await prisma.user.findUnique({
      where: { email: 'user@test.com' }
    });

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('User123!', salt);

      await prisma.user.create({
        data: {
          email: 'user@test.com',
          password: hashedPassword,
          firstName: 'Test',
          lastName: 'User',
          role: 'USER'
        }
      });
      console.log('👤 Utilisateur normal créé');
    }

    // Créer des catégories
    const categoryCount = await prisma.category.count();
    if (categoryCount === 0) {
      const categories = await prisma.category.createMany({
        data: [
          { name: 'Informatique', slug: 'informatique', description: 'Produits informatiques' },
          { name: 'Audio', slug: 'audio', description: 'Équipement audio' },
          { name: 'Vidéo', slug: 'video', description: 'Équipement vidéo' },
          { name: 'Accessoires', slug: 'accessoires', description: 'Accessoires divers' }
        ]
      });
      console.log(`📁 ${categories.count} catégories créées`);
    }

    // Récupérer les catégories pour les produits
    const allCategories = await prisma.category.findMany();
    
    // Créer des produits si nécessaire
    const productCount = await prisma.product.count();
    if (productCount === 0 && allCategories.length > 0) {
      const products = await prisma.product.createMany({
        data: [
          {
            name: 'Caméra HD',
            slug: 'camera-hd',
            description: 'Caméra haute définition pour vos projets vidéo',
            price: 299.99,
            images: ['camera1.jpg', 'camera2.jpg'],
            stock: 15,
            categoryId: allCategories.find(c => c.slug === 'video')?.id || allCategories[0].id,
            bestseller: true
          },
          {
            name: 'Microphone studio',
            slug: 'microphone-studio',
            description: 'Microphone professionnel pour studio',
            price: 149.99,
            images: ['mic1.jpg', 'mic2.jpg'],
            stock: 25,
            categoryId: allCategories.find(c => c.slug === 'audio')?.id || allCategories[0].id,
            bestseller: false
          },
          {
            name: 'Ordinateur portable',
            slug: 'ordinateur-portable',
            description: 'Ordinateur portable performant pour tous vos besoins',
            price: 899.99,
            images: ['laptop1.jpg', 'laptop2.jpg'],
            stock: 10,
            categoryId: allCategories.find(c => c.slug === 'informatique')?.id || allCategories[0].id,
            bestseller: true
          },
          {
            name: 'Trépied professionnel',
            slug: 'trepied-professionnel',
            description: 'Trépied stable et ajustable pour caméra',
            price: 79.99,
            images: ['tripod1.jpg', 'tripod2.jpg'],
            stock: 30,
            categoryId: allCategories.find(c => c.slug === 'accessoires')?.id || allCategories[0].id,
            bestseller: false
          }
        ]
      });
      console.log(`📦 ${products.count} produits créés`);
    }

    console.log('✅ Données de test générées avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la génération des données :', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Vérifier la connexion à la base de données
 */
export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à la base de données établie avec succès');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données :', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Si ce fichier est exécuté directement
if (require.main === module) {
  seedDatabase()
    .then(() => console.log('✅ Script terminé'))
    .catch(console.error);
}
