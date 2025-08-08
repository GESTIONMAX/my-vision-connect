import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EnhancedProductDescriptionProps {
  product: {
    name: string;
    description: string;
    lens_technology?: string;
    category?: string;
    collection: string;
  };
}

export const EnhancedProductDescription = ({ product }: EnhancedProductDescriptionProps) => {
  // Déterminer les tags/badges basés sur le produit
  const getProductTags = () => {
    const tags = [];
    
    if (product.name.toLowerCase().includes('music shield')) {
      tags.push({ label: 'Audio Intégré', color: 'bg-blue-500' });
      tags.push({ label: 'Électrochrome', color: 'bg-purple-500' });
    }
    
    if (product.name.toLowerCase().includes('shields')) {
      tags.push({ label: 'Sport Extrême', color: 'bg-orange-500' });
      tags.push({ label: 'Anti-buée', color: 'bg-green-500' });
    }
    
    if (product.name.toLowerCase().includes('elite')) {
      tags.push({ label: 'Premium', color: 'bg-gold-500' });
      tags.push({ label: 'Fibre Carbone', color: 'bg-gray-700' });
    }
    
    if (product.name.toLowerCase().includes('veil')) {
      tags.push({ label: 'Urban Style', color: 'bg-indigo-500' });
      tags.push({ label: 'Polarisé', color: 'bg-teal-500' });
    }
    
    if (product.name.toLowerCase().includes('dragon')) {
      tags.push({ label: 'Smart Glass', color: 'bg-cyan-500' });
      tags.push({ label: '5G Ready', color: 'bg-red-500' });
    }
    
    if (product.name.toLowerCase().includes('euphoria')) {
      tags.push({ label: 'Réalité Augmentée', color: 'bg-pink-500' });
      tags.push({ label: 'Holographique', color: 'bg-violet-500' });
    }
    
    if (product.name.toLowerCase().includes('auria')) {
      tags.push({ label: 'Prismatique', color: 'bg-amber-500' });
      tags.push({ label: 'Professionnel', color: 'bg-slate-600' });
    }
    
    return tags;
  };

  const tags = getProductTags();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Description du produit</CardTitle>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, index) => (
                <Badge key={index} className={`${tag.color} text-white`}>
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Description principale */}
            <div className="prose prose-gray max-w-none dark:prose-invert">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Technologie des verres */}
            {product.lens_technology && (
              <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                <h4 className="font-semibold text-foreground mb-2">
                  Technologie des verres
                </h4>
                <p className="text-sm text-muted-foreground">
                  {product.lens_technology}
                </p>
              </div>
            )}

            {/* Points clés du produit */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Points forts :</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.name.toLowerCase().includes('music shield') && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Audio haute définition intégré
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Adaptation automatique à la luminosité
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Contrôles tactiles et vocaux
                      </li>
                    </>
                  )}
                  
                  {product.name.toLowerCase().includes('shields') && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Protection maximale sports extrêmes
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Design aérodynamique testé
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Ventilation anti-buée optimisée
                      </li>
                    </>
                  )}
                  
                  {product.name.toLowerCase().includes('veil') && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Style urbain minimaliste
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Verres polarisés HD
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Confort prolongé quotidien
                      </li>
                    </>
                  )}
                  
                  {product.name.toLowerCase().includes('dragon') && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Écran micro-OLED invisible
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Connectivité 5G avancée
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Interface intuitive AR
                      </li>
                    </>
                  )}
                  
                  {(product.name.toLowerCase().includes('euphoria') || product.name.toLowerCase().includes('auria')) && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Technologie prismatique révolutionnaire
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Amélioration vision professionnelle
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Calibrage personnalisé inclus
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Applications :</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.collection === 'sport' && (
                    <>
                      <li>• Cyclisme professionnel et amateur</li>
                      <li>• Running et trail</li>
                      <li>• Sports mécaniques</li>
                      <li>• Alpinisme et outdoor</li>
                    </>
                  )}
                  
                  {product.collection === 'lifestyle' && (
                    <>
                      <li>• Trajets quotidiens urbains</li>
                      <li>• Terrasses et espaces extérieurs</li>
                      <li>• Travail et déplacements pro</li>
                      <li>• Loisirs et sorties sociales</li>
                    </>
                  )}
                  
                  {product.collection === 'prismatic' && (
                    <>
                      <li>• Photographie professionnelle</li>
                      <li>• Design et création visuelle</li>
                      <li>• Médical et scientifique</li>
                      <li>• Architecture et ingénierie</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};