import React, { useEffect, useState } from 'react';

// Récupération de l'URL Supabase depuis les variables d'environnement
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "http://127.0.0.1:54323";

const TestConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    success?: boolean;
    data?: any;
    error?: any;
  }>({});
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Test de connexion
    const checkConnection = async () => {
      // Test de la connexion à Supabase
      const result = await testSupabaseConnection();
      setConnectionStatus(result);
      
      if (result.success) {
        // Si la connexion réussit, récupérons quelques produits à partir d'un fetch direct
        // pour éviter les problèmes de typage avec la table chamelo_products
        try {
          const response = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&limit=5`, {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"}`,
            }
          });
          
          if (!response.ok) {
            console.error('Erreur lors de la récupération des produits:', response.statusText);
          } else {
            const data = await response.json();
            setProducts(data || []);
          }
        } catch (err) {
          console.error('Exception lors de la récupération des produits:', err);
        }
      }
    };
    
    checkConnection();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Test de Connexion Supabase</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: connectionStatus.success ? '#e6f7e6' : '#f7e6e6', borderRadius: '5px' }}>
        <h2>Statut de Connexion:</h2>
        {connectionStatus.success !== undefined ? (
          connectionStatus.success ? 
            <p style={{ color: 'green' }}>✅ Connecté avec succès à Supabase!</p> : 
            <p style={{ color: 'red' }}>❌ Échec de connexion: {JSON.stringify(connectionStatus.error)}</p>
        ) : (
          <p>Vérification de la connexion...</p>
        )}
      </div>

      {products.length > 0 && (
        <div>
          <h2>Produits Chamelo (5 premiers):</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>{product.name || product.product_name || 'Sans nom'}</strong>
                <br />
                {product.price && <span>Prix: {product.price} €</span>}
                <br />
                {product.description && <span>Description: {product.description.substring(0, 100)}...</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '12px', color: '#666' }}>
        <h3>Informations de Débogage:</h3>
        <p>URL Supabase: {SUPABASE_URL || 'http://127.0.0.1:54323'}</p>
        <p>Réponse détaillée: {JSON.stringify(connectionStatus, null, 2)}</p>
      </div>
    </div>
  );
};

export default TestConnection;
