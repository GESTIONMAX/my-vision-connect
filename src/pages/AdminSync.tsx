import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { syncCollectionsFromAirtable } from '@/services/airtableApi';

export default function AdminSync() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSync = async () => {
    setLoading(true);
    try {
      const res = await syncCollectionsFromAirtable();
      toast({
        title: 'Synchronisation terminée',
        description: `Collections: ${res.total} (ajoutées: ${res.inserted}, mises à jour: ${res.updated})`,
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
