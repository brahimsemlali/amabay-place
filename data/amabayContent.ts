export type ContentItem = {
  title?: string;
  value?: string;
  text?: string;
};

export type ContentSection = {
  number: string;
  id: string;
  title: string;
  paragraphs?: string[];
  items?: ContentItem[];
  statement?: string;
};

export const heroContent = {
  title: "PLUS QU’UN LIEU. UNE DESTINATION.",
  introduction:
    "AMABAY PLACE réunit maison, design, lifestyle, restauration, services et nouvelles expériences au sein d’une destination pensée pour le quotidien d’aujourd’hui.",
  signature: "HOME. LIFE. STYLE. ALL IN ONE PLACE.",
  location:
    "Situé sur l’un des axes majeurs de Casablanca, AMABAY PLACE propose une nouvelle manière de découvrir, choisir, se rencontrer et vivre.",
  ctas: ["Découvrir AMABAY PLACE", "Explorer les espaces"],
} as const;

export const contentSections: ContentSection[] = [
  {
    number: "02",
    id: "introduction",
    title: "LÀ OÙ LA VIE PREND FORME.",
    paragraphs: [
      "AMABAY PLACE a été imaginé comme bien plus qu’un simple regroupement de commerces.",
      "C’est un écosystème où les enseignes, les services, les espaces de vie et les expériences se complètent pour créer une destination cohérente, attractive et vivante.",
      "Un lieu conçu pour accompagner les visiteurs dans différents moments de leur journée : découvrir, comparer, acheter, travailler, se restaurer, se retrouver ou simplement prendre le temps.",
    ],
  },
  {
    number: "03",
    id: "vision",
    title: "UNE NOUVELLE FAÇON DE PENSER LE RETAIL.",
    paragraphs: [
      "Le commerce évolue.",
      "AMABAY PLACE aussi.",
      "Le projet dépasse la logique traditionnelle du centre commercial pour proposer une destination orientée autour de la maison, du lifestyle, du design, de la technologie, des services et de l’expérience client.",
      "Chaque espace participe à une vision commune :",
    ],
    statement: "Créer un lieu utile, inspirant et naturellement intégré dans la vie de ses visiteurs.",
  },
  {
    number: "04",
    id: "home-life-style",
    title: "HOME. LIFE. STYLE.",
    paragraphs: ["Trois mots qui définissent l’univers AMABAY PLACE."],
    items: [
      { title: "HOME", text: "Des solutions pour construire, aménager, équiper et transformer les espaces de vie." },
      { title: "LIFE", text: "Des services et expériences pensés autour du quotidien." },
      { title: "STYLE", text: "Design, décoration, tendances et nouvelles inspirations." },
    ],
    statement: "Tout ce qui compose un mode de vie moderne, réuni en un seul lieu.",
  },
  {
    number: "05",
    id: "location",
    title: "AU CŒUR D’UN CASABLANCA EN MOUVEMENT.",
    paragraphs: [
      "AMABAY PLACE bénéficie d’une implantation stratégique sur l’Avenue Mohammed VI, Km 9 – Route de Médiouna, Casablanca.",
      "Un emplacement connecté aux grands pôles résidentiels, économiques et commerciaux de la métropole.",
      "Sa position permet au projet de bénéficier à la fois de la dynamique de Casablanca et du développement rapide de sa périphérie.",
    ],
    statement: "VISIBLE. ACCESSIBLE. CONNECTÉ.",
  },
  {
    number: "06",
    id: "accessibility",
    title: "À QUELQUES MINUTES DE L’ESSENTIEL.",
    paragraphs: [
      "La localisation d’AMABAY PLACE permet de connecter rapidement la destination aux principaux pôles du Grand Casablanca et aux villes environnantes.",
    ],
    items: [
      { value: "≈ 15 MIN", text: "Casablanca et Sidi Maârouf" },
      { value: "≈ 30 MIN", text: "Aéroport International Mohammed V" },
      { value: "≈ 45 MIN", text: "Bouznika et une large partie du bassin Casablanca–Mohammedia" },
      { value: "≈ 50 MIN", text: "Settat" },
      { value: "≈ 60 MIN", text: "Rabat" },
    ],
    statement: "Une destination pensée à l’échelle du Grand Casablanca.",
  },
  {
    number: "07",
    id: "catchment",
    title: "AU CENTRE D’UN BASSIN DE VIE MAJEUR.",
    paragraphs: [
      "AMABAY PLACE s’inscrit dans l’une des zones urbaines les plus importantes du Maroc.",
      "Une implantation capable d’attirer une clientèle locale, métropolitaine et régionale.",
    ],
    items: [
      { value: "5,2 MILLIONS", text: "d’habitants à moins de 45 minutes du centre." },
      {
        value: "8+ MILLIONS",
        text: "d’habitants dans une zone d’influence élargie intégrant Casablanca, Mohammedia, Rabat et les villes environnantes.",
      },
    ],
  },
  {
    number: "08",
    id: "visibility",
    title: "UNE VISIBILITÉ QUI FAIT LA DIFFÉRENCE.",
    paragraphs: [
      "Être accessible est essentiel.",
      "Être visible l’est tout autant.",
      "AMABAY PLACE profite d’une implantation directement connectée aux principaux flux routiers de la région.",
      "La façade, la présence architecturale du bâtiment et son implantation sur un axe fortement fréquenté offrent aux enseignes une exposition particulièrement intéressante.",
    ],
    items: [{ value: "34 673 VÉHICULES / JOUR", text: "sur l’Avenue Mohammed VI." }],
    statement: "Un emplacement qui transforme le passage en visibilité.",
  },
  {
    number: "09",
    id: "architecture",
    title: "UN BÂTIMENT PENSÉ POUR ÊTRE VU.",
    paragraphs: ["L’architecture d’AMABAY PLACE privilégie la visibilité, la circulation et la lisibilité des espaces."],
    items: [
      { text: "Une façade contemporaine." },
      { text: "De grandes ouvertures." },
      { text: "Des volumes généreux." },
      { text: "Une organisation verticale claire." },
      { text: "Des espaces commerciaux conçus pour laisser chaque enseigne exprimer pleinement son identité." },
    ],
    statement: "L’architecture devient une partie de l’expérience.",
  },
  {
    number: "10",
    id: "atrium",
    title: "UN CŒUR OUVERT SUR TOUT LE PROJET.",
    paragraphs: [
      "Au centre du bâtiment, l’atrium crée une connexion visuelle et physique entre les différents niveaux.",
      "Il apporte lumière, profondeur et respiration à l’ensemble.",
      "Escalators, circulations verticales et vues croisées permettent aux visiteurs de comprendre naturellement le bâtiment et de passer facilement d’un univers à l’autre.",
    ],
    statement: "Voir. Explorer. Circuler.",
  },
  {
    number: "11",
    id: "vertical-experience",
    title: "CHAQUE NIVEAU FAIT PARTIE DU PARCOURS.",
    paragraphs: [
      "AMABAY PLACE est organisé sur plusieurs niveaux reliés par des systèmes de circulation pensés pour rendre le parcours simple et fluide.",
    ],
    items: [
      { text: "Escalators." },
      { text: "Ascenseurs." },
      { text: "Ascenseur panoramique." },
      { text: "Circulations ouvertes autour de l’atrium." },
      { text: "Accès adaptés aux différents profils de visiteurs." },
    ],
    statement: "Monter d’un étage ne signifie pas quitter l’expérience. Cela signifie la poursuivre.",
  },
  {
    number: "12",
    id: "key-figures",
    title: "AMABAY PLACE EN QUELQUES CHIFFRES.",
    items: [
      { value: "R+3", text: "Une destination développée sur plusieurs niveaux." },
      { value: "1 200 M²", text: "Environ par niveau." },
      { value: "150+", text: "Places de stationnement." },
      { value: "100 M ENVIRON", text: "De façade et de présence visible depuis les axes environnants." },
      { value: "150+", text: "Collaborateurs liés à l’écosystème du site." },
      { value: "20K+", text: "Utilisateurs actifs au sein de l’écosystème existant." },
    ],
  },
  {
    number: "13",
    id: "universes",
    title: "UN LIEU. PLUSIEURS UNIVERS.",
    paragraphs: [
      "AMABAY PLACE rassemble des activités complémentaires capables de créer une véritable synergie entre les enseignes.",
    ],
    items: [
      { title: "MAISON", text: "Équipement, revêtements, salles de bains, cuisines, mobilier et solutions pour l’habitat." },
      { title: "DESIGN & DÉCORATION", text: "Mobilier, décoration, luminaires, objets et inspirations." },
      { title: "LIFESTYLE", text: "Concepts, services et marques qui accompagnent les nouveaux modes de vie." },
      { title: "TECHNOLOGIE & INNOVATION", text: "Solutions intelligentes pour la maison et le quotidien." },
      { title: "RESTAURATION", text: "Café, food concepts et espaces dédiés aux moments de pause." },
      { title: "SERVICES", text: "Des activités complémentaires capables de transformer une simple visite en expérience complète." },
    ],
  },
  {
    number: "14",
    id: "home-destination",
    title: "DE L’IDÉE À L’ESPACE DE VIE.",
    paragraphs: [
      "AMABAY PLACE ambitionne de devenir une destination de référence pour tous ceux qui construisent, rénovent, aménagent ou souhaitent simplement faire évoluer leur intérieur.",
      "Au lieu de multiplier les déplacements, les visiteurs peuvent découvrir plusieurs univers complémentaires dans une même destination.",
    ],
    items: [
      { text: "Matériaux." },
      { text: "Salle de bains." },
      { text: "Cuisine." },
      { text: "Mobilier." },
      { text: "Décoration." },
      { text: "Éclairage." },
      { text: "Technologie." },
      { text: "Bien-être." },
    ],
    statement: "Imaginer son espace. Comparer. Choisir. Réaliser.",
  },
  {
    number: "15",
    id: "showroom-experience",
    title: "DES ESPACES QUI LAISSENT LES MARQUES S’EXPRIMER.",
    paragraphs: [
      "Les espaces commerciaux sont imaginés comme de véritables showrooms.",
      "Plus qu’un produit posé sur une étagère, les marques peuvent créer des mises en scène, présenter des environnements complets et permettre aux visiteurs de mieux comprendre leurs solutions.",
    ],
    statement: "Voir le produit dans son contexte change la manière de l’acheter.",
  },
  {
    number: "16",
    id: "food-social",
    title: "VENIR POUR ACHETER. RESTER POUR PROFITER.",
    paragraphs: [
      "Une destination moderne ne peut plus être uniquement commerciale.",
      "AMABAY PLACE intègre progressivement des espaces permettant de prolonger le temps passé sur place :",
    ],
    items: [
      { text: "Café." },
      { text: "Restauration." },
      { text: "Terrasses." },
      { text: "Espaces de rencontre." },
      { text: "Concepts food." },
      { text: "Zones de détente." },
    ],
    statement: "Parce que les meilleurs lieux sont ceux dans lesquels on a envie de rester.",
  },
  {
    number: "17",
    id: "amabay-coffee",
    title: "UNE PAUSE AU CŒUR D’AMABAY.",
    paragraphs: [
      "Pensé comme un point de rencontre intégré au parcours du centre, AMABAY COFFEE apporte une dimension plus chaleureuse et quotidienne à la destination.",
    ],
    items: [
      { text: "Un café contemporain." },
      { text: "Une identité propre." },
      { text: "Un espace pour travailler quelques minutes, discuter, attendre ou simplement profiter du lieu." },
    ],
    statement: "Coffee. People. Place.",
  },
  {
    number: "18",
    id: "outdoor-experience",
    title: "L’EXPÉRIENCE COMMENCE AVANT MÊME D’ENTRER.",
    paragraphs: [
      "Les espaces extérieurs d’AMABAY PLACE font partie intégrante du projet.",
      "Ils peuvent accueillir différents usages et services complémentaires pour renforcer l’attractivité du site :",
    ],
    items: [
      { text: "Espaces paysagers." },
      { text: "Terrasses." },
      { text: "Concepts de restauration extérieure." },
      { text: "Services automobiles." },
      { text: "Mobilité électrique." },
      { text: "Espaces événementiels." },
      { text: "Activations temporaires." },
    ],
    statement: "Chaque mètre carré peut devenir une expérience.",
  },
  {
    number: "19",
    id: "mobility",
    title: "PENSÉ POUR LES NOUVEAUX MODES DE MOBILITÉ.",
    paragraphs: ["AMABAY PLACE intègre une réflexion plus large autour de l’accès et de la mobilité."],
    items: [
      { text: "Stationnement." },
      { text: "Accès véhicules." },
      { text: "Zones de dépose." },
      { text: "Circulations piétonnes." },
      { text: "Solutions de recharge électrique." },
      { text: "Services complémentaires pour l’automobile." },
    ],
    statement: "Arriver facilement. Stationner simplement. Repartir sereinement.",
  },
  {
    number: "20",
    id: "parking",
    title: "150+ PLACES. ZÉRO COMPLEXITÉ.",
    paragraphs: [
      "Le stationnement fait partie intégrante de l’expérience visiteur.",
      "AMABAY PLACE dispose de plus de 150 places de parking, permettant d’accompagner les flux générés par les différentes activités du site.",
      "Une circulation pensée pour rendre l’arrivée et le départ aussi simples que possible.",
    ],
    statement: "Une bonne expérience commence dès l’arrivée.",
  },
  {
    number: "21",
    id: "connected-place",
    title: "UN LIEU PHYSIQUE. UNE EXPÉRIENCE CONNECTÉE.",
    paragraphs: [
      "AMABAY PLACE est conçu pour intégrer de nouveaux outils permettant aux marques de communiquer et aux visiteurs de mieux découvrir les offres présentes.",
    ],
    items: [
      { text: "Écrans digitaux." },
      { text: "Communication dynamique." },
      { text: "Signalétique." },
      { text: "Information des visiteurs." },
      { text: "Contenus événementiels." },
      { text: "Visibilité pour les enseignes." },
    ],
    statement: "Le bâtiment devient également un média.",
  },
  {
    number: "22",
    id: "wayfinding",
    title: "TOUJOURS SAVOIR OÙ ALLER.",
    paragraphs: ["Une signalétique claire accompagne le visiteur entre les différents niveaux et univers."],
    items: [
      { value: "-1 → R+3" },
      { text: "Parking." },
      { text: "Accueil." },
      { text: "Showrooms." },
      { text: "Boutiques." },
      { text: "Restaurants." },
      { text: "Services." },
      { text: "Espaces lifestyle." },
    ],
    statement: "Simple à comprendre. Simple à parcourir.",
  },
  {
    number: "23",
    id: "brands",
    title: "VOTRE MARQUE MÉRITE PLUS QU’UN LOCAL.",
    paragraphs: [
      "S’installer à AMABAY PLACE, c’est rejoindre une destination où les enseignes peuvent bénéficier des flux, de la visibilité et surtout de la complémentarité entre les différents univers présents.",
      "Chaque nouvelle marque enrichit la destination.",
      "Et chaque nouvelle destination créée à l’intérieur d’AMABAY PLACE renforce les autres.",
    ],
    statement: "Plus de complémentarité. Plus de découverte. Plus de raisons de revenir.",
  },
  {
    number: "24",
    id: "ecosystem",
    title: "DES MARQUES QUI SE RENFORCENT MUTUELLEMENT.",
    paragraphs: [
      "L’ambition d’AMABAY PLACE est de créer un véritable écosystème commercial.",
      "Un visiteur venu pour une salle de bains peut découvrir une cuisine.",
      "Un client venu pour du mobilier peut découvrir de la décoration.",
      "Un visiteur venu pour un service peut rester pour déjeuner.",
      "Une famille venue découvrir un showroom peut passer plusieurs heures sur place.",
      "La valeur ne vient pas uniquement du nombre d’enseignes.",
    ],
    statement: "Elle vient de leur complémentarité.",
  },
  {
    number: "25",
    id: "experience",
    title: "UNE DESTINATION À VIVRE, PAS SEULEMENT À VISITER.",
    paragraphs: ["L’expérience AMABAY PLACE repose sur cinq principes :"],
    items: [
      { title: "ACCUEILLANTE", text: "Un lieu accessible et agréable." },
      { title: "INSPIRANTE", text: "Des espaces qui donnent des idées." },
      { title: "PREMIUM", text: "Une architecture, une sélection et une image cohérentes." },
      { title: "CONNECTÉE", text: "Une destination intégrée aux nouveaux usages." },
      { title: "MÉMORABLE", text: "Un endroit auquel on associe une expérience, pas simplement un achat." },
    ],
  },
  {
    number: "26",
    id: "future",
    title: "UN LIEU CAPABLE D’ÉVOLUER.",
    paragraphs: ["AMABAY PLACE n’est pas pensé comme un projet figé."],
    items: [
      { text: "De nouveaux concepts peuvent apparaître." },
      { text: "De nouvelles enseignes peuvent rejoindre la destination." },
      { text: "Les espaces extérieurs peuvent accueillir de nouveaux usages." },
      { text: "Les services peuvent évoluer avec les attentes des visiteurs." },
    ],
    statement: "Aujourd’hui une destination. Demain un véritable lieu de vie.",
  },
  {
    number: "27",
    id: "strapex",
    title: "UN PROJET PORTÉ PAR UNE EXPÉRIENCE DEPUIS 2000.",
    paragraphs: [
      "AMABAY PLACE s’inscrit dans le développement du Groupe STRAPEX Maroc et dans une vision construite progressivement autour de l’univers de l’habitat.",
    ],
    items: [
      { value: "2000", text: "Création du Groupe STRAPEX." },
      { value: "2008", text: "Premier showroom à Agadir." },
      { value: "2013", text: "Développement de Ceramica Mall." },
      { value: "2020", text: "Ouverture d’AMABAY Ceramic City à Casablanca." },
      { value: "Aujourd’hui", text: "Une nouvelle étape avec AMABAY PLACE." },
    ],
    statement: "De la distribution à la création de destinations.",
  },
];

