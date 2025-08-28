// Mock d'API pour Chamelo - À remplacer par la véritable intégration API
// Ce fichier contient des données temporaires pour permettre au dashboard de fonctionner

// Types pour les données mockées
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
  category: string;
  collection: string;
  available: boolean;
}

interface Collection {
  id: number;
  name: string;
  description: string;
  productCount: number;
}

interface StatsData {
  totalProducts: number;
  totalSales: number;
  lastSyncDate: string;
  lastSyncStatus: 'success' | 'error' | 'never';
}

// Données factices pour les produits
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Vision One",
    price: 299.99,
    description: "Nos lunettes phares avec technologie adaptative",
    stock: 45,
    image: "/placeholder.svg",
    category: "Lunettes",
    collection: "Premium",
    available: true
  },
  {
    id: 2,
    name: "Sport Pro",
    price: 349.99,
    description: "Pour les activités sportives de plein air",
    stock: 28,
    image: "/placeholder.svg",
    category: "Lunettes",
    collection: "Sport",
    available: true
  },
  {
    id: 3,
    name: "Classic Edition",
    price: 249.99,
    description: "Design intemporel avec fonctionnalités adaptatives",
    stock: 12,
    image: "/placeholder.svg",
    category: "Lunettes",
    collection: "Classique",
    available: true
  },
  {
    id: 4,
    name: "Urban Style",
    price: 279.99,
    description: "Pour la vie urbaine avec style",
    stock: 35,
    image: "/placeholder.svg",
    category: "Lunettes",
    collection: "Urbain",
    available: true
  }
];

// Données factices pour les collections
const mockCollections: Collection[] = [
  {
    id: 1,
    name: "Premium",
    description: "Notre gamme de produits haut de gamme",
    productCount: 5
  },
  {
    id: 2,
    name: "Sport",
    description: "Conçue pour les activités sportives",
    productCount: 8
  },
  {
    id: 3,
    name: "Classique",
    description: "Design intemporel pour tous les jours",
    productCount: 4
  },
  {
    id: 4,
    name: "Urbain",
    description: "Style moderne pour la vie en ville",
    productCount: 7
  }
];

// Mock API
export const chameleoApi = {
  // Récupérer les statistiques
  getStats(): StatsData {
    return {
      totalProducts: mockProducts.length,
      totalSales: 324,
      lastSyncDate: new Date().toISOString(),
      lastSyncStatus: 'success'
    };
  },
  
  // Récupérer les produits avec filtres optionnels
  getProducts(filters: Record<string, string> = {}) {
    let filteredProducts = [...mockProducts];
    
    // Appliquer les filtres si définis
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category && filters.category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    
    if (filters.collection && filters.collection !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.collection === filters.collection);
    }
    
    if (filters.available === 'true') {
      filteredProducts = filteredProducts.filter(p => p.available);
    } else if (filters.available === 'false') {
      filteredProducts = filteredProducts.filter(p => !p.available);
    }
    
    return { products: filteredProducts, total: filteredProducts.length };
  },
  
  // Récupérer les collections
  getCollections() {
    return mockCollections;
  },
  
  // Simuler une synchronisation
  async syncCatalog() {
    // Simule un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      products: mockProducts,
      collections: mockCollections,
      status: 'success'
    };
  }
};
