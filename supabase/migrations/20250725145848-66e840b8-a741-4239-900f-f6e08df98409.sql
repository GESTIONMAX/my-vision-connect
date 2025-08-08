-- Mise à jour des descriptions et informations détaillées pour chaque produit

-- Music Shield Pro
UPDATE products SET 
  description = 'Les lunettes Music Shield Pro révolutionnent l''expérience sportive en combinant technologie électrochrome avancée et audio intégré de qualité studio. Conçues pour les cyclistes, coureurs et sportifs exigeants, elles s''adaptent automatiquement aux conditions lumineuses tout en offrant une qualité sonore exceptionnelle. Le design aérodynamique et les matériaux ultra-légers garantissent un confort optimal lors d''efforts prolongés. Parfaites pour les entraînements matinaux, les sorties longues et les compétitions.',
  lens_technology = 'Verres électrochromes adaptatifs Cat. 0-3, Bluetooth 5.2, Audio haute définition',
  ecommerce_readiness = 'Spécifications complètes - Matériaux: Monture TR90 ultra-léger (38g) - Protection: UV400 100%, IPX4 - Audio: Haut-parleurs directionnels, microphone antibruit - Autonomie: 10h audio + 72h teinte - Charge: USB-C magnétique 90min - Compatibilité: iOS/Android - Contrôles: Tactiles et vocaux - Certification: CE, FCC - Garantie: 2 ans - Accessoires: Étui rigide, câble charge, kit nettoyage'
WHERE sku = 'MS-PRO-001';

-- Music Shield Sport
UPDATE products SET 
  description = 'Version renforcée des Music Shield conçue pour les sports extrêmes et conditions difficiles. Structure ultra-résistante aux chocs, étanchéité renforcée IPX6 et audio premium pour les aventuriers. Les verres électrochromes s''adaptent instantanément du clair au foncé pour une protection optimale en montagne, mer ou désert. Système audio à conduction osseuse pour rester connecté à l''environnement tout en profitant de votre musique. Testées par des athlètes professionnels.',
  lens_technology = 'Verres électrochromes ultra-rapides, Structure renforcée, Audio à conduction osseuse',
  ecommerce_readiness = 'Spécifications renforcées - Poids: 42g - Protection: UV400, IPX6 étanche - Structure: TR90 renforcé + titane - Audio: Conduction osseuse premium, isolation vent - Autonomie: 8h audio + 96h teinte - Température: -20°C à +60°C - Résistance: Chocs 10G, rayures - Certification: IP68, MIL-STD - Sport: Alpinisme, nautisme, trail - Garantie: 3 ans sport'
WHERE sku = 'MS-SPORT-001';

-- Shields Classic  
UPDATE products SET 
  description = 'Protection légendaire pour les sports de glisse et activités outdoor. Les Shields Classic offrent une protection maximale grâce à leurs verres polycarbonate ultra-résistants et leur design aérodynamique étudié en soufflerie. Monture flexible qui s''adapte parfaitement à tous les visages avec un système anti-glissement breveté. Ventilation optimisée pour éviter la buée même lors d''efforts intenses. Le choix des professionnels du cyclisme, running et sports mécaniques.',
  lens_technology = 'Polycarbonate haute résistance, Traitement anti-buée permanent, Ventilation active',
  ecommerce_readiness = 'Spécifications techniques - Matériau: Polycarbonate optique classe 1 - Poids: 29g - Protection: UV400, catégorie 3 - Forme: Panoramique 180° - Ventilation: 6 ouvertures micro-perforées - Anti-buée: Traitement permanent DryTech - Fixation: Système GripTech anti-glissement - Branches: Réglables, embouts caoutchouc - Norme: EN166, ANSI Z87.1 - Usage: Cyclisme, running, moto'
WHERE sku = 'SH-CLASSIC-001';

-- Shields Elite
UPDATE products SET 
  description = 'Version premium des Shields avec technologies avancées pour les athlètes d''élite. Traitement anti-buée révolutionnaire ClearVision qui élimine totalement la condensation, même par temps humide et effort intense. Verres photochromiques qui s''adaptent automatiquement à la luminosité pour un confort visuel parfait. Monture en fibre de carbone ultra-légère avec réglages micro-métriques pour un ajustement personnalisé. Développées avec les équipes cyclistes WorldTour.',
  lens_technology = 'Verres photochromiques adaptatifs, Anti-buée ClearVision, Fibre de carbone',
  ecommerce_readiness = 'Spécifications Elite - Matériau: Fibre de carbone + titane - Poids: 24g - Verres: Photochromiques Cat. 1-3 - Transition: 15 secondes - Anti-buée: ClearVision permanent - Champ vision: 200° panoramique - Réglages: 3 points micro-métriques - Coussinets: Hydrophiles réglables - Certification: WorldTour UCI - Garantie: 5 ans pro - Édition: Limitée 500 exemplaires'
