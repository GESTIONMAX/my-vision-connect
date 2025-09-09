# 🚀 Refactorisation : Migration vers Supabase comme source de vérité

## ✅ Architecture optimisée

### Avant la refactorisation :
- **Produits** : WooCommerce/CoCart API (via edge functions)
- **Collections** : Supabase
- **Panier** : CoCart
- **Commandes** : WooCommerce

### Après la refactorisation :
- **Produits** : ✨ **Supabase** (source de vérité)
- **Collections** : Supabase
- **Panier** : CoCart (conservé)
- **Commandes** : WooCommerce (conservé)

## 🔄 Fichiers modifiés

### 1. `src/hooks/useProducts.ts` - REFACTORISÉ ✨
- **Migration** : De `useCoCartProducts()` vers requêtes Supabase directes
- **Nouveaux hooks** :
  - `useProducts(filters)` - Hook principal avec filtres avancés
  - `useProduct(slug)` - Produit individuel par slug/SKU
  - `usePopularProducts(count)` - Produits populaires
  - `useFeaturedProducts(count)` - Produits en vedette
  - `useNewProducts(count)` - Nouveaux produits
  - `useProductSearch(query, filters)` - Recherche avec filtres

### 2. `src/components/CombinedProductCatalog.tsx` - MODIFIÉ ✨
- **Migration** : Utilise maintenant `useProducts()` pour les produits Supabase
- **Fonctionnalité** : Combine produits Supabase + Chamelo
- **État de chargement** : Gestion combinée des deux sources

## 🎯 Fonctionnalités conservées (compatibilité 100%)

### Interface Product identique
- Tous les champs `Product` maintenus
- Alias de compatibilité (`isNew`, `isPopular`, `inStock`, etc.)
- Types TypeScript inchangés

### Hooks de compatibilité
- `usePopularProducts()` - Fonctionne avec `is_featured` comme proxy
- `useFeaturedProducts()` - Utilise `is_featured`
- `useNewProducts()` - Tri par `created_at`

### Filtres avancés supportés
- **Catégorie** : `category`
- **Collection** : `collection_slug`
- **Recherche** : `name` + `description`
- **Featured** : `is_featured`
- **Stock** : `is_active` + `stock_quantity`
- **Tri** : prix, nom, date, rating

## 🚧 Champs temporairement mappés

Ces champs ne sont pas encore dans le schéma Supabase :
- `is_popular` → `false` (à ajouter si nécessaire)
- `is_new` → `false` (à ajouter si nécessaire)
- `original_price` → `undefined` (à ajouter si nécessaire)
- `specifications` → `{}` (à ajouter si nécessaire)

## 📈 Bénéfices de la refactorisation

### Performance ⚡
- **Vitesse** : Requêtes locales Supabase vs API externe
- **Cache** : TanStack Query + cache Supabase
- **Pagination** : Native Supabase
- **Recherche** : Index PostgreSQL

### Contrôle 🎯
- **Données** : Contrôle total sur vos produits
- **Filtres** : Filtres SQL puissants
- **Migrations** : Évolution simple du schéma
- **Sécurité** : RLS Supabase

### Économies 💰
- **Moins d'appels API** : Réduction des coûts externes
- **Bande passante** : Optimisée
- **Latence** : Réduite

## 🛒 WooCommerce/CoCart conservé pour

### Fonctionnalités e-commerce critiques
- **Panier** : `useCoCartCart()`, `useCoCartAddToCart()`, etc.
- **Checkout** : Processus de commande
- **Paiements** : Intégration payment gateways
- **Gestion commandes** : Suivi, statuts
- **Gestion clients** : Comptes WooCommerce

### Fichiers conservés intacts
- `src/hooks/useCoCart.ts` - Hooks panier/commandes
- `src/services/cocartApi.ts` - Service panier
- `src/services/woocommerceApi.ts` - Service commandes
- `supabase/functions/cocart-api/` - Edge function panier
- `supabase/functions/woocommerce-api/` - Edge function commandes

## 🔧 Migration des données (si nécessaire)

Si vous avez des produits WooCommerce à migrer :

```sql
-- Script d'exemple pour importer des produits
INSERT INTO public.products (
  name, 
  description, 
  price, 
  category, 
  collection_slug,
  is_featured,
  stock_quantity,
  images
) VALUES 
-- Vos données ici
```

## 🎉 Résultat final

**Architecture hybride optimale :**
- ✨ **Catalogue produits** : Supabase (rapide, flexible)
- 🛒 **E-commerce** : WooCommerce (robuste, éprouvé)
- 🕶️ **Catalogue Chamelo** : API externe (spécialisé)

Cette architecture offre le meilleur des deux mondes : performance et fonctionnalités e-commerce complètes !