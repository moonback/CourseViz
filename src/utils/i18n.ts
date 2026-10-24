export type Language = 'fr' | 'en';
export type UnitSystem = 'metric' | 'imperial'; // metric = meters & km/h, imperial = yards & mph

export interface I18nTranslations {
  // Navigation & Header
  appTitle: string;
  appSubtitle: string;
  roadmap: string;
  controls: string;
  home: string;
  switch2D: string;
  switch3D: string;
  language: string;
  units: string;
  meters: string;
  yards: string;
  kmh: string;
  mph: string;

  // Welcome Screen
  welcomeBadge: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  startExploring: string;
  courseOverview: string;
  quickStats: string;
  par: string;
  handicap: string;
  distance: string;
  elevationDrop: string;
  feature3D: string;
  feature3DDesc: string;
  featureCaddie: string;
  featureCaddieDesc: string;
  featureTrajectory: string;
  featureTrajectoryDesc: string;
  featurePractice: string;
  featurePracticeDesc: string;
  realGps: string;
  trueElevation: string;
  exploreHole: string;

  // Hole Selector
  hole: string;
  selectHole: string;

  // Shot Planner
  shotPlannerTitle: string;
  shotStrategy: string;
  attackBirdie: string;
  attackBirdieSubtitle: string;
  safePar: string;
  safeParSubtitle: string;
  shot1Tee: string;
  shot2Approach: string;
  shot3Putt: string;
  recommendedClub: string;
  changeClub: string;
  aimDistance: string;
  effectiveDistance: string;
  elevationEffect: string;
  windEffect: string;
  windCondition: string;
  windSpeed: string;
  windDirection: string;
  selectTee: string;
  startPractice: string;
  startPracticeDesc: string;
  activeTarget: string;
  dragTargetHint: string;
  uphill: string;
  downhill: string;
  flat: string;
  headwind: string;
  tailwind: string;
  crosswind: string;

  // Hole Info & Caddie Notes
  caddieIntelligence: string;
  caddieTitle: string;
  tabStrategy: string;
  tabElevation: string;
  tabHazards: string;
  tabHistory: string;
  caddieAdvice: string;
  viewElevationProfile: string;
  hazardsTitle: string;
  greenContourTitle: string;
  stimpMeter: string;
  slope: string;
  fallLine: string;
  highSide: string;
  lowSide: string;
  greenDimensions: string;
  dangerHigh: string;
  dangerMedium: string;
  dangerLow: string;

  // Practice Shot Studio
  practiceStudio: string;
  practiceSubtitle: string;
  shotPower: string;
  shotShape: string;
  hitShot: string;
  hitting: string;
  shapeStraight: string;
  shapeDraw: string;
  shapeFade: string;
  shapeHook: string;
  shapeSlice: string;
  shapeHeavyHook: string;
  shapeHeavySlice: string;
  carryDistance: string;
  rolloutDistance: string;
  totalDistance: string;
  dispersion: string;
  distanceToHole: string;
  resultLie: string;
  lieGreen: string;
  lieFairway: string;
  lieBunker: string;
  lieRough: string;
  lieOcean: string;
  lieOutOfBounds: string;
  lieHoled: string;
  nextShot: string;
  replayShot: string;
  retakeShot: string;
  resetHole: string;
  shotHistory: string;
  practiceRestricted: string;

  // Map Controls & Overlays
  mapOverlays: string;
  rings: string;
  flightArc: string;
  hazards: string;
  satellite: string;
  hybrid: string;
  terrain: string;
  controlsTitle: string;
  cameraPresets: string;
  presetTee: string;
  presetGreen: string;
  presetPin: string;
  presetFull: string;
  presetFlyover: string;

  // Roadmap Modal
  roadmapTitle: string;
  roadmapSubtitle: string;
  roadmapBadge: string;
  roadmapPhase1Title: string;
  roadmapPhase1Status: string;
  roadmapPhase2Title: string;
  roadmapPhase2Status: string;
  roadmapPhase3Title: string;
  roadmapPhase3Status: string;
  roadmapPhase4Title: string;
  roadmapPhase4Status: string;
  roadmapPhase5Title: string;
  roadmapPhase5Status: string;
  close: string;
}

