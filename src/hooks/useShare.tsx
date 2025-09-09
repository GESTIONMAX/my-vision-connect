import { useToast } from './use-toast';

export interface ShareData {
  title: string;
  text: string;
  url: string;
}

export const useShare = () => {
  const { toast } = useToast();

  const shareProduct = async (shareData: ShareData) => {
    // Check if native sharing is available
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return { success: true };
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          return fallbackShare(shareData);
        }
        return { success: false };
      }
    } else {
      return fallbackShare(shareData);
    }
  };

  const fallbackShare = async (shareData: ShareData) => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      toast({
        title: "Lien copié !",
        description: "Le lien du produit a été copié dans le presse-papiers.",
      });
      return { success: true };
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const shareOnSocial = (platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp', shareData: ShareData) => {
    const encodedUrl = encodeURIComponent(shareData.url);
    const encodedText = encodeURIComponent(shareData.text);
    const encodedTitle = encodeURIComponent(shareData.title);

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    };

    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  return {
    shareProduct,
    shareOnSocial,
  };
};