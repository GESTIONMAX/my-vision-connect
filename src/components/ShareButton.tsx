import { Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useShare } from '@/hooks/useShare';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  productName: string;
  productUrl: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ShareButton = ({ productName, productUrl, className, size = 'md' }: ShareButtonProps) => {
  const { shareProduct, shareOnSocial } = useShare();

  const shareData = {
    title: productName,
    text: `Découvrez ${productName} - Lunettes innovantes`,
    url: productUrl,
  };

  const handleNativeShare = () => {
    shareProduct(shareData);
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            sizeClasses[size],
            'rounded-full bg-background/80 backdrop-blur-sm hover:bg-background',
            className
          )}
        >
          <Share2 size={iconSizes[size]} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleNativeShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Partager
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => shareOnSocial('facebook', shareData)}>
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareOnSocial('twitter', shareData)}>
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareOnSocial('linkedin', shareData)}>
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareOnSocial('whatsapp', shareData)}>
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};