export const translations: Record<Language, I18nTranslations> = {
  fr: {
    appTitle: 'CourseViz',
    appSubtitle: 'Visualisation Tactique & 3D Photoréaliste de Golf',
    roadmap: 'Feuille de Route',
    controls: 'Commandes',
    home: 'Accueil',
    switch2D: 'Vue 2D',
    switch3D: 'Vue 3D',
    language: 'Langue',
    units: 'Unités',
    meters: 'mètres',
    yards: 'yards',
    kmh: 'km/h',
    mph: 'mph',

    welcomeBadge: 'CARTOGRAPHIE SATELLITE HAUTE PRÉCISION & 3D PHOTORÉALISTE',
    welcomeTitle: 'Explorez & Planifiez Chaque Coup sur les Trous Mythiques',
    welcomeSubtitle:
      'Analysez la topographie au centimètre près, anticipez les rafales de vent côtier, visualisez la trajectoire balistique et entraînez-vous sur les trous les plus légendaires du monde.',
    startExploring: 'Lancer l’Exploration Tactique',
    courseOverview: 'Vue d’Ensemble du Parcours',
    quickStats: 'Caractéristiques du Trou',
    par: 'Par',
    handicap: 'Handicap',
    distance: 'Distance',
    elevationDrop: 'Dénivelé',
    feature3D: 'Modélisation 3D Photoréaliste',
    feature3DDesc: 'Google 3D Tiles avec contrôle total de la caméra (orbite, inclinaison et altitude).',
    featureCaddie: 'Notes de Caddie Stratégiques',
    featureCaddieDesc: 'Conseils professionnels sur la lecture des pentes, les zones de sécurité et le choix des clubs.',
    featureTrajectory: 'Balistique & Vent Réalistes',
    featureTrajectoryDesc: 'Calcul vectoriel de portance, dérive au vent et correction d’altitude selon votre club.',
    featurePractice: 'Simulateur de Coup Virtuel',
    featurePracticeDesc: 'Ajustez votre puissance et vos effets (draw, fade) et observez le résultat d’atterrissage en direct.',
    realGps: 'Coordonnées GPS Réelles',
    trueElevation: 'Profils Topographiques Réels',
    exploreHole: 'Explorer ce Trou',

    hole: 'Trou',
    selectHole: 'Sélectionner un trou',

    shotPlannerTitle: 'Planificateur de Coup',
    shotStrategy: 'Stratégie de Jeu',
    attackBirdie: 'Attaque Directe (Birdie)',
    attackBirdieSubtitle: 'Tee -> Green en 1 coup + Putt',
    safePar: 'Gestion Tactique (Sauvetage Par)',
    safeParSubtitle: 'Layup sécurisé en avant du green + Pitch & Putt',
    shot1Tee: 'Coup 1: Du Départ',
    shot2Approach: 'Coup 2: Approche / Putt',
    shot3Putt: 'Coup 3: Finition Putt',
    recommendedClub: 'Club Recommandé',
    changeClub: 'Changer de club',
    aimDistance: 'Distance Visée',
    effectiveDistance: 'Distance Réelle Jouée',
    elevationEffect: 'Effet de Pente',
    windEffect: 'Effet du Vent',
    windCondition: 'Conditions Météo (Vent)',
    windSpeed: 'Vitesse du Vent',
    windDirection: 'Direction du Vent',
    selectTee: 'Repère de Départ',
    startPractice: 'Studio d’Entraînement',
    startPracticeDesc: 'Taper ce coup dans le simulateur balistique 2D',
    activeTarget: 'Cible Active',
    dragTargetHint: 'Déplacez la cible sur la carte pour adapter votre visée',
    uphill: 'Montée',
    downhill: 'Descente',
    flat: 'Plat',
    headwind: 'Vent de face',
    tailwind: 'Vent arrière',
    crosswind: 'Vent de travers',

    caddieIntelligence: 'Intelligence du Parcours',
    caddieTitle: 'Stratégie & Carnet de Caddie',
    tabStrategy: 'Stratégie',
    tabElevation: 'Dénivelé',
    tabHazards: 'Obstacles',
    tabHistory: 'Histoire',
    caddieAdvice: 'Conseil du Caddie Pro',
    viewElevationProfile: 'Profil Topographique',
    hazardsTitle: 'Obstacles & Zones de Danger',
    greenContourTitle: 'Pentes & Lecture du Green',
    stimpMeter: 'Vitesse Stimpmeter',
    slope: 'Pente Moyenne',
    fallLine: 'Ligne de Rupture',
    highSide: 'Point Haut',
    lowSide: 'Point Bas',
    greenDimensions: 'Dimensions du Green',
    dangerHigh: 'Danger Élevé',
    dangerMedium: 'Danger Modéré',
    dangerLow: 'Zone Sécurisée',

    practiceStudio: 'Studio d’Entraînement',
    practiceSubtitle: 'Simulateur de Trajectoire Balistique',
    shotPower: 'Puissance du Swing',
    shotShape: 'Effet / Trajectoire',
    hitShot: 'Taper le Coup',
    hitting: 'Frappe en cours...',
    shapeStraight: 'Droit (Neutre)',
    shapeDraw: 'Draw (Léger)',
    shapeFade: 'Fade (Léger)',
    shapeHook: 'Hook (Prononcé)',
    shapeSlice: 'Slice (Prononcé)',
    shapeHeavyHook: 'Grand Hook',
    shapeHeavySlice: 'Grand Slice',
    carryDistance: 'Distance de Vol (Carry)',
    rolloutDistance: 'Roulement au Sol',
    totalDistance: 'Distance Totale',
    dispersion: 'Dispersion Latérale',
    distanceToHole: 'Distance au Drapeau',
    resultLie: 'Emplacement de la Balle',
    lieGreen: 'Sur le Green',
    lieFairway: 'Sur le Fairway',
    lieBunker: 'Dans le Bunker',
    lieRough: 'Dans le Rough',
    lieOcean: 'Dans l’Océan / Obstacle d’Eau',
    lieOutOfBounds: 'Hors Limites (OB)',
    lieHoled: 'Rentré ! Coup Parfait',
    nextShot: 'Jouer le Coup Suivant',
    replayShot: 'Rejouer ce Coup',
    retakeShot: 'Rejouer du Point Initial',
    resetHole: 'Réinitialiser le Trou',
    shotHistory: 'Historique des Coups',
    practiceRestricted: 'Le studio d’entraînement est optimisé pour les écrans larges (bureau / tablette).',

    mapOverlays: 'Calques de Carte',
    rings: 'Anneaux de distance',
    flightArc: 'Arc de trajectoire',
    hazards: 'Obstacles & Dangers',
    satellite: 'Satellite',
    hybrid: 'Hybride',
    terrain: 'Relief',
    controlsTitle: 'Guide des Commandes & Navigation',
    cameraPresets: 'Vues Caméra Prédéfinies',
    presetTee: 'Vue du Départ (Tee)',
    presetGreen: 'Vue du Green',
    presetPin: 'Gros plan Drapeau',
    presetFull: 'Vue d’Ensemble du Trou',
    presetFlyover: 'Survol Dynamique',

    roadmapTitle: 'Feuille de Route du Projet CourseViz',
    roadmapSubtitle: 'Vision stratégique, innovations technologiques et étapes d’évolution',
    roadmapBadge: 'PLAN D’ÉVOLUTION PRODUIT',
    roadmapPhase1Title: 'Phase 1 : Internationalisation, Métrique & Parcours Mythiques',
    roadmapPhase1Status: 'Terminé / Actif',
    roadmapPhase2Title: 'Phase 2 : Caddie IA Génératif Multimodal avec Gemini',
    roadmapPhase2Status: 'En cours de déploiement',
    roadmapPhase3Title: 'Phase 3 : Carnet de Parcours & Scorecard GPS Temps Réel',
    roadmapPhase3Status: 'Prochaine étape',
    roadmapPhase4Title: 'Phase 4 : Survol 3D Drone & Heatmaps LiDAR des Greens',
    roadmapPhase4Status: 'Planifié',
    roadmapPhase5Title: 'Phase 5 : PWA Hors-Ligne & Export PDF de Carnet de Parcours',
    roadmapPhase5Status: 'Planifié',
    close: 'Fermer',
  },
  en: {
    appTitle: 'CourseViz',
    appSubtitle: 'Tactical Satellite & Photorealistic 3D Golf Visualizer',
    roadmap: 'Roadmap',
    controls: 'Controls',
    home: 'Home',
    switch2D: '2D View',
    switch3D: '3D View',
    language: 'Language',
    units: 'Units',
    meters: 'meters',
    yards: 'yards',
    kmh: 'km/h',
    mph: 'mph',

    welcomeBadge: 'HIGH-PRECISION SATELLITE & PHOTOREALISTIC 3D MAPPING',
    welcomeTitle: 'Explore & Plan Every Shot on Championship Golf Holes',
    welcomeSubtitle:
      'Analyze elevation down to the inch, anticipate coastal wind gusts, visualize ballistic trajectory, and practice on the most legendary golf holes in the world.',
    startExploring: 'Launch Tactical Exploration',
    courseOverview: 'Course Overview',
    quickStats: 'Hole Characteristics',
    par: 'Par',
    handicap: 'Handicap',
    distance: 'Distance',
    elevationDrop: 'Elevation Drop',
    feature3D: 'Photorealistic 3D Modeling',
    feature3DDesc: 'Google 3D Tiles with full orbit, tilt, and altitude camera control.',
    featureCaddie: 'Strategic Caddie Notes',
    featureCaddieDesc: 'Pro insights on green breaks, safe bailouts, and club selection.',
    featureTrajectory: 'True Ballistics & Wind',
    featureTrajectoryDesc: 'Vector calculations of carry, aerodynamic drift, and elevation adjustments.',
    featurePractice: 'Virtual Practice Simulator',
    featurePracticeDesc: 'Tune swing power and shape (draw, fade) and watch real landing physics.',
    realGps: 'Real GPS Pinpoints',
    trueElevation: 'True Elevation Profiles',
    exploreHole: 'Explore this Hole',

    hole: 'Hole',
    selectHole: 'Select a hole',

    shotPlannerTitle: 'Shot Planner',
    shotStrategy: 'Playing Strategy',
    attackBirdie: 'Direct Attack (Birdie)',
    attackBirdieSubtitle: 'Tee -> Green in 1 + Birdie Putt',
    safePar: 'Tactical Management (Par Save)',
    safeParSubtitle: 'Safe fairway layup short of green + Pitch & Putt',
    shot1Tee: 'Shot 1: From Tee',
    shot2Approach: 'Shot 2: Approach / Putt',
    shot3Putt: 'Shot 3: Hole Out Putt',
    recommendedClub: 'Recommended Club',
    changeClub: 'Change Club',
    aimDistance: 'Aimed Distance',
    effectiveDistance: 'Plays-Like Distance',
    elevationEffect: 'Elevation Effect',
    windEffect: 'Wind Effect',
    windCondition: 'Wind Conditions',
    windSpeed: 'Wind Speed',
    windDirection: 'Wind Direction',
    selectTee: 'Tee Box',
    startPractice: 'Practice Studio',
    startPracticeDesc: 'Hit this shot in the 2D ballistic simulator',
    activeTarget: 'Active Target',
    dragTargetHint: 'Drag target on the map to re-aim your shot',
    uphill: 'Uphill',
    downhill: 'Downhill',
    flat: 'Flat',
    headwind: 'Headwind',
    tailwind: 'Tailwind',
    crosswind: 'Crosswind',

    caddieIntelligence: 'Course Intelligence',
    caddieTitle: 'Caddie Notes & Strategy',
    tabStrategy: 'Strategy',
    tabElevation: 'Elevation',
    tabHazards: 'Hazards',
    tabHistory: 'History',
    caddieAdvice: 'Pro Caddie Advice',
    viewElevationProfile: 'Topographic Profile',
    hazardsTitle: 'Hazards & Danger Zones',
    greenContourTitle: 'Green Contours & Slope',
    stimpMeter: 'Stimpmeter Speed',
    slope: 'Average Slope',
    fallLine: 'Fall Line',
    highSide: 'High Side',
    lowSide: 'Low Side',
    greenDimensions: 'Green Dimensions',
    dangerHigh: 'High Danger',
    dangerMedium: 'Moderate Danger',
    dangerLow: 'Safe Zone',

    practiceStudio: 'Practice Studio',
    practiceSubtitle: 'Ballistic Trajectory Simulator',
    shotPower: 'Swing Power',
    shotShape: 'Shot Shape',
    hitShot: 'Hit Shot',
    hitting: 'Hitting shot...',
    shapeStraight: 'Straight',
    shapeDraw: 'Draw',
    shapeFade: 'Fade',
    shapeHook: 'Hook',
    shapeSlice: 'Slice',
    shapeHeavyHook: 'Heavy Hook',
    shapeHeavySlice: 'Heavy Slice',
    carryDistance: 'Carry Distance',
    rolloutDistance: 'Ground Rollout',
    totalDistance: 'Total Distance',
    dispersion: 'Lateral Dispersion',
    distanceToHole: 'Distance to Pin',
    resultLie: 'Ball Lie Verdict',
    lieGreen: 'On the Green',
    lieFairway: 'On the Fairway',
    lieBunker: 'In the Bunker',
    lieRough: 'In the Rough',
    lieOcean: 'In the Ocean / Water Hazard',
    lieOutOfBounds: 'Out of Bounds (OB)',
    lieHoled: 'In the Cup! Perfect Shot',
    nextShot: 'Play Next Shot',
    replayShot: 'Replay Shot',
    retakeShot: 'Retake Shot',
    resetHole: 'Reset Hole',
    shotHistory: 'Shot History',
    practiceRestricted: 'Practice Studio is optimized for wide screens (desktop / tablet).',

    mapOverlays: 'Map Overlays',
    rings: 'Distance Rings',
    flightArc: 'Flight Arc',
    hazards: 'Hazards & Dangers',
    satellite: 'Satellite',
    hybrid: 'Hybrid',
    terrain: 'Terrain',
    controlsTitle: 'Controls & Navigation Guide',
    cameraPresets: 'Camera Presets',
    presetTee: 'Tee Box View',
    presetGreen: 'Green View',
    presetPin: 'Flag Pin Close-up',
    presetFull: 'Full Hole Overview',
    presetFlyover: 'Dynamic Flyover',

    roadmapTitle: 'CourseViz Project Roadmap',
    roadmapSubtitle: 'Strategic vision, technological innovations, and evolution milestones',
    roadmapBadge: 'PRODUCT EVOLUTION PLAN',
    roadmapPhase1Title: 'Phase 1: Internationalization, Metrics & Championship Holes',
    roadmapPhase1Status: 'Completed / Active',
    roadmapPhase2Title: 'Phase 2: Multimodal Generative AI Caddie with Gemini',
    roadmapPhase2Status: 'In progress',
    roadmapPhase3Title: 'Phase 3: Digital Yardage Book & Real-Time GPS Scorecard',
    roadmapPhase3Status: 'Next milestone',
    roadmapPhase4Title: 'Phase 4: 3D Drone Flyovers & LiDAR Green Heatmaps',
    roadmapPhase4Status: 'Planned',
    roadmapPhase5Title: 'Phase 5: Offline PWA & Pro Tour PDF Yardage Book Export',
    roadmapPhase5Status: 'Planned',
    close: 'Close',
  },
};

/**
 * Format distance according to selected unit system
 */
export function formatDistance(yards: number, unitSystem: UnitSystem | string = 'metric'): string {
  if (unitSystem === 'metric') {
    const meters = Math.round(yards * 0.9144);
    return `${meters} m`;
  }
  return `${Math.round(yards)} yds`;
}

/**
 * Format feet to meters/feet
 */
export function formatFeet(feet: number, unitSystem: UnitSystem | string = 'metric'): string {
  if (unitSystem === 'metric') {
    const meters = (feet * 0.3048).toFixed(1);
    return `${meters} m`;
  }
  return `${Math.round(feet)} ft`;
}

/**
 * Format wind speed
 */
export function formatWindSpeed(mph: number, unitSystem: UnitSystem | string = 'metric'): string {
  if (unitSystem === 'metric') {
    const kmh = Math.round(mph * 1.60934);
    return `${kmh} km/h`;
  }
  return `${Math.round(mph)} mph`;
}
