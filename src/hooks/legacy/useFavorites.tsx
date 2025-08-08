import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface UserFavorite {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.id.toString());

      if (error) {
        throw new Error(error.message);
      }

      return data as UserFavorite[];
    },
    enabled: !!user,
  });
};

export const useIsFavorite = (productId: string) => {
  const { data: favorites = [] } = useFavorites();
  return favorites.some(fav => fav.product_id === productId);
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (!user) {
        throw new Error('Vous devez être connecté pour ajouter aux favoris');
      }

      const { data, error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id.toString(),
          product_id: productId,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] });
      toast({
        title: "Ajouté aux favoris",
        description: "Le produit a été ajouté à vos favoris.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (!user) {
        throw new Error('Vous devez être connecté');
      }

      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id.toString())
        .eq('product_id', productId);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] });
      toast({
        title: "Retiré des favoris",
        description: "Le produit a été retiré de vos favoris.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useToggleFavorite = () => {
  const addToFavorites = useAddToFavorites();
  const removeFromFavorites = useRemoveFromFavorites();

  return {
    toggleFavorite: (productId: string, isFavorite: boolean) => {
      if (isFavorite) {
        removeFromFavorites.mutate(productId);
      } else {
        addToFavorites.mutate(productId);
      }
    },
    isLoading: addToFavorites.isPending || removeFromFavorites.isPending,
  };
};