import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

// Composant simple pour tester l'affichage des produits Supabase
export const TestSupabaseProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Récupérer les variables d'environnement
        const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
        const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
        
        // Vérifier si les variables sont définies
        if (!SUPABASE_URL || !SUPABASE_KEY) {
          throw new Error('Variables d\'environnement Supabase manquantes');
        }
        
        // Fetch direct à l'API REST
        const response = await fetch(`${SUPABASE_URL}/rest/v1/chamelo_products?select=*&limit=10`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Produits récupérés:', data);
        setProducts(data || []);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-8">Chargement des produits...</div>;
  if (error) return <div className="p-8 text-red-500">Erreur: {error}</div>;
  if (!products.length) return <div className="p-8">Aucun produit trouvé</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test des produits Supabase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold">{product.title}</h2>
            
            {/* Affichage de l'image avec URL */}
            {product.url && (
              <div className="aspect-square bg-gray-100 mb-4 rounded overflow-hidden">
                <img 
                  src={product.url} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Erreur de chargement image:', product.url);
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://via.placeholder.com/400?text=Image+non+disponible';
                  }}
                />
              </div>
            )}
            
            {/* Autres infos produit */}
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Prix:</strong> {product.price}</p>
            <p><strong>Catégorie:</strong> {product.category}</p>
            <p><strong>Type:</strong> {product.product_type}</p>
            <p><strong>URL image:</strong> {product.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSupabaseProducts;
