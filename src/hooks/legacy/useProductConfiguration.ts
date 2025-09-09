import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';

export interface ProductConfiguration {
  id: string;
  product_id: string;
  variant_id?: string;
  option_ids: string[];
  final_price: number;
  sku?: string;
  stock_quantity: number;
  is_available: boolean;
  created_at: string;
}

export interface ConfigurationState {
  selectedVariantId?: string;
  selectedOptionIds: string[];
  calculatedPrice: number;
  isValid: boolean;
}

export const useProductConfigurations = (productId: string) => {
  return useQuery({
    queryKey: ['product_configurations', productId],
    queryFn: async () => {
        .from('product_configurations')
        .select('*')
        .eq('product_id', productId)
        .eq('is_available', true);

      if (error) {
        throw new Error(error.message);
      }

      return data as ProductConfiguration[];
    },
    enabled: !!productId,
  });
};

export const useCalculatePrice = () => {
  return useMutation({
    mutationFn: async ({
      productId,
      variantId,
      optionIds,
    }: {
      productId: string;
      variantId?: string;
      optionIds?: string[];
    }) => {
        p_product_id: productId,
        p_variant_id: variantId || null,
        p_option_ids: optionIds || null,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as number;
    },
  });
};

export const useProductConfigurationState = (productId: string) => {
  const [configuration, setConfiguration] = useState<ConfigurationState>({
    selectedVariantId: undefined,
    selectedOptionIds: [],
    calculatedPrice: 0,
    isValid: false,
  });

  const calculatePrice = useCalculatePrice();

  const updateConfiguration = useCallback(async (
    updates: Partial<Pick<ConfigurationState, 'selectedVariantId' | 'selectedOptionIds'>>
  ) => {
    const newConfig = {
      ...configuration,
      ...updates,
    };

    try {
      const price = await calculatePrice.mutateAsync({
        productId,
        variantId: newConfig.selectedVariantId,
        optionIds: newConfig.selectedOptionIds,
      });

      setConfiguration({
        ...newConfig,
        calculatedPrice: price,
        isValid: true,
      });
    } catch (error) {
      console.error('Error calculating price:', error);
      setConfiguration({
        ...newConfig,
        calculatedPrice: 0,
        isValid: false,
      });
    }
  }, [configuration, calculatePrice, productId]);

  const selectVariant = useCallback((variantId: string) => {
    updateConfiguration({ selectedVariantId: variantId });
  }, [updateConfiguration]);

  const toggleOption = useCallback((optionId: string) => {
    const newOptionIds = configuration.selectedOptionIds.includes(optionId)
      ? configuration.selectedOptionIds.filter(id => id !== optionId)
      : [...configuration.selectedOptionIds, optionId];
    
    updateConfiguration({ selectedOptionIds: newOptionIds });
  }, [configuration.selectedOptionIds, updateConfiguration]);

  const setOptions = useCallback((optionIds: string[]) => {
    updateConfiguration({ selectedOptionIds: optionIds });
  }, [updateConfiguration]);

  const reset = useCallback(() => {
    setConfiguration({
      selectedVariantId: undefined,
      selectedOptionIds: [],
      calculatedPrice: 0,
      isValid: false,
    });
  }, []);

  return {
    configuration,
    selectVariant,
    toggleOption,
    setOptions,
    updateConfiguration,
    reset,
    isCalculating: calculatePrice.isPending,
  };
};