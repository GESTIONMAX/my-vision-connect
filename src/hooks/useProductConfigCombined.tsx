/**
 * Hooks combinés pour la configuration de produits qui servent de point d'entrée unique
 * Ils basculent automatiquement entre l'ancienne implémentation Supabase
 * et la nouvelle implémentation API REST/Prisma selon la configuration
 */
import { shouldUseNewApi } from '../utils/migration';
import { useState, useCallback } from 'react';

// Import des deux implémentations
import {
  useProductConfigurations as useProductConfigurationsSupabase,
  useCalculatePrice as useCalculatePriceSupabase,
  useProductConfigurationState,
  type ProductConfiguration as ProductConfigurationSupabase,
  type ConfigurationState
} from './useProductConfiguration';

import {
  useProductConfigurationsNew,
  useUserConfigurationsNew,
  useProductConfigurationNew,
  useCalculatePriceNew,
  useCreateConfigurationNew,
  useUpdateConfigurationNew,
  useDeleteConfigurationNew
} from './useProductConfigNew';

import type { 
  CreateProductConfigurationDto,
  UpdateProductConfigurationDto,
  PriceCalculationRequest
} from '../types/productConfig';

// Hooks combinés qui choisissent l'implémentation en fonction de la configuration
export const useProductConfigurations = shouldUseNewApi()
  ? useProductConfigurationsNew
  : useProductConfigurationsSupabase;

export const useUserConfigurations = shouldUseNewApi()
  ? useUserConfigurationsNew
  : () => {
    // L'ancien système ne distingue pas les configurations par utilisateur
    // Nous utilisons donc la même implémentation mais avertissons que cette fonctionnalité n'est pas pleinement supportée
    console.warn('useUserConfigurations n\'est pas entièrement supporté avec Supabase');
    return {
      data: [],
      isLoading: false,
      error: null
    };
  };

export const useProductConfiguration = shouldUseNewApi()
  ? useProductConfigurationNew
  : (id: string | undefined) => {
    // Fallback pour Supabase qui n'a pas cette fonctionnalité exactement
    console.warn('useProductConfiguration individuelle n\'est pas directement supporté avec Supabase');
    return {
      data: null,
      isLoading: false,
      error: null
    };
  };

export const useCalculatePrice = shouldUseNewApi()
  ? useCalculatePriceNew
  : () => {
    const calculatePrice = useCalculatePriceSupabase();
    
    return {
      ...calculatePrice,
      mutate: (data: PriceCalculationRequest) => {
        const { produitId, variantId, optionIds } = data;
        calculatePrice.mutate({
          productId: produitId,
          variantId,
          optionIds
        });
      },
      mutateAsync: async (data: PriceCalculationRequest) => {
        const { produitId, variantId, optionIds } = data;
        return await calculatePrice.mutateAsync({
          productId: produitId,
          variantId,
          optionIds
        });
      }
    };
  };

// Pour les hooks de mutation qui n'existent pas dans l'ancienne implémentation,
// nous fournissons des versions simplifiées qui simulent la fonctionnalité

export const useCreateConfiguration = shouldUseNewApi()
  ? useCreateConfigurationNew
  : () => {
    console.warn('useCreateConfiguration n\'est pas directement supporté avec Supabase');
    return {
      mutate: () => {},
      mutateAsync: async () => ({ success: false, message: 'Non disponible avec Supabase' }),
      isPending: false,
      isError: false,
      error: null
    };
  };

export const useUpdateConfiguration = shouldUseNewApi()
  ? useUpdateConfigurationNew
  : () => {
    console.warn('useUpdateConfiguration n\'est pas directement supporté avec Supabase');
    return {
      mutate: () => {},
      mutateAsync: async () => ({ success: false, message: 'Non disponible avec Supabase' }),
      isPending: false,
      isError: false,
      error: null
    };
  };

export const useDeleteConfiguration = shouldUseNewApi()
  ? useDeleteConfigurationNew
  : () => {
    console.warn('useDeleteConfiguration n\'est pas directement supporté avec Supabase');
    return {
      mutate: () => {},
      mutateAsync: async () => ({ success: false, message: 'Non disponible avec Supabase' }),
      isPending: false,
      isError: false,
      error: null
    };
  };

// Le hook de l'état de la configuration est spécifique à l'ancienne implémentation
// mais nous le ré-exportons pour maintenir la compatibilité
export { useProductConfigurationState };

// Re-exporter les types
export type { ProductConfigurationSupabase, ConfigurationState };
export type { CreateProductConfigurationDto, UpdateProductConfigurationDto, PriceCalculationRequest };
