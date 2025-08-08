-- Table pour suivre toutes les opérations de synchronisation
CREATE TABLE IF NOT EXISTS sync_audit (
  id SERIAL PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  products_count INTEGER,
  collections_count INTEGER,
  sync_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  status VARCHAR(50) NOT NULL,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Index pour faciliter la recherche et l'ordre chronologique
CREATE INDEX IF NOT EXISTS idx_sync_audit_sync_time ON sync_audit(sync_time DESC);

-- Commentaires sur les colonnes
COMMENT ON TABLE sync_audit IS 'Historique des synchronisations entre différentes sources de données (Shopify, API, Supabase)';
COMMENT ON COLUMN sync_audit.source IS 'Source de la synchronisation (chamleo_api, shopify_dashboard, etc.)';
COMMENT ON COLUMN sync_audit.products_count IS 'Nombre de produits synchronisés (peut être NULL en cas d''erreur)';
COMMENT ON COLUMN sync_audit.collections_count IS 'Nombre de collections synchronisées (peut être NULL en cas d''erreur)';
COMMENT ON COLUMN sync_audit.sync_time IS 'Horodatage de la tentative de synchronisation';
COMMENT ON COLUMN sync_audit.status IS 'Statut final de la synchronisation (success, error)';
COMMENT ON COLUMN sync_audit.error_message IS 'Message d''erreur en cas d''échec';
