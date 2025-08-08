// Supabase Edge Function: Airtable Sync
// Sync Collections from Airtable into Supabase
// Uses service role for privileged writes. Secure the function by controlling secrets.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function slugify(input: string): string {
  return (input || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function fetchAirtablePage({ baseId, tableId, viewId, token, offset }: { baseId: string; tableId: string; viewId?: string; token: string; offset?: string; }) {
  const params = new URLSearchParams();
  params.set('pageSize', '100');
  if (viewId) params.set('view', viewId);
  if (offset) params.set('offset', offset);

  const resp = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Airtable error ${resp.status}: ${txt}`);
  }

  return resp.json();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const AIRTABLE_TOKEN = Deno.env.get('AIRTABLE_TOKEN');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!AIRTABLE_TOKEN) {
      return new Response(JSON.stringify({ error: 'Missing AIRTABLE_TOKEN secret' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const body = await req.json().catch(() => ({}));
    const action = body.action || 'sync_collections';

    // Defaults based on user-provided URL
    const baseId: string = body.baseId || 'appVH6EitfYVkeG9S';
    const tableId: string = body.tableId || 'tblpZCp7XrWdtyzKJ';
    const viewId: string | undefined = body.viewId || 'viw6w93yfH0NMJTqS';

    if (action !== 'sync_collections') {
      return new Response(JSON.stringify({ error: 'Unsupported action' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    let offset: string | undefined = undefined;
    let inserted = 0;
    let updated = 0;
    const errors: Array<{ id?: string; error: string }> = [];

    console.log('[airtable-sync] Start syncing Collections');

    do {
      const page = await fetchAirtablePage({ baseId, tableId, viewId, token: AIRTABLE_TOKEN, offset });
      const records: Array<{ id: string; fields: Record<string, unknown> }> = page.records || [];
      offset = page.offset;

      for (const rec of records) {
        try {
          const f = rec.fields || {};
          const name = (f['Nom'] as string) || (f['Name'] as string) || '';
          if (!name) {
            console.log('[airtable-sync] Skip record without name', rec.id);
            continue;
          }

          const providedSlug = (f['Slug'] as string) || (f['slug'] as string) || '';
          const slug = slugify(providedSlug || name);
          const description = (f['Description'] as string) || '';

          // Image can be a URL string or an Attachment[] field named "Image" or "Image URL"
          let image_url = '';
          if (typeof f['Image URL'] === 'string') {
            image_url = f['Image URL'] as string;
          } else if (Array.isArray(f['Image'])) {
            const att = (f['Image'] as Array<any>)[0];
            image_url = att?.url || '';
          }

          const sort_order_raw = (f['Sort Order'] as number) || (f['Ordre'] as number) || undefined;
          const sort_order = typeof sort_order_raw === 'number' ? sort_order_raw : null;

          // Check existing by slug
          const { data: existing, error: selErr } = await supabase
            .from('collections')
            .select('id, slug')
            .eq('slug', slug)
            .limit(1);

          if (selErr) throw selErr;

          const payload = {
            name,
            slug,
            description,
            image_url: image_url || null,
            is_active: true,
            sort_order: sort_order ?? null,
          } as any;

          if (existing && existing.length > 0) {
            const { error: updErr } = await supabase
              .from('collections')
              .update(payload)
              .eq('id', existing[0].id);
            if (updErr) throw updErr;
            updated += 1;
          } else {
            const { error: insErr } = await supabase
              .from('collections')
              .insert(payload);
            if (insErr) throw insErr;
            inserted += 1;
          }
        } catch (e: any) {
          console.error('[airtable-sync] Record error', rec.id, e?.message || e);
          errors.push({ id: rec.id, error: e?.message || String(e) });
        }
      }
    } while (offset);

    const result = { ok: true, inserted, updated, total: inserted + updated, errors };
    console.log('[airtable-sync] Done', result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (e: any) {
    console.error('[airtable-sync] Fatal error', e?.message || e);
    return new Response(JSON.stringify({ error: e?.message || 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
