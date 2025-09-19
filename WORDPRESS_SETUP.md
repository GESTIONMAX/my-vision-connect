# Configuration WordPress Headless pour MyTechGear

Ce guide vous accompagne dans la mise en place d'une architecture WordPress headless avec Carbon Fields pour le projet MyTechGear.

## 📋 Prérequis

- Instance WordPress 6.0+ avec accès administrateur
- Certificat SSL (HTTPS obligatoire)
- Accès FTP/SFTP ou gestionnaire de fichiers
- Connaissances de base en WordPress

## 🚀 Étape 1 : Installation des plugins requis

### 1.1 Carbon Fields (Obligatoire)
```bash
# Via Composer (recommandé)
composer require htmlburger/carbon-fields

# Ou télécharger depuis : https://wordpress.org/plugins/carbon-fields/
```

### 1.2 Application Passwords (WordPress 5.6+)
Ce plugin est inclus dans WordPress 5.6+ par défaut. Sinon :
```bash
# Pour WordPress < 5.6
https://wordpress.org/plugins/application-passwords/
```

### 1.3 Plugins optionnels recommandés
- **WP REST API Controller** : Contrôle avancé des endpoints
- **REST API Authentication** : Sécurité renforcée
- **WP Migrate DB** : Migration de données

## 🔧 Étape 2 : Configuration WordPress

### 2.1 Activer les endpoints REST API
Ajoutez dans `functions.php` de votre thème :

```php
<?php
// Activer CORS pour les requêtes cross-origin
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        
        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
            status_header(200);
            exit();
        }
        
        return $value;
    });
});

// Exposer Carbon Fields dans l'API REST
add_action('carbon_fields_register_fields', 'mytechgear_register_carbon_fields');
```

### 2.2 Créer les Custom Post Types

```php
// Dans functions.php ou un plugin custom
function mytechgear_register_post_types() {
    // Products
    register_post_type('product', [
        'public' => true,
        'label' => 'Produits',
        'show_in_rest' => true, // IMPORTANT pour l'API REST
        'rest_base' => 'products',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_icon' => 'dashicons-products',
    ]);
    
    // Collections
    register_taxonomy('collection', 'product', [
        'public' => true,
        'label' => 'Collections',
        'show_in_rest' => true,
        'rest_base' => 'collections',
        'hierarchical' => true,
    ]);
    
    // Specifications
    register_post_type('specification', [
        'public' => true,
        'label' => 'Spécifications',
        'show_in_rest' => true,
        'rest_base' => 'specifications',
        'supports' => ['title', 'editor'],
    ]);
}
add_action('init', 'mytechgear_register_post_types');
```

## 🎨 Étape 3 : Configuration Carbon Fields

### 3.1 Créer le fichier Carbon Fields

Créez `wp-content/themes/your-theme/includes/carbon-fields-config.php` :

```php
<?php
use Carbon_Fields\\Container;
use Carbon_Fields\\Field;

function mytechgear_register_carbon_fields() {
    // Configuration pour les produits
    Container::make('post_meta', 'Informations Produit')
        ->where('post_type', '=', 'product')
        ->add_fields([
            // Prix
            Field::make('text', 'price_base', 'Prix de base (€)')
                ->set_attribute('type', 'number')
                ->set_attribute('step', '0.01'),
            
            Field::make('text', 'price_original', 'Prix original (€)')
                ->set_attribute('type', 'number')
                ->set_attribute('step', '0.01'),
            
            // Statuts
            Field::make('checkbox', 'is_featured', 'Produit vedette'),
            Field::make('checkbox', 'is_new', 'Nouveau produit'),
            
            // Stock
            Field::make('text', 'stock_quantity', 'Quantité en stock')
                ->set_attribute('type', 'number'),
            
            Field::make('text', 'sku', 'Référence (SKU)'),
            
            // Catégorisation
            Field::make('select', 'category', 'Catégorie')
                ->add_options([
                    'lifestyle' => 'Lifestyle',
                    'sport' => 'Sport',
                    'tech' => 'Technologie',
                ]),
            
            Field::make('select', 'usage_type', 'Type d\'usage')
                ->add_options([
                    'quotidien' => 'Quotidien',
                    'sport' => 'Sport',
                    'lifestyle' => 'Lifestyle',
                ]),
            
            Field::make('select', 'target_audience', 'Public cible')
                ->add_options([
                    'homme' => 'Homme',
                    'femme' => 'Femme',
                    'mixte' => 'Mixte',
                ]),
            
            // Galerie d'images
            Field::make('media_gallery', 'gallery', 'Galerie d\'images'),
            
            // Caractéristiques techniques
            Field::make('complex', 'specifications', 'Spécifications')
                ->add_fields([
                    Field::make('text', 'spec_name', 'Nom'),
                    Field::make('text', 'spec_value', 'Valeur'),
                    Field::make('text', 'spec_unit', 'Unité'),
                ]),
            
            // Fonctionnalités
            Field::make('complex', 'features', 'Fonctionnalités')
                ->add_fields([
                    Field::make('text', 'feature_name', 'Fonctionnalité'),
                ]),
            
            // Technologies
            Field::make('complex', 'technologies', 'Technologies')
                ->add_fields([
                    Field::make('text', 'tech_name', 'Technologie'),
                    Field::make('textarea', 'tech_description', 'Description'),
                ]),
        ]);
    
    // Configuration pour les collections
    Container::make('term_meta', 'Informations Collection')
        ->where('term_taxonomy', '=', 'collection')
        ->add_fields([
            Field::make('image', 'hero_image', 'Image d\'en-tête'),
            Field::make('rich_text', 'description_long', 'Description détaillée'),
            Field::make('select', 'collection_type', 'Type de collection')
                ->add_options([
                    'sport' => 'Sport',
                    'lifestyle' => 'Lifestyle',
                    'tech' => 'Technologie',
                ]),
            Field::make('date', 'launch_date', 'Date de lancement'),
        ]);
}

// Charger Carbon Fields
add_action('after_setup_theme', function() {
    require_once('vendor/autoload.php');
    \\Carbon_Fields\\Carbon_Fields::boot();
});
```