WHERE sku = 'SH-ELITE-001';

-- Veil Urban
UPDATE products SET 
  description = 'Élégance discrète pour le quotidien urbain moderne. Les Veil Urban allient style intemporel et protection optimale avec leurs verres ultra-fins et leur monture minimaliste. Design unisexe sophistiqué qui s''harmonise avec tous les styles vestimentaires. Verres polarisés haute définition qui réduisent l''éblouissement urbain et améliorent les contrastes. Parfaites pour les trajets quotidiens, terrasses de café et balades en ville. Confort de port exceptionnel pour une utilisation prolongée.',
  lens_technology = 'Verres polarisés haute définition, Design minimaliste, Confort urbain',
  ecommerce_readiness = 'Spécifications Urban - Style: Unisexe minimaliste - Matériau: Acétate italien premium - Poids: 31g - Verres: Polarisés HD, anti-reflets - Protection: UV400, lumière bleue 15% - Forme: Rectangulaire équilibrée - Couleurs: 5 teintes exclusives - Étui: Cuir végétal artisanal - Nettoyage: Tissu microfibre premium - Origine: Assemblage France - Garantie: 2 ans style'
WHERE sku = 'VEIL-URB-001';

-- Dragon Connect
UPDATE products SET 
  description = 'Lunettes connectées nouvelle génération pour les urbains avant-gardistes. Interface intuitive avec notifications discrètes, navigation GPS et contrôle musical sans sortir le smartphone. Design audacieux aux lignes futuristes qui affirme votre personnalité tech. Écran micro-OLED invisible intégré aux verres avec réalité augmentée contextuelle. Batterie longue durée et charge sans fil pour une autonomie de 3 jours. L''accessoire indispensable de la ville connectée.',
  lens_technology = 'Smart Glass avec micro-OLED, Réalité augmentée, Connectivité 5G',
  ecommerce_readiness = 'Spécifications Tech - Processeur: Snapdragon XR2+ - Écran: micro-OLED 0.5" invisible - Connectivité: 5G, WiFi 6E, Bluetooth 5.3 - Capteurs: IMU 9 axes, GPS, luminosité - Audio: Spatial 360°, réduction bruit - Autonomie: 72h usage normal - Charge: Sans fil Qi + USB-C - Apps: Navigation, musique, notifications - OS: DragonOS basé Android - Stockage: 128GB - RAM: 8GB - Poids: 49g'
WHERE sku = 'DRG-CONN-001';

-- Euphoria AR
UPDATE products SET 
  description = 'Révolution de la réalité augmentée avec la technologie prismatique exclusive. Les Euphoria AR projettent des hologrammes ultra-réalistes dans votre champ de vision pour une expérience immersive inégalée. Applications professionnelles, gaming, éducation et divertissement convergent dans un seul dispositif révolutionnaire. Suivi oculaire précis et reconnaissance gestuelle pour une interaction naturelle. Partenariats avec les plus grands créateurs de contenu AR pour un écosystème riche.',
  lens_technology = 'Prismatique holographique, Suivi oculaire, Reconnaissance gestuelle avancée',
  ecommerce_readiness = 'Spécifications AR - Technologie: Prismatique holographique brevetée - Résolution: 4K par œil (8K total) - Champ vision: 50° diagonal - Latence: <1ms (prédictive) - Suivi: Oculaire 120Hz, main 6DoF - Processeur: Neural Engine dédiée - Mémoire: 16GB LPDDR5X - Stockage: 512GB NVMe - Refroidissement: Dissipation passive - Écosystème: 500+ applications - Prix: Early adopter exclusif'
WHERE sku = 'EUPH-AR-001';

-- Auria Vision
UPDATE products SET 
  description = 'Technologie prismatique de précision pour professionnels exigeants. Les Auria Vision révèlent des détails invisibles à l''œil nu grâce à leur système optique révolutionnaire qui décompose et recompose la lumière. Amélioration des contrastes de 300%, perception des couleurs étendue et réduction de la fatigue oculaire. Essentielles pour photographes, designers, artistes et tous les métiers visuels. Calibrage personnalisé selon votre vision pour une expérience sur-mesure.',
  lens_technology = 'Optique prismatique de précision, Calibrage personnalisé, Enhancement visuel',
  ecommerce_readiness = 'Spécifications Vision - Optique: 47 prismes micro-métriques - Gamut: 140% sRGB, 98% DCI-P3 - Contraste: +300% amélioration - Fatigue: -80% réduction prouvée - Calibrage: Test vision 15min inclus - Profils: 12 métiers prédéfinis - Matériau: Cristal optique grade laboratoire - Précision: 0.001mm assemblage - Certification: Professionnels agréés - Formation: Masterclass incluse - Garantie: À vie calibrage'
WHERE sku = 'AURIA-VIS-001';