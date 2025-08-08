import { supabase } from '@/integrations/supabase/client';

export interface AirtableSyncResult {
  ok: boolean;
  inserted: number;
  updated: number;
  total: number;
  errors: Array<{ id?: string; error: string }>;
}

export async function syncCollectionsFromAirtable(params?: {
  baseId?: string;
  tableId?: string;
  viewId?: string;
}): Promise<AirtableSyncResult> {
  const baseId = params?.baseId || 'appVH6EitfYVkeG9S';
  const tableId = params?.tableId || 'tblpZCp7XrWdtyzKJ';
  const viewId = params?.viewId || 'viw6w93yfH0NMJTqS';

  const { data, error } = await supabase.functions.invoke('airtable-sync', {
    body: {
      action: 'sync_collections',
      baseId,
      tableId,
      viewId,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as AirtableSyncResult;
}
