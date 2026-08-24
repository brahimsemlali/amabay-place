export const navigation = [
  { label: "Le Concept", href: "#destination" },
  { label: "Expérience", href: "#experience" },
  { label: "Localisation", href: "#location" },
  { label: "Espaces", href: "#spaces" },
  { label: "Enseignes", href: "#shopping" },
  { label: "Contact", href: "#visit" },
] as const;

export const statistics = [
  { value: "20 000", suffix: "m²", label: "Surfaces louables" },
  { value: "7 500", suffix: "m²", label: "Showrooms" },
  { value: "90", suffix: "m", label: "Façade latérale" },
  { value: "5,2", suffix: "M", label: "Habitants à moins de 45 min" },
] as const;

export const experiences = [
  {
    name: "Maison",
    label: "Mobilier & équipement",
    description: "Mobilier, décoration, cuisine, salle de bain et équipement réunis pour imaginer chaque espace de vie.",
    tone: "stone-1",
  },
  {
    name: "Lifestyle",
    label: "Bien-être & services",
    description: "Mode de vie, bien-être, technologie et services accompagnent les usages et les envies d’aujourd’hui.",
    tone: "stone-3",
  },
  {
    name: "Food & Coffee",
    label: "Pause & rencontres",
    description: "Des espaces pour faire une pause, se retrouver et profiter du lieu, du premier café jusqu’au dîner.",
    tone: "stone-2",
  },
  {
    name: "Expérience",
    label: "Découvrir & vivre",
    description: "Des espaces conçus pour transformer une simple visite en destination, entre découverte, inspiration et rencontres.",
    tone: "stone-4",
  },
] as const;

export const architectureStories = [
  {
    index: "01",
    title: "Lignes",
    text: "Des lignes contemporaines donnent à Amabay Place une identité immédiatement reconnaissable.",
    media: "Architecture / lignes contemporaines",
    tone: "stone-1",
  },
  {
    index: "02",
    title: "Façades",
    text: "De grandes façades et jusqu’à 8 mètres de hauteur de vitrine offrent aux enseignes une présence forte.",
    media: "Architecture / visibilité",
    tone: "stone-4",
  },
  {
    index: "03",
    title: "Volumes",
    text: "Des plateaux commerciaux généreux permettent aux marques de créer de véritables expériences plutôt que de simples points de vente.",
    media: "Architecture / volumes ouverts",
    tone: "stone-3",
  },
  {
    index: "04",
    title: "Fluidité",
    text: "Ascenseur panoramique, escalators et circulations lisibles facilitent la découverte des différentes enseignes.",
    media: "Architecture / circulation",
    tone: "stone-6",
  },
] as const;

export const levels = [
  {
    code: "RDC",
    name: "Le niveau d’accueil",
    description: "1 500 m² de surface louable avec une hauteur de 6 mètres, au plus près des accès et des vitrines.",
    uses: ["1 500 m²", "Hauteur 6 m", "Accès direct", "Surface louable"],
  },
  {
    code: "R+1",
    name: "Le premier étage",
    description: "1 500 m² supplémentaires, reliés par ascenseur panoramique et escalators.",
    uses: ["1 500 m²", "Hauteur 3 m", "Ascenseur", "Escalators"],
  },
  {
    code: "R+2",
    name: "Le deuxième étage",
    description: "Un plateau de 1 500 m² conçu pour prolonger le parcours commercial et l’expérience de visite.",
    uses: ["1 500 m²", "Hauteur 3 m", "Plateau louable", "Monte-charge"],
  },
  {
    code: "R+3",
    name: "Le troisième étage",
    description: "Le dernier plateau de 1 500 m² complète les 4 500 m² répartis sur les trois étages.",
    uses: ["1 500 m²", "Hauteur 3 m", "R+3", "Accès vertical"],
  },
] as const;

export const shoppingCategories = [
  { name: "Visibilité", description: "Des façades et espaces commerciaux conçus pour mettre chaque enseigne en valeur." },
  { name: "Flexibilité", description: "Des surfaces capables d’accueillir différents concepts, showrooms et formats de marque." },
  { name: "Complémentarité", description: "Un mix d’enseignes pensé pour créer du trafic entre les différentes activités." },
  { name: "Destination", description: "Un environnement qui donne aux visiteurs plusieurs raisons de venir et de rester." },
] as const;

export const mediaHighlights = [
  {
    date: "VISIBILITÉ · ACCESSIBILITÉ · ESPACES",
    title: "Une destination visible et accessible",
    text: "Une localisation stratégique, une architecture distinctive, des surfaces généreuses et une forte visibilité réunies dans un même projet.",
  },
  {
    date: "HOME · LIFE · STYLE",
    title: "Une expérience qui crée du trafic",
    text: "Un positionnement maison et lifestyle, une zone d’influence régionale et plusieurs expériences pour multiplier les raisons de venir.",
  },
] as const;

export const travelTimes = [
  { time: "15", label: "Centre-ville · 13,5 km" },
  { time: "15", label: "Sidi Maârouf · 11 km" },
  { time: "20", label: "Bouskoura · 18 km" },
  { time: "30", label: "Aéroport Mohammed V · 28 km" },
] as const;

export const accessItems = [
  { title: "Accès rapide", detail: "Double accès par le giratoire du péage et l’Avenue Mohammed VI" },
  { title: "Forte visibilité", detail: "Une présence immédiate depuis les principaux axes de circulation" },
  { title: "Large zone de chalandise", detail: "Une clientèle locale, urbaine et régionale" },
  { title: "Connexion aux grands axes", detail: "Au croisement des axes A1, A3, A31 et RN9" },
  { title: "Stationnement accessible", detail: "Parking en sous-sol et espaces extérieurs" },
  { title: "Circulation fluide", detail: "Un parcours pensé pour simplifier l’arrivée et la visite" },
] as const;

export const galleryItems = [
  { label: "Vue extérieure", tone: "stone-2", shape: "wide" },
  { label: "Showroom", tone: "stone-5", shape: "portrait" },
  { label: "Détail architectural", tone: "stone-3", shape: "small" },
  { label: "Façade et vitrine", tone: "stone-1", shape: "landscape" },
  { label: "Circulation intérieure", tone: "stone-6", shape: "tall" },
] as const;
