import { ChameleoProduct, ChameleoVariant, ChameleoImage, ChameleoCollection, ChameleoFilters } from '@/types/chameleo';

const CHAMELO_BASE_URL = 'https://chamelo.com';

export interface Product {
  id: string;
  external_id: string;
  name: string;
  description: string;
  vendor: string;
  product_type: string;
  handle: string;
  status: string;
  tags: string[];
  price_min: number;
  price_max: number;
  compare_at_price?: number;
  available: boolean;
  variants: ChameleoVariant[];
  images: ChameleoImage[];
  main_image?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  scraped_at: string;
}

export interface Collection {
  id: string;
  external_id: string;
  title: string;
  handle: string;
  description: string;
  products_count: number;
  image_url?: string;
  published_at: string;
  updated_at: string;
  scraped_at: string;
}

export interface Stats {
  totalProducts: number;
  availableProducts: number;
  totalCollections: number;
  lastSync?: string;
  lastSyncStatus: string;
}

class ChameleoApiService {
  async fetchChameloCatalog(): Promise<any[]> {
    const allProducts = [];
    let currentPage = 1;
    const limit = 250;
    
    try {
      while (true) {
        const url = currentPage === 1 
          ? `${CHAMELO_BASE_URL}/products.json`
          : `${CHAMELO_BASE_URL}/products.json?page=${currentPage}`;
        
        console.log(`📡 Récupération page ${currentPage}...`);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.products || data.products.length === 0) {
          break;
        }
        
        allProducts.push(...data.products);
        
        if (data.products.length < limit) {
          break;
        }
        
        currentPage++;
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      console.log(`✅ Total récupéré: ${allProducts.length} produits`);
      return allProducts;
      
    } catch (error) {
      console.error('❌ Erreur fetch Chamelo:', error);
      throw error;
    }
  }

  async fetchChameleoCollections(): Promise<any[]> {
    try {
      console.log('📡 Récupération collections Chamelo...');
      
      const response = await fetch(`${CHAMELO_BASE_URL}/collections.json`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`✅ ${data.collections.length} collections récupérées`);
      
      return data.collections;
      
    } catch (error) {
      console.error('❌ Erreur fetch collections:', error);
      throw error;
    }
  }

  processProductData(rawProducts: ChameleoProduct[]): Product[] {
    return rawProducts.map(product => {
      const prices = product.variants?.map((v: ChameleoVariant) => parseFloat(v.price)).filter((p: number) => p > 0) || [];
      const priceMin = prices.length > 0 ? Math.min(...prices) : 0;
      const priceMax = prices.length > 0 ? Math.max(...prices) : 0;
      const isAvailable = product.variants?.some((v: ChameleoVariant) => v.available) || false;
      const mainImage = product.images?.[0]?.src || null;
      
      return {
        id: product.id.toString(),
        external_id: product.id.toString(),
        name: product.title,
        description: product.body_html || '',
        vendor: product.vendor,
        product_type: product.product_type,
        handle: product.handle,
        status: product.status,
        tags: product.tags,
        price_min: priceMin,
        price_max: priceMax,
        compare_at_price: product.variants?.[0]?.compare_at_price ? 
          parseFloat(product.variants[0].compare_at_price.toString()) : undefined,
        available: isAvailable,
        variants: product.variants || [],
        images: product.images || [],
        main_image: mainImage,
        published_at: product.published_at,
        created_at: product.created_at,
        updated_at: product.updated_at,
        scraped_at: new Date().toISOString()
      };
    });
  }

  processCollectionData(rawCollections: ChameleoCollection[]): Collection[] {
    return rawCollections.map(collection => ({
      id: collection.id.toString(),
      external_id: collection.id.toString(),
      title: collection.title,
      handle: collection.handle,
      description: collection.description || '',
      products_count: collection.products_count || 0,
      image_url: typeof collection.image === 'string' ? collection.image : collection.image?.src || undefined,
      published_at: collection.published_at,
      updated_at: collection.updated_at,
      scraped_at: new Date().toISOString()
    }));
  }

  async syncCatalog(): Promise<{ products: Product[], collections: Collection[] }> {
    try {
      console.log('🚀 Démarrage sync Chamelo...');
      
      const [rawProducts, rawCollections] = await Promise.all([
        this.fetchChameloCatalog(),
        this.fetchChameleoCollections()
      ]);
      
      const products = this.processProductData(rawProducts);
      const collections = this.processCollectionData(rawCollections);
      
      localStorage.setItem('chamelo_products', JSON.stringify(products));
      localStorage.setItem('chamelo_collections', JSON.stringify(collections));
      localStorage.setItem('chamelo_last_sync', new Date().toISOString());
      
      console.log(`✅ Sync terminée: ${products.length} produits, ${collections.length} collections`);
      
      return { products, collections };
      
    } catch (error) {
      console.error('❌ Erreur sync:', error);
      throw error;
    }
  }

  getProducts(filters: ChameleoFilters = {}): { products: Product[], total: number } {
    const stored = localStorage.getItem('chamelo_products');
    if (!stored) return { products: [], total: 0 };
    
    let products: Product[] = JSON.parse(stored);
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      );
    }
    
    if (filters.category) {
      products = products.filter(p => p.product_type === filters.category);
    }
    
    if (filters.available !== undefined && filters.available !== 'all') {
      const isAvailable = typeof filters.available === 'boolean' ? filters.available : filters.available === 'true';
      products = products.filter(p => p.available === isAvailable);
    }
    
    return { products, total: products.length };
  }

  getCollections(): Collection[] {
    const stored = localStorage.getItem('chamelo_collections');
    return stored ? JSON.parse(stored) : [];
  }

  getStats(): Stats {
    const products = this.getProducts();
    const collections = this.getCollections();
    const availableProducts = products.products.filter(p => p.available);
    const lastSync = localStorage.getItem('chamelo_last_sync');
    
    return {
      totalProducts: products.total,
      availableProducts: availableProducts.length,
      totalCollections: collections.length,
      lastSync: lastSync || undefined,
      lastSyncStatus: lastSync ? 'completed' : 'never'
    };
  }
}

export const chameleoApi = new ChameleoApiService();
