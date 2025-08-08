import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Loader2, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { chameleoApi } from '@/services/chameleoApi';
import { useToast } from '@/components/ui/use-toast';

interface SyncStats {
  lastSyncTime?: string;
  lastStatus?: string;
  totalShopifyProducts: number;
  totalSupabaseProducts: number;
  totalCollections: number;
  incompleteProducts: number;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const SyncDiagnostic = () => {
  const [stats, setStats] = useState<SyncStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Récupérer les dernières infos de synchronisation
      const { data: lastSync } = await supabase
        .from('sync_audit')
        .select('*')
        .order('sync_time', { ascending: false })
        .limit(1);

      // Compter les produits Shopify (localStorage)
      const shopifyProducts = JSON.parse(localStorage.getItem('chamelo_products') || '[]');
      
      // Compter les produits Supabase
      const { data: supabaseProducts, error: productsError } = await supabase
        .from('chamelo_products')
        .select('id, title, image_url');
        
      if (productsError) throw productsError;
      
      // Compter les collections
      const { data: collections, error: collectionsError } = await supabase
        .from('chamelo_collections')
        .select('id');
        
      if (collectionsError) throw collectionsError;
      
      // Compter les produits sans image
      const incompleteProducts = supabaseProducts?.filter(p => !p.image_url).length || 0;
      
      setStats({
        lastSyncTime: lastSync?.[0]?.sync_time,
        lastStatus: lastSync?.[0]?.status,
        totalShopifyProducts: shopifyProducts.length,
        totalSupabaseProducts: supabaseProducts?.length || 0,
        totalCollections: collections?.length || 0,
        incompleteProducts
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      toast({
        title: "Erreur de diagnostic",
        description: "Impossible de récupérer les informations de synchronisation.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSync = async () => {
    setSyncing(true);
    try {
      await chameleoApi.syncCatalog();
      toast({
        title: "Synchronisation réussie",
        description: "Les données ont été synchronisées avec succès entre Shopify et Supabase.",
        variant: "default"
      });
      // Rafraîchir les statistiques
      await fetchStats();
    } catch (error) {
      console.error('Erreur de synchronisation:', error);
      toast({
        title: "Erreur de synchronisation",
        description: "La synchronisation a échoué. Vérifiez la console pour plus de détails.",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  if (loading) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span>Chargement des diagnostics de synchronisation...</span>
      </div>
    );
  }
  
  const statusColor = stats?.lastStatus === 'success' ? 'text-green-500' : 'text-red-500';
  const productsDiff = (stats?.totalSupabaseProducts || 0) - (stats?.totalShopifyProducts || 0);
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center">
          Diagnostic de Synchronisation
          {stats?.lastStatus === 'success' ? 
            <CheckCircle className="w-5 h-5 ml-2 text-green-500" /> : 
            <AlertCircle className="w-5 h-5 ml-2 text-red-500" />}
        </h3>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => fetchStats()} 
            className="p-2 rounded-full hover:bg-gray-200"
            title="Rafraîchir les statistiques"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-600 underline"
          >
            {expanded ? 'Réduire' : 'Détails'}
          </button>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="text-sm text-gray-600">
          Dernière synchronisation: {stats?.lastSyncTime ? new Date(stats.lastSyncTime).toLocaleString() : 'Jamais'}
          <span className={`ml-2 ${statusColor}`}>
            {stats?.lastStatus === 'success' ? '✓ Réussie' : '✗ Échouée'}
          </span>
        </div>
        
        {expanded && (
          <div className="mt-3 text-sm space-y-1">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white p-2 rounded border">
                <div className="text-xs text-gray-500">Produits Shopify</div>
                <div className="text-lg font-bold">{stats?.totalShopifyProducts || 0}</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="text-xs text-gray-500">Produits Supabase</div>
                <div className="text-lg font-bold">{stats?.totalSupabaseProducts || 0}</div>
              </div>
            </div>
            
            <div>Collections: <span className="font-medium">{stats?.totalCollections || 0}</span></div>
            <div>Produits sans image: <span className="font-medium text-orange-500">{stats?.incompleteProducts || 0}</span></div>
            
            {productsDiff !== 0 && (
              <div className={productsDiff > 0 ? "text-green-600" : "text-red-600"}>
                {productsDiff > 0 ? `+${productsDiff} produits` : `${productsDiff} produits`} dans Supabase par rapport à Shopify
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <button
          onClick={handleSync}
          disabled={syncing}
          className={`w-full py-2 px-4 rounded font-medium flex items-center justify-center ${
            syncing 
              ? "bg-blue-300 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {syncing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Synchronisation en cours...
            </>
          ) : (
            'Synchroniser maintenant'
          )}
        </button>
      </div>
    </div>
  );
};

export default SyncDiagnostic;