export const finalStatement = {
  number: "28",
  title: "MORE THAN A MALL. A WAY OF LIVING.",
  paragraphs: [
    "AMABAY PLACE imagine un lieu où commerce, architecture, maison, design, restauration et lifestyle peuvent enfin fonctionner ensemble.",
    "Un lieu où l’on vient avec une intention… et où l’on découvre beaucoup plus.",
  ],
  brand: "AMABAY PLACE",
  signature: "HOME. LIFE. STYLE.",
  closing: "ALL IN ONE PLACE.",
} as const;

export const finalCta = {
  number: "29",
  title: "VENEZ DÉCOUVRIR AMABAY PLACE.",
  introduction:
    "Vous êtes une marque, une enseigne, un restaurateur, un opérateur ou un porteur de concept ?",
  text: "Rejoignez une destination en construction autour d’une nouvelle vision du retail et du lifestyle à Casablanca.",
  ctas: ["Découvrir nos espaces", "Devenir partenaire", "Nous contacter", "Organiser une visite"],
  brand: "AMABAY PLACE",
  address: "Avenue Mohammed VI — Km 9, Route de Médiouna",
  city: "Casablanca, Maroc",
} as const;

/**
 * Canaux de contact publics.
 *
 * TODO — À VÉRIFIER AVANT MISE EN LIGNE.
 * `email` est une adresse proposée par défaut : confirmez qu'elle existe
 * réellement, elle est affichée sur la page et sert de lien de repli au
 * formulaire. `phone` est vide : le bloc « Téléphone » n'apparaît qu'une fois
 * renseigné. La boîte qui reçoit le formulaire est celle associée à la clé
 * WEB3FORMS_ACCESS_KEY (voir .env.example), pas cette constante.
 */
export const contactDetails = {
  phone: "",
  phoneLabel: "",
  email: "contact@amabayplace.ma",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Avenue+Mohammed+VI+Km+9+Route+de+M%C3%A9diouna+Casablanca",
  mapsLabel: "Voir sur Google Maps",
} as const;

/** Domaine de production. TODO : remplacer par le domaine définitif. */
export const SITE_URL = "https://amabay-place.brahimsemlali.chatgpt.site";
