# Configuration Supabase pour My Vision Connect

Ce document explique comment l'application My Vision Connect se connecte à l'instance Supabase auto-hébergée sur Coolify.

## URLs et Points d'accès

| Service | URL | Description |
|---------|-----|-------------|
| API Supabase | `https://supabasekong-jgsk88o4084w48wk04kk4080.gestionmax.fr` | Point d'entrée pour toutes les requêtes API via le client Supabase |
| Interface d'administration | `http://supabasekong-jgsk88o4084w48wk04kk4080.gestionmax.fr:8000` | Console d'administration pour gérer l'instance Supabase |

## Variables d'environnement

L'application nécessite ces variables d'environnement pour se connecter à Supabase :

```env
# URL de l'API Supabase (sans /rest/v1)
VITE_SUPABASE_URL=https://supabasekong-jgsk88o4084w48wk04kk4080.gestionmax.fr

# Clé anonyme Supabase
VITE_SUPABASE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

> **Important** : Ne pas inclure `/rest/v1` dans l'URL Supabase car le client l'ajoute automatiquement.

## Déploiement et CI/CD

Pour le déploiement via GitHub Actions, ces secrets doivent être configurés :

1. Dans les paramètres du dépôt GitHub, ajouter :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_KEY`
   - `COOLIFY_WEBHOOK_URL` (pour déclencher les déploiements Coolify)

## Tester la connexion

Pour vérifier que la connexion à Supabase fonctionne :

```bash
# Créer un fichier test-supabase.mjs
node test-supabase.mjs
```

## Dépannage

Si vous rencontrez des problèmes de connexion :

1. **URL incorrecte** : Vérifiez que l'URL n'inclut pas `/rest/v1`
2. **Problèmes d'authentification** : Vérifiez que la clé anonyme est valide
3. **Erreurs de CORS** : Si vous développez en local, vérifiez les paramètres CORS dans votre instance Supabase

## Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Configuration Coolify](https://coolify.io/docs)
