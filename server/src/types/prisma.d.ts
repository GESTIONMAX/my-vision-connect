import { PrismaClient } from '@prisma/client'

declare global {
  namespace PrismaClient {
    export interface PrismaClient {
      collection: any;
      produit: any;
      variante: any;
      specification: any;
      asset: any;
      sportifCible: any;
      // Ajout des propriétés pour l'authentification
      user: any;
      profile: any;
      refreshToken: any;
      passwordReset: any;
    }
  }
}

export {};
