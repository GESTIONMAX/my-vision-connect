// @ts-ignore - Pour éviter les avertissements d'import non utilisé
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

// Déclarer le type pour les propriétés manquantes du PrismaClient
declare module '@prisma/client' {
  interface PrismaClient {
    productConfiguration: any;
    produit: any;
    variante: any;
  }
}

const prisma = new PrismaClient();

/**
 * Récupère toutes les configurations de produits de l'utilisateur connecté
 */
export const getUserConfigurations = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    
    const configurations = await prisma.productConfiguration.findMany({
      where: { userId },
      include: {
        produit: {
          include: {
            collection: true,
            assets: {
              where: {
                type: 'IMAGE'
              },
              take: 1
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json({
      success: true,
      data: configurations
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des configurations:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des configurations',
      errors: error
    });
  }
};

/**
 * Récupère une configuration spécifique par son ID
 */
export const getConfigurationById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { id } = req.params;

    const configuration = await prisma.productConfiguration.findFirst({
      where: {
        id,
        userId
      },
      include: {
        produit: {
          include: {
            variantes: true,
            specifications: true,
            collection: true,
            assets: true
          }
        }
      }
    });

    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: 'Configuration non trouvée ou non autorisée'
      });
    }

    return res.status(200).json({
      success: true,
      data: configuration
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la configuration',
      errors: error
    });
  }
};

/**
 * Récupère toutes les configurations d'un produit spécifique pour l'utilisateur
 */
export const getConfigurationsForProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { produitId } = req.params;

    const configurations = await prisma.productConfiguration.findMany({
      where: {
        userId,
        produitId
      },
      include: {
        produit: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json({
      success: true,
      data: configurations
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des configurations du produit:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des configurations du produit',
      errors: error
    });
  }
};

/**
 * Crée une nouvelle configuration de produit
 */
export const createConfiguration = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { produitId, selectedVariants, options, calculatedPrice } = req.body;

    if (!produitId || !selectedVariants) {
      return res.status(400).json({
        success: false,
        message: 'Données de configuration incomplètes'
      });
    }

    // Vérifier si le produit existe
    const produit = await prisma.produit.findUnique({
      where: { id: produitId }
    });

    if (!produit) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    // Calculer le prix si non fourni
    let finalPrice = calculatedPrice;
    if (finalPrice === undefined) {
      // Logique de calcul de prix simplifiée - À adapter selon vos besoins
      finalPrice = produit.prix;
      
      // Parcourir les variantes sélectionnées et ajouter leurs prix
      if (Object.keys(selectedVariants).length > 0) {
        const variantIds = Object.values(selectedVariants);
        const variants = await prisma.variante.findMany({
          where: {
            id: {
              in: variantIds as string[]
            }
          }
        });
        
        for (const variant of variants) {
          if (variant.prix) {
            finalPrice += variant.prix;
          }
        }
      }
    }

    // Créer la configuration
    const configuration = await prisma.productConfiguration.create({
      data: {
        userId,
        produitId,
        selectedVariants,
        options: options || {},
        calculatedPrice: finalPrice
      },
      include: {
        produit: true
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Configuration créée avec succès',
      data: configuration
    });
  } catch (error) {
    console.error('Erreur lors de la création de la configuration:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la configuration',
      errors: error
    });
  }
};

/**
 * Met à jour une configuration existante
 */
