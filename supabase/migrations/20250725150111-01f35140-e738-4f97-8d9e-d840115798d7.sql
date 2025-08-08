-- Mise à jour des descriptions détaillées pour chaque produit

-- Music Shield Pro
UPDATE products SET 
  description = 'Lunettes intelligentes révolutionnaires combinant technologie électrochrome et audio intégré. S''adaptent automatiquement aux conditions lumineuses tout en offrant une qualité sonore exceptionnelle. Design aérodynamique ultra-léger pour cyclistes, coureurs et sportifs exigeants.',
  lens_technology = 'Verres électrochromes adaptatifs Cat. 0-3 • Bluetooth 5.2 • Audio haute définition',
  ecommerce_readiness = 'Monture TR90 ultra-léger 38g • Protection UV400 IPX4 • Audio directionnels + micro antibruit • Autonomie 10h audio + 72h teinte • Charge USB-C magnétique 90min • Compatible iOS/Android • Contrôles tactiles et vocaux • Garantie 2 ans • Étui rigide + câble + kit nettoyage inclus'
WHERE sku = 'MS-PRO-001';

-- Music Shield Sport
UPDATE products SET 
  description = 'Version renforcée pour sports extrêmes et conditions difficiles. Structure ultra-résistante, étanchéité IPX6 et audio à conduction osseuse premium. Adaptation instantanée du clair au foncé pour montagne, mer ou désert. Testées par des athlètes professionnels.',
  lens_technology = 'Verres électrochromes ultra-rapides • Structure renforcée • Audio à conduction osseuse',
  ecommerce_readiness = 'Poids 42g • Protection UV400 IPX6 étanche • Structure TR90 renforcé + titane • Audio conduction osseuse premium, isolation vent • Autonomie 8h audio + 96h teinte • Résistance -20°C à +60°C, chocs 10G • Certifications IP68, MIL-STD • Garantie 3 ans sport'
WHERE sku = 'MS-SPORT-001';

-- Shields Classic  
UPDATE products SET 
  description = 'Protection légendaire pour sports de glisse et outdoor. Verres polycarbonate ultra-résistants et design aérodynamique étudié en soufflerie. Monture flexible avec système anti-glissement breveté. Ventilation optimisée anti-buée. Le choix des professionnels.',
  lens_technology = 'Polycarbonate haute résistance • Traitement anti-buée permanent • Ventilation active',
  ecommerce_readiness = 'Polycarbonate optique classe 1 • Poids 29g • Protection UV400 catégorie 3 • Vision panoramique 180° • 6 ouvertures micro-perforées • Anti-buée DryTech permanent • Système GripTech anti-glissement • Branches réglables • Normes EN166, ANSI Z87.1'
WHERE sku = 'SH-CLASSIC-001';

-- Shields Elite
UPDATE products SET 
  description = 'Version premium pour athlètes d''élite. Traitement anti-buée révolutionnaire ClearVision. Verres photochromiques adaptatifs et monture fibre de carbone ultra-légère. Réglages micro-métriques personnalisés. Développées avec les équipes WorldTour.',
  lens_technology = 'Verres photochromiques adaptatifs • Anti-buée ClearVision • Fibre de carbone',
  ecommerce_readiness = 'Fibre de carbone + titane • Poids 24g • Photochromiques Cat. 1-3, transition 15s • Anti-buée ClearVision permanent • Vision panoramique 200° • 3 réglages micro-métriques • Coussinets hydrophiles • Certification WorldTour UCI • Garantie 5 ans pro'
WHERE sku = 'SH-ELITE-001';

-- Veil Urban
UPDATE products SET 
  description = 'Élégance discrète pour le quotidien urbain moderne. Style intemporel et protection optimale avec verres ultra-fins et monture minimaliste. Design unisexe sophistiqué. Verres polarisés haute définition réduisant l''éblouissement urbain.',
  lens_technology = 'Verres polarisés haute définition • Design minimaliste • Confort urbain',
  ecommerce_readiness = 'Style unisexe minimaliste • Acétate italien premium • Poids 31g • Verres polarisés HD anti-reflets • Protection UV400 + lumière bleue 15% • Forme rectangulaire équilibrée • 5 teintes exclusives • Étui cuir végétal artisanal • Assemblage France • Garantie 2 ans'
WHERE sku = 'VEIL-URB-001';

-- Dragon Connect
UPDATE products SET 
  description = 'Lunettes connectées nouvelle génération pour urbains avant-gardistes. Interface intuitive avec notifications discrètes, navigation GPS et contrôle musical. Design futuriste avec écran micro-OLED invisible et réalité augmentée contextuelle.',
  lens_technology = 'Smart Glass avec micro-OLED • Réalité augmentée • Connectivité 5G',
  ecommerce_readiness = 'Processeur Snapdragon XR2+ • Écran micro-OLED 0.5" invisible • Connectivité 5G, WiFi 6E, Bluetooth 5.3 • Capteurs IMU 9 axes, GPS • Audio spatial 360° • Autonomie 72h • Charge sans fil Qi + USB-C • 128GB stockage, 8GB RAM • Poids 49g'
WHERE sku = 'DRG-CONN-001';

-- Euphoria AR
UPDATE products SET 
  description = 'Révolution de la réalité augmentée avec technologie prismatique exclusive. Projettent des hologrammes ultra-réalistes dans votre champ de vision. Applications pro, gaming, éducation. Suivi oculaire précis et reconnaissance gestuelle.',
  lens_technology = 'Prismatique holographique • Suivi oculaire • Reconnaissance gestuelle avancée',
  ecommerce_readiness = 'Technologie prismatique holographique brevetée • Résolution 4K par œil (8K total) • Champ vision 50° diagonal • Latence <1ms prédictive • Suivi oculaire 120Hz, main 6DoF • Neural Engine dédiée • 16GB LPDDR5X • 512GB NVMe • 500+ applications'
WHERE sku = 'EUPH-AR-001';

-- Auria Vision
UPDATE products SET 
  description = 'Technologie prismatique de précision pour professionnels exigeants. Révèlent des détails invisibles à l''œil nu. Amélioration contrastes 300%, perception couleurs étendue, réduction fatigue oculaire. Calibrage personnalisé inclus.',
  lens_technology = 'Optique prismatique de précision • Calibrage personnalisé • Enhancement visuel',
  ecommerce_readiness = '47 prismes micro-métriques • Gamut 140% sRGB, 98% DCI-P3 • Contraste +300% • Fatigue -80% • Calibrage test vision 15min inclus • 12 profils métiers prédéfinis • Cristal optique grade laboratoire • Précision 0.001mm • Garantie à vie calibrage'
WHERE sku = 'AURIA-VIS-001';