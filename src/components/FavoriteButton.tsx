import { Heart } from 'lucide-react';
import { Button } from '../../client/button';
import { useAuthNew } from '../hooks/useAuthNew';
import { useIsFavoriteNew, useToggleFavoriteNew } from '../hooks/useFavoritesNew';
import { cn } from '../../client/utils';
import { useToast } from '../../client/use-toast';

interface FavoriteButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FavoriteButton = ({ productId, className, size = 'md' }: FavoriteButtonProps) => {
  const { user } = useAuthNew();
  const { toast } = useToast();
  const { data: isFavorite = false } = useIsFavoriteNew(productId);
  const { toggle: toggleFavorite, isLoading } = useToggleFavoriteNew();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour ajouter des favoris.",
        variant: "destructive",
      });
      return;
    }

    toggleFavorite(productId, isFavorite);
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        sizeClasses[size],
        'rounded-full bg-background/80 backdrop-blur-sm hover:bg-background',
        isFavorite && 'text-red-500 hover:text-red-600',
        className
      )}
    >
      <Heart 
        size={iconSizes[size]} 
        className={cn(
          'transition-all duration-200',
          isFavorite && 'fill-current'
        )} 
      />
    </Button>
  );
};