export const updateConfiguration = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { id } = req.params;
    const { produitId, selectedVariants, options, calculatedPrice } = req.body;

    // Vérifier si la configuration appartient à l'utilisateur
    const existingConfig = await prisma.productConfiguration.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingConfig) {
      return res.status(404).json({
        success: false,
        message: 'Configuration non trouvée ou non autorisée'
      });
    }

    // Préparer les données de mise à jour
    const updateData: any = {};
    
    if (produitId !== undefined) {
      // Vérifier si le produit existe
      const produit = await prisma.produit.findUnique({
        where: { id: produitId }
      });

      if (!produit) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }
      
      updateData.produitId = produitId;
    }

    if (selectedVariants !== undefined) {
      updateData.selectedVariants = selectedVariants;
    }

    if (options !== undefined) {
      updateData.options = options;
    }

    if (calculatedPrice !== undefined) {
      updateData.calculatedPrice = calculatedPrice;
    } else if (updateData.produitId || updateData.selectedVariants) {
      // Si le produit ou les variantes ont changé mais pas le prix calculé,
      // nous devrions recalculer le prix
      const productId = updateData.produitId || existingConfig.produitId;
      const variants = updateData.selectedVariants || existingConfig.selectedVariants;
      
      const produit = await prisma.produit.findUnique({
        where: { id: productId }
      });
      
      if (!produit) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }
      
      // Logique de calcul de prix similaire à createConfiguration
      let finalPrice = produit.prix;
      
      if (Object.keys(variants).length > 0) {
        const variantIds = Object.values(variants);
        const variantsList = await prisma.variante.findMany({
          where: {
            id: {
              in: variantIds as string[]
            }
          }
        });
        
        for (const variant of variantsList) {
          if (variant.prix) {
            finalPrice += variant.prix;
          }
        }
      }
      
      updateData.calculatedPrice = finalPrice;
    }

    // Mettre à jour la configuration
    const updatedConfiguration = await prisma.productConfiguration.update({
      where: { id },
      data: updateData,
      include: {
        produit: true
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Configuration mise à jour avec succès',
      data: updatedConfiguration
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la configuration:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la configuration',
      errors: error
    });
  }
};

/**
 * Supprime une configuration
 */
export const deleteConfiguration = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { id } = req.params;

    // Vérifier si la configuration appartient à l'utilisateur
    const configuration = await prisma.productConfiguration.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: 'Configuration non trouvée ou non autorisée'
      });
    }

    // Supprimer la configuration
    await prisma.productConfiguration.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: 'Configuration supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la configuration:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la configuration',
      errors: error
    });
  }
};

/**
 * Calcule le prix pour une configuration donnée sans la sauvegarder
 */
export const calculatePrice = async (req: Request, res: Response) => {
  try {
    const { produitId, selectedVariants, options } = req.body;

    if (!produitId) {
      return res.status(400).json({
        success: false,
        message: 'ID de produit requis'
      });
    }

    // Récupérer le produit
    const produit = await prisma.produit.findUnique({
      where: { id: produitId }
    });

    if (!produit) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    // Prix de base
    let basePrice = produit.prix;
    const variantPrices: Record<string, number> = {};
    const optionPrices: Record<string, number> = {};
    let totalVariantPrice = 0;
    let totalOptionPrice = 0;

    // Calculer le prix des variantes
    if (selectedVariants && Object.keys(selectedVariants).length > 0) {
      const variantIds = Object.values(selectedVariants);
      const variants = await prisma.variante.findMany({
        where: {
          id: {
            in: variantIds as string[]
          }
        }
      });
      
      for (const variant of variants) {
        if (variant.prix) {
          variantPrices[variant.id] = variant.prix;
          totalVariantPrice += variant.prix;
        } else {
          variantPrices[variant.id] = 0;
        }
      }
    }

    // Calculer le prix des options (logique à adapter selon vos besoins)
    if (options) {
      // Exemple simple - à adapter selon votre modèle de données
      for (const [key, value] of Object.entries(options)) {
        let optionPrice = 0;
        
        // Exemple: si l'option est un "upgrade" et coûte un supplément
        if (key === 'upgrade' && value === true) {
          optionPrice = 10; // prix supplémentaire arbitraire
        }
        
        // Autre exemple pour d'autres types d'options
        if (key === 'personnalisation' && typeof value === 'string') {
          optionPrice = 15; // prix supplémentaire pour personnalisation
        }
        
        if (optionPrice > 0) {
          optionPrices[key] = optionPrice;
          totalOptionPrice += optionPrice;
        }
      }
    }

    // Calculer le prix total
    const totalPrice = basePrice + totalVariantPrice + totalOptionPrice;

    return res.status(200).json({
      success: true,
      data: {
        basePrice,
        variantPrices,
        optionPrices,
        totalPrice
      }
    });
  } catch (error) {
    console.error('Erreur lors du calcul du prix:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors du calcul du prix',
      errors: error
    });
  }
};
