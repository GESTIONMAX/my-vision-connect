import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
// TODO: Replace with proper API sync functionality
// import { syncCollectionsFromAirtable } from '@/services/airtableApi';

export default function AdminSync() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSync = async () => {
    setLoading(true);
    try {
      // TODO: Replace with proper API sync functionality
      // const res = await syncCollectionsFromAirtable();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast({
        title: 'Synchronisation temporairement désactivée',
        description: 'La fonction de synchronisation sera implémentée prochainement',
      });
    } catch (e: any) {
      toast({
        title: 'Erreur de synchronisation',
        description: e?.message || 'Erreur inconnue',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="container mx-auto py-10">
        <h1 className="text-2xl font-semibold mb-4">Sync Airtable → Supabase</h1>
        <p className="text-muted-foreground mb-6">Collections (lecture seule depuis Airtable)</p>
        <Button onClick={handleSync} disabled={loading}>
          {loading ? 'Synchronisation…' : 'Lancer la synchronisation des Collections'}
        </Button>
      </section>
    </main>
  );
}
