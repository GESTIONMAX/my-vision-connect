import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collectionService, Collection } from '../api/services/collectionService';

/**
 * Hook pour la gestion des collections
 */
export const useCollections = () => {
  const queryClient = useQueryClient();
  
  /**
   * Récupérer toutes les collections
   */
  const getCollections = () => {
    return useQuery({
      queryKey: ['collections'],
      queryFn: () => collectionService.getAllCollections(),
      select: (response) => response.data || [],
    });
  };
  
  /**
   * Récupérer une collection par ID
   */
  const getCollectionById = (id?: number) => {
    return useQuery({
      queryKey: ['collection', id],
      queryFn: () => {
        if (!id) throw new Error('ID requis');
        return collectionService.getCollectionById(id);
      },
      select: (response) => response.data,
      enabled: !!id,
    });
  };

  /**
   * Récupérer les produits d'une collection
   */
  const getCollectionProducts = (id?: number) => {
    return useQuery({
      queryKey: ['collection', id, 'produits'],
      queryFn: () => {
        if (!id) throw new Error('ID requis');
        return collectionService.getCollectionProducts(id);
      },
      select: (response) => response.data || [],
      enabled: !!id,
    });
  };
  
  /**
   * Créer une collection
   */
  const createCollection = useMutation({
    mutationFn: (data: Partial<Collection>) => collectionService.createCollection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
  
  /**
   * Mettre à jour une collection
   */
  const updateCollection = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Collection> }) => 
      collectionService.updateCollection(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collection', variables.id] });
    },
  });
  
  /**
   * Supprimer une collection
   */
  const deleteCollection = useMutation({
    mutationFn: (id: number) => collectionService.deleteCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
  
  return {
    getCollections,
    getCollectionById,
    getCollectionProducts,
    createCollection,
    updateCollection,
    deleteCollection,
  };
};