### 3.2 Inclure la configuration

Dans `functions.php` :

```php
require_once get_template_directory() . '/includes/carbon-fields-config.php';
```

## 🔐 Étape 4 : Configuration de l'authentification

### 4.1 Créer un utilisateur Application Password

1. Allez dans **Utilisateurs** > **Votre profil**
2. Scrollez vers **Application Passwords**
3. Créez un nouveau mot de passe avec le nom "MyTechGear Frontend"
4. Copiez le mot de passe généré (format: `xxxx xxxx xxxx xxxx xxxx xxxx`)

### 4.2 Configuration des variables d'environnement

Créez un fichier `.env.local` :

```env
# Configuration WordPress
VITE_WP_URL=https://votre-site-wordpress.com
VITE_WP_USERNAME=votre_username
VITE_WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

## 🧪 Étape 5 : Tests et validation

### 5.1 Tester les endpoints REST API

```bash
# Test de base
curl https://votre-site.com/wp-json/wp/v2/products

# Test avec authentification
curl -u "username:app_password" https://votre-site.com/wp-json/wp/v2/products

# Test des champs Carbon Fields
curl https://votre-site.com/wp-json/wp/v2/products?_embed=true
```

### 5.2 Vérifier la configuration

1. **API REST disponible** : `https://votre-site.com/wp-json/`
2. **Produits accessibles** : `https://votre-site.com/wp-json/wp/v2/products`
3. **Collections accessibles** : `https://votre-site.com/wp-json/wp/v2/collections`
4. **Champs Carbon Fields inclus** : Vérifiez que les champs apparaissent dans la réponse

## 🔄 Étape 6 : Migration des données

### 6.1 Export depuis l'API Express

```javascript
// Script de migration (à adapter selon vos données)
const migrateData = async () => {
    // Récupérer les données depuis Express
    const products = await fetch('http://localhost:5000/api/products').then(r => r.json());
    
    // Les transformer pour WordPress
    for (const product of products) {
        const wpProduct = {
            title: product.name,
            content: product.description_long,
            excerpt: product.description_short,
            status: 'publish',
            carbon_fields: {
                price_base: product.price,
                is_featured: product.is_featured,
                category: product.category,
                // ... autres champs
            }
        };
        
        // Créer via API WordPress
        await fetch('https://votre-site.com/wp-json/wp/v2/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa('username:app_password')}`
            },
            body: JSON.stringify(wpProduct)
        });
    }
};
```

## ⚡ Étape 7 : Optimisations

### 7.1 Cache et performances

```php
// Cache des requêtes REST API
add_filter('rest_cache_headers', function($headers) {
    $headers['Cache-Control'] = 'public, max-age=300'; // 5 minutes
    return $headers;
});

// Limiter les révisions
define('WP_POST_REVISIONS', 3);
```

### 7.2 Sécurité

```php
// Désactiver l'éditeur de fichiers
define('DISALLOW_FILE_EDIT', true);

// Masquer les informations de version
remove_action('wp_head', 'wp_generator');

// Limiter les tentatives de connexion (plugin recommandé)
```

## 🚨 Dépannage

### Problèmes courants

1. **Erreur CORS** : Vérifiez la configuration CORS dans functions.php
2. **Endpoints non disponibles** : Vérifiez `show_in_rest => true`
3. **Champs Carbon Fields manquants** : Vérifiez que Carbon Fields est bien initialisé
4. **Authentification échoue** : Vérifiez le format du mot de passe d'application

### Logs de débogage

```php
// Activer les logs WordPress
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

## 📞 Support

Pour toute question sur cette configuration :

1. Vérifiez d'abord la [documentation officielle Carbon Fields](https://carbonfields.net/docs/)
2. Consultez la [documentation WordPress REST API](https://developer.wordpress.org/rest-api/)
3. Testez vos endpoints avec un outil comme Postman

---

**Une fois cette configuration terminée, votre frontend React pourra consommer les données WordPress via les hooks créés dans `src/hooks/useWordPress.ts`.**