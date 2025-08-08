/**
 * Hook d'authentification qui sert de point d'entrée unique pour tous les composants
 * Dépendant de la configuration (VITE_USE_NEW_API), il utilise soit l'ancienne implémentation Supabase
 * soit la nouvelle implémentation API REST/Prisma
 */
import { shouldUseNewApi } from '../utils/migration';

// Import des deux implémentations
import { useAuth as useSupabaseAuth, AuthProvider as SupabaseAuthProvider } from './useSupabaseAuth';
import { useAuthNew as useRestAuth, AuthProvider as RestAuthProvider } from './useAuthNew';

// Exporter le hook et le provider appropriés selon la configuration
export const useAuth = shouldUseNewApi() ? useRestAuth : useSupabaseAuth;
export const AuthProvider = shouldUseNewApi() ? RestAuthProvider : SupabaseAuthProvider;

// Note: Cette approche permet aux composants d'utiliser toujours useAuth sans se soucier
// de l'implémentation sous-jacente, rendant la migration transparente pour le reste de l'application