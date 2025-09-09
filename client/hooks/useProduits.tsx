import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService, ProduitFilters } from '../api/services/productService';
import { Produit } from '../types/product';
import { PaginatedResponse } from '../types/api';

/**
 * Hook pour la gestion des produits
 */
export const useProduits = () => {
  const queryClient = useQueryClient();
  
  /**
   * Récupérer tous les produits avec pagination
   */
  const getProduits = (filters?: ProduitFilters) => {
    return useQuery({
      queryKey: ['produits', filters],
      queryFn: () => productService.getAllProducts(filters),
      select: (response) => response.data || { items: [], total: 0, page: 1, pageSize: 10, totalPages: 0 },
    });
  };
  
  /**
   * Récupérer un produit par ID
   */
  const getProduitById = (id?: number) => {
    return useQuery({
      queryKey: ['produit', id],
      queryFn: () => {
        if (!id) throw new Error('ID requis');
        return productService.getProductById(id);
      },
      select: (response) => response.data,
      enabled: !!id,
    });
  };
  
  /**
   * Créer un produit
   */
  const createProduit = useMutation({
    mutationFn: (data: Partial<Produit>) => productService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produits'] });
    },
  });
  
  /**
   * Mettre à jour un produit
   */
  const updateProduit = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Produit> }) => 
      productService.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['produits'] });
      queryClient.invalidateQueries({ queryKey: ['produit', variables.id] });
    },
  });
  
  /**
   * Supprimer un produit
   */
  const deleteProduit = useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produits'] });
    },
  });
  
  return {
    getProduits,
    getProduitById,
    createProduit,
    updateProduit,
    deleteProduit,
  };
};
