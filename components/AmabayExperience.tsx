"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import facadeImage from "@/assets/images/amabay-place-facade.webp";
import floorPlansImage from "@/assets/images/amabay-place-floor-plans.webp";
import interiorImage from "@/assets/images/amabay-place-interior.webp";
import nightImage from "@/assets/images/amabay-place-night.webp";
import showroomsImage from "@/assets/images/amabay-place-showrooms.webp";
import atriumImage from "@/assets/images/amabay-atrium.webp";
import facadeFrontImage from "@/assets/images/amabay-facade-front.webp";
import facadeLandscapeImage from "@/assets/images/amabay-facade-landscape.webp";
import fountainBridgeImage from "@/assets/images/amabay-fountain-bridge.webp";
import plazaCafeImage from "@/assets/images/amabay-plaza-cafe.webp";
import plazaFountainsImage from "@/assets/images/amabay-plaza-fountains.webp";
import sitePlanImage from "@/assets/images/amabay-site-plan.webp";
import atriumLowAngleImage from "@/assets/images/amabay-atrium-low-angle.webp";
import cornerFacadeImage from "@/assets/images/amabay-corner-facade.webp";
import escalatorImage from "@/assets/images/amabay-escalator.webp";
import openFloorImage from "@/assets/images/amabay-open-floor.webp";
import pianoImage from "@/assets/images/amabay-piano.webp";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";
import {
  accessItems,
  architectureStories,
  experiences,
  levels,
  navigation,
  shoppingCategories,
  statistics,
  travelTimes,
} from "@/data/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const galleryMedia = [
  {
    src: plazaCafeImage,
    label: "Place extérieure / Cafés & rencontres",
    alt: "Perspective de la place extérieure aménagée avec cafés, bassins et espaces paysagers",
    kind: "wide",
  },
  {
    src: sitePlanImage,
    label: "Plan masse / Accès & stationnement",
    alt: "Vue aérienne du plan masse, des accès routiers et des stationnements d’Amabay Place",
    kind: "plan",
  },
  {
    src: plazaFountainsImage,
    label: "Promenade / Paysage & fontaines",
    alt: "Perspective de la promenade extérieure, des fontaines et des terrasses d’Amabay Place",
    kind: "wide",
  },
  {
    src: atriumImage,
    label: "Atrium / Lumière & circulation",
    alt: "Atrium central lumineux avec ascenseur panoramique et galeries superposées",
    kind: "wide",
  },
  {
    src: facadeFrontImage,
    label: "Façade / Entrée principale",
    alt: "Façade principale d’Amabay Place photographiée sous un ciel bleu",
    kind: "landscape",
  },
  {
    src: fountainBridgeImage,
    label: "Parvis / Passerelle & fontaines",
    alt: "Fontaines du parvis et passerelle vitrée devant la façade d’Amabay Place",
    kind: "landscape",
  },
  {
    src: facadeLandscapeImage,
    label: "Architecture / Paysage minéral",
    alt: "Façade latérale, passerelle et plantations du parvis d’Amabay Place",
    kind: "landscape",
  },
] as const;

const experienceMedia = [
  { src: interiorImage, alt: "Galerie intérieure dédiée à la maison et au design" },
  { src: pianoImage, alt: "Piano blanc au cœur des espaces lifestyle d’Amabay Place" },
  { src: plazaCafeImage, alt: "Terrasses et espaces de restauration sur la place extérieure" },
  { src: atriumLowAngleImage, alt: "Atrium central et galeries lumineuses d’Amabay Place" },
] as const;

const architectureMedia = [
  { src: cornerFacadeImage, alt: "Façade contemporaine d’Amabay Place et écran architectural" },
  { src: atriumLowAngleImage, alt: "Volumes superposés et lumière de l’atrium central" },
  { src: openFloorImage, alt: "Plateau intérieur ouvert rythmé par des colonnes lumineuses" },
  { src: escalatorImage, alt: "Escalator et escalier reliant les niveaux d’Amabay Place" },
] as const;

const tenantMedia = [
  { src: cornerFacadeImage, alt: "Façade offrant une forte visibilité aux enseignes" },
  { src: openFloorImage, alt: "Plateau commercial flexible et lumineux" },
  { src: showroomsImage, alt: "Configurations complémentaires de showrooms" },
  { src: facadeImage, alt: "Amabay Place comme destination commerciale à Casablanca" },
] as const;

function EditorialMedia({
  src,
  alt,
  label,
  className = "",
  aspectRatio,
  sizes = "(min-width: 900px) 50vw, 100vw",
  fit = "cover",
  objectPosition = "center",
  index,
}: {
  src: StaticImageData;
  alt: string;
  label: string;
  className?: string;
  aspectRatio?: string;
  sizes?: string;
  fit?: "cover" | "contain";
  objectPosition?: string;
  index?: string;
}) {
  return (
    <figure className={`editorial-media ${className}`} style={{ aspectRatio }}>
      <Image
        className="editorial-media-image"
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        style={{ objectFit: fit, objectPosition }}
      />
      <span className="media-grain" aria-hidden="true" />
      <figcaption className="media-label">{label}</figcaption>
      {index && <span className="media-index">{index}</span>}
    </figure>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow" viewBox="0 0 32 16" aria-hidden="true">
      <path d={diagonal ? "M5 13 20 3m-8 0h8v8" : "M2 8h27m-7-6 7 6-7 6"} />
    </svg>
  );
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label reveal">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

export function AmabayExperience() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const [activeArchitecture, setActiveArchitecture] = useState(0);
  const [activeLevel, setActiveLevel] = useState(0);
  const [activeShopping, setActiveShopping] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 900px)",
          mobile: "(max-width: 899px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) {
            gsap.set(".reveal, .hero-kicker, .hero-title-line, .hero-detail", {
              autoAlpha: 1,
              y: 0,
              x: 0,
            });
            return;
          }

          gsap
            .timeline({ defaults: { duration: 1.15, ease: "power3.out" } })
            .from(".hero-kicker", { autoAlpha: 0, y: 20 }, 0.25)
            .from(".hero-title-line", { yPercent: 115, stagger: 0.11 }, 0.35)
            .from(".hero-detail", { autoAlpha: 0, y: 20, stagger: 0.12 }, 0.75)
            .from(".hero-rule", { scaleX: 0, transformOrigin: "left" }, 0.85);

          if (desktop) {
            gsap
              .timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: ".hero-scroll",
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 1,
                },
              })
              .to(".hero-media", { scale: 0.84, borderRadius: 4, yPercent: 8 }, 0)
              .to(".hero-copy", { y: -90, autoAlpha: 0 }, 0)
              .to(".hero-scroll-indicator", { autoAlpha: 0 }, 0)
              .to(".hero-stage", { backgroundColor: "#f7f6f2" }, 0.15);
          }

          gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
            gsap.from(element, {
              y: 42,
              autoAlpha: 0,
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "clamp(top 88%)",
                once: true,
              },
            });
          });

          gsap.utils.toArray<HTMLElement>(".media-reveal").forEach((element) => {
            gsap.from(element, {
              clipPath: "inset(14% 0 0 0)",
              scale: 1.05,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "clamp(top 86%)",
                once: true,
              },
            });
          });

          gsap.utils.toArray<HTMLElement>(".architecture-chapter").forEach((chapter, index) => {
            ScrollTrigger.create({
              trigger: chapter,
              start: "top 46%",
              end: "bottom 46%",
              onEnter: () => setActiveArchitecture(index),
              onEnterBack: () => setActiveArchitecture(index),
            });
          });

          gsap.to(".final-media-inner", {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: ".final-cta",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  const closeMenu = () => setMenuOpen(false);
  const currentExperience = experiences[activeExperience];
  const currentExperienceMedia = experienceMedia[activeExperience];
  const currentArchitecture = architectureStories[activeArchitecture];
  const currentArchitectureMedia = architectureMedia[activeArchitecture];
  const currentLevel = levels[activeLevel];
  const currentShopping = shoppingCategories[activeShopping];
  const currentTenantMedia = tenantMedia[activeShopping];

  return (
    <main ref={root} className="site-shell">
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-active" : ""}`}>
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Accueil Amabay Place">
          AMABAY PLACE
        </a>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.slice(0, 7).map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="language-button" type="button" aria-label="Langue actuelle : français">
            FR
          </button>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="sr-only">Ouvrir ou fermer la navigation</span>
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Navigation mobile">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <p>Home. Life. Style.</p>
      </div>

      <div id="main-content">
        <section id="top" className="hero-scroll" aria-labelledby="hero-title">
          <div className="hero-stage">
            <HeroBackgroundVideo className="hero-media" />
            <div className="hero-shade" aria-hidden="true" />
            <div className="hero-copy">
              <p className="hero-kicker">Home. Life. Style.</p>
              <h1 id="hero-title" className="hero-title">
                <span className="title-mask">
                  <span className="hero-title-line">AMABAY</span>
                </span>
                <span className="title-mask">
                  <span className="hero-title-line serif-italic">PLACE</span>
                </span>
              </h1>
              <p className="hero-tagline">Là où la vie prend forme.</p>
              <div className="hero-footer hero-detail">
                <p>
                  Une nouvelle destination à Casablanca dédiée à la maison, au design, au lifestyle, à la restauration et
                  aux nouvelles expériences.
                </p>
                <a className="text-link text-link--light" href="#destination">
                  Découvrir le lieu <Arrow />
                </a>
              </div>
              <span className="hero-rule" aria-hidden="true" />
            </div>
            <div className="hero-scroll-indicator hero-detail" aria-hidden="true">
              <span>Faire défiler</span>
              <i />
            </div>
          </div>
        </section>

        <section id="destination" className="intro-section light-section">
          <div className="section-wrap">
            <SectionLabel number="01">Bienvenue à Amabay Place</SectionLabel>
            <div className="intro-heading-grid">
              <h2 className="display-heading reveal">Plus qu’un centre commercial.</h2>
              <p className="intro-copy reveal">
                Amabay Place réunit dans une même destination des enseignes dédiées à la maison, au design, au lifestyle,
                aux services, à la restauration et aux loisirs. Son architecture contemporaine et ses espaces ouverts créent
                une expérience pensée pour les visiteurs comme pour les marques.
              </p>
            </div>
            <div className="intro-media-composition">
              <figure className="editorial-media intro-media-main media-reveal">
                <Image
                  className="editorial-media-image"
                  src={facadeImage}
                  alt="Façade principale d’Amabay Place sous un ciel bleu"
                  fill
                  sizes="(min-width: 700px) 74vw, 88vw"
                  placeholder="blur"
                />
                <span className="media-grain" aria-hidden="true" />
                <figcaption className="media-label">AMABAY PLACE / Façade principale</figcaption>
              </figure>
              <EditorialMedia
                src={pianoImage}
                alt="Piano blanc installé dans l’atrium d’Amabay Place"
                label="Détail intérieur / Piano & lumière"
                aspectRatio="4 / 5"
                className="intro-media-detail media-reveal"
                sizes="(min-width: 700px) 29vw, 42vw"
                objectPosition="52% center"
              />
              <p className="intro-caption reveal">
                Un lieu pensé pour découvrir, choisir, s’inspirer et vivre de nouvelles expériences.
              </p>
            </div>
          </div>
        </section>

        <section className="stats-section light-section" aria-labelledby="stats-heading">
          <div className="section-wrap">
            <div className="stats-header">
              <SectionLabel number="02">Une destination à portée régionale</SectionLabel>
              <h2 id="stats-heading" className="sr-only">
                Amabay Place en chiffres
              </h2>
              <p className="data-note reveal">Un emplacement. Une audience à grande échelle.</p>
            </div>
            <div className="stats-grid">
              {statistics.map((stat, index) => (
                <div className="stat-item reveal" key={stat.label}>
                  <span className="stat-index">{String(index + 1).padStart(2, "0")}</span>
                  <strong>
                    {stat.value}
                    <small>{stat.suffix}</small>
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section dark-section" aria-labelledby="experience-heading">
          <div className="section-wrap">
            <SectionLabel number="03">Un nouveau concept de destination</SectionLabel>
            <h2 id="experience-heading" className="sr-only">
              Shopping, inspiration et expérience
            </h2>
            <div className="experience-layout">
              <div className="experience-list" role="list" aria-label="Les dimensions de l’expérience Amabay Place">
                {experiences.map((item, index) => (
                  <button
                    type="button"
                    role="listitem"
                    className={activeExperience === index ? "is-active" : ""}
                    key={item.name}
                    onMouseEnter={() => setActiveExperience(index)}
                    onFocus={() => setActiveExperience(index)}
                    onClick={() => setActiveExperience(index)}
                  >
                    <span>{item.name}</span>
                    <span className="experience-number">0{index + 1}</span>
                  </button>
                ))}
              </div>
              <div className="experience-visual">
                <EditorialMedia
                  key={currentExperience.name}
                  src={currentExperienceMedia.src}
                  alt={currentExperienceMedia.alt}
                  label={`${currentExperience.name} / ${currentExperience.label}`}
                  aspectRatio="4 / 5"
                  className="experience-media"
                  sizes="(min-width: 900px) 38vw, 100vw"
                />
                <div className="experience-description" aria-live="polite">
                  <p>{currentExperience.description}</p>
                  <span>
                    {String(activeExperience + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="architecture" className="architecture-section light-section" aria-labelledby="architecture-heading">
          <div className="section-wrap architecture-intro">
            <SectionLabel number="04">Architecture</SectionLabel>
            <h2 id="architecture-heading" className="display-heading reveal">
              Une architecture
              <br />
              {" "}
              <span className="serif-italic">qui se remarque.</span>
            </h2>
            <p className="architecture-lead reveal">
              Des lignes contemporaines, de grandes façades et des volumes ouverts donnent à Amabay Place une identité
              immédiatement reconnaissable.
            </p>
          </div>
          <div className="architecture-story">
            <div className="architecture-sticky">
              <div className="architecture-media-wrap">
                <EditorialMedia
                  key={currentArchitecture.title}
                  src={currentArchitectureMedia.src}
                  alt={currentArchitectureMedia.alt}
                  label={currentArchitecture.media}
                  aspectRatio="4 / 5"
                  index={currentArchitecture.index}
                  className="architecture-media"
                  sizes="(min-width: 900px) 48vw, 100vw"
                />
              </div>
              <div className="architecture-progress" aria-hidden="true">
                <span style={{ transform: `scaleX(${(activeArchitecture + 1) / architectureStories.length})` }} />
              </div>
            </div>
            <div className="architecture-chapters">
              {architectureStories.map((story, index) => (
                <article
                  className={`architecture-chapter ${activeArchitecture === index ? "is-active" : ""}`}
                  key={story.title}
                  onMouseEnter={() => setActiveArchitecture(index)}
                >
                  <span>{story.index}</span>
                  <h3>{story.title}</h3>
                  <p>{story.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="spaces" className="levels-section light-section" aria-labelledby="levels-heading">
          <div className="section-wrap">
            <SectionLabel number="05">Showrooms & espaces</SectionLabel>
            <div className="levels-heading-row">
              <h2 id="levels-heading" className="display-heading reveal">
                Des espaces conçus
                <br />
                {" "}
                <span className="serif-italic">pour inspirer.</span>
              </h2>
              <p className="reveal">
                Mobilier, cuisines, salles de bain, décoration, matériaux, technologie ou équipement : les marques disposent
                d’espaces permettant de présenter leurs produits dans de véritables mises en situation.
              </p>
            </div>
            <div className="levels-layout">
              <div className="level-tabs" role="tablist" aria-label="Niveaux du centre">
                {levels.map((level, index) => (
                  <button
                    key={level.code}
                    type="button"
                    role="tab"
                    aria-selected={activeLevel === index}
                    aria-controls="level-panel"
                    className={activeLevel === index ? "is-active" : ""}
                    onClick={() => setActiveLevel(index)}
                  >
                    <span>{level.code}</span>
                    <small>{level.name}</small>
                  </button>
                ))}
              </div>
              <div id="level-panel" className="level-panel" role="tabpanel" tabIndex={0}>
                <figure className="editorial-media technical-plan-media floor-plan">
                  <Image
                    className="editorial-media-image"
                    src={floorPlansImage}
                    alt="Vue éclatée des quatre niveaux et plans d’étage d’Amabay Place"
                    fill
                    sizes="(min-width: 700px) 62vw, 100vw"
                    placeholder="blur"
                  />
                  <span className="media-grain" aria-hidden="true" />
                  <figcaption className="media-label">AMABAY PLACE / Organisation des niveaux</figcaption>
                </figure>
                <div className="level-detail">
                  <div>
                    <span>{currentLevel.code}</span>
                    <h3>{currentLevel.name}</h3>
                  </div>
                  <p>{currentLevel.description}</p>
                  <ul>
                    {currentLevel.uses.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="shopping" className="shopping-section warm-section" aria-labelledby="shopping-heading">
          <div className="section-wrap">
            <SectionLabel number="06">Marques & enseignes</SectionLabel>
            <div className="shopping-title-row">
              <h2 id="shopping-heading" className="display-heading reveal">
                Votre marque
                <br />
                {" "}
                <span className="serif-italic">en grand format.</span>
              </h2>
              <p className="reveal">
                Amabay Place offre aux enseignes un environnement pensé pour développer leur visibilité, leur image et leur
                activité. Des surfaces généreuses permettent de créer de véritables showrooms et expériences de marque.
              </p>
            </div>
            <div className="shopping-layout">
              <EditorialMedia
                key={currentShopping.name}
                src={currentTenantMedia.src}
                alt={currentTenantMedia.alt}
                label={`${currentShopping.name} / Opportunités d’implantation`}
                aspectRatio="4 / 5"
                className="shopping-media"
                sizes="(min-width: 900px) 36vw, 100vw"
              />
              <div className="shopping-categories" role="list">
                {shoppingCategories.map((category, index) => (
                  <button
                    key={category.name}
                    type="button"
                    role="listitem"
                    className={activeShopping === index ? "is-active" : ""}
                    onMouseEnter={() => setActiveShopping(index)}
                    onFocus={() => setActiveShopping(index)}
                    onClick={() => setActiveShopping(index)}
                  >
                    <span>{category.name}</span>
                    <Arrow diagonal />
                  </button>
                ))}
                <div className="shopping-description" aria-live="polite">
                  <span>0{activeShopping + 1}</span>
                  <p>{currentShopping.description}</p>
                </div>
              </div>
            </div>
            <figure className="editorial-media showroom-feature media-reveal">
              <Image
                className="editorial-media-image"
                src={showroomsImage}
                alt="Proposition architecturale de trois showrooms éclairés en soirée"
                fill
                sizes="(min-width: 1680px) 1680px, 100vw"
                placeholder="blur"
              />
              <span className="media-grain" aria-hidden="true" />
              <figcaption className="media-label">Configurations showroom / Opportunités d’implantation</figcaption>
            </figure>
          </div>
        </section>

        <section id="dining" className="dining-section sand-section" aria-labelledby="dining-heading">
          <div className="section-wrap">
            <SectionLabel number="07">Espaces extérieurs</SectionLabel>
            <div className="dining-heading-row">
              <h2 id="dining-heading" className="display-heading reveal">
                Des espaces qui prolongent
                <br />
                {" "}
                <span className="serif-italic">l’expérience.</span>
              </h2>
              <p className="reveal">
                Terrasses, espaces paysagers, restauration et zones de détente accompagnent le parcours des visiteurs et
                donnent au projet une véritable dimension de destination.
              </p>
            </div>
            <div className="dining-composition">
              <EditorialMedia
                src={plazaCafeImage}
                alt="Place extérieure aménagée avec cafés et espaces de rencontre"
                label="Terrasses & restauration"
                aspectRatio="4 / 5"
                className="dining-main media-reveal"
                objectPosition="55% center"
              />
              <EditorialMedia
                src={plazaFountainsImage}
                alt="Promenade paysagère avec fontaines et terrasses"
                label="Espaces paysagers"
                aspectRatio="3 / 2"
                className="dining-small dining-small--top media-reveal"
              />
              <EditorialMedia
                src={fountainBridgeImage}
                alt="Passerelle et fontaines du parvis d’Amabay Place"
                label="Zones de détente"
                aspectRatio="3 / 2"
                className="dining-small dining-small--bottom media-reveal"
              />
              <p className="dining-note reveal">Dedans comme dehors, chaque espace compte.</p>
            </div>
          </div>
        </section>

        <section id="location" className="location-section dark-section" aria-labelledby="location-heading">
          <div className="section-wrap">
            <SectionLabel number="08">Localisation stratégique</SectionLabel>
            <div className="location-title-row">
              <h2 id="location-heading" className="display-heading reveal">
                Votre prochaine adresse
                <br />
                {" "}
                <span className="serif-italic">à Casablanca.</span>
              </h2>
              <p className="reveal">
                Situé au Km 9, Route de Médiouna – Avenue Mohammed VI, Amabay Place bénéficie d’un emplacement stratégique à
                l’entrée de Casablanca.
              </p>
            </div>
            <EditorialMedia
              src={sitePlanImage}
              alt="Plan masse d’Amabay Place avec accès routiers, stationnement et espaces extérieurs"
              label="Km 9 · Route de Médiouna · Avenue Mohammed VI"
              aspectRatio="16 / 9"
              className="location-map media-reveal"
              sizes="(min-width: 1680px) 1680px, 100vw"
              fit="contain"
            />
            <div className="travel-times" aria-label="Temps d’accès à Amabay Place">
              {travelTimes.map((item) => (
                <div className="travel-item reveal" key={`${item.time}-${item.label}`}>
                  <strong>{item.time}</strong>
                  <span>MIN</span>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="visit" className="visit-section light-section" aria-labelledby="visit-heading">
          <div className="section-wrap">
            <SectionLabel number="09">Accès & parking</SectionLabel>
            <div className="visit-heading-row">
              <h2 id="visit-heading" className="display-heading reveal">
                Facile à rejoindre.
                <br />
                {" "}
                <span className="serif-italic">Facile à repérer.</span>
              </h2>
              <p className="reveal">
                Amabay Place profite de connexions directes avec les principaux axes routiers de la région et d’une excellente
                visibilité depuis son environnement immédiat.
              </p>
            </div>
            <div className="access-grid">
              <div className="access-list">
                {accessItems.map((item, index) => (
                  <div className="access-item reveal" key={item.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item.title}</p>
                    <small>{item.detail}</small>
                  </div>
                ))}
              </div>
              <EditorialMedia
                src={cornerFacadeImage}
                alt="Parvis accessible et façade visible d’Amabay Place"
                label="Parking sous-sol & extérieur"
                aspectRatio="4 / 5"
                className="parking-media media-reveal"
                sizes="(min-width: 900px) 38vw, 100vw"
                objectPosition="62% center"
              />
            </div>
          </div>
        </section>

        <section className="gallery-section warm-section" aria-labelledby="gallery-heading">
          <div className="section-wrap gallery-header">
            <SectionLabel number="10">Une nouvelle façon de vivre le shopping</SectionLabel>
            <h2 id="gallery-heading" className="display-heading reveal">
              Une seule adresse.
              <br />
                {" "}
              <span className="serif-italic">Plusieurs expériences.</span>
            </h2>
          </div>
          <div className="gallery-viewport">
            <div className="gallery-track">
              {galleryMedia.map((item, index) => (
                <figure
                  key={item.label}
                  className={`editorial-media gallery-item gallery-item--${item.kind} media-reveal`}
                >
                  <Image
                    className="editorial-media-image"
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 900px) 58vw, 100vw"
                    placeholder="blur"
                  />
                  <span className="media-grain" aria-hidden="true" />
                  <figcaption className="media-label">{item.label}</figcaption>
                  <span className="media-index">{String(index + 1).padStart(2, "0")}</span>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-heading">
          <div className="final-media-inner">
            <figure className="editorial-media final-media">
              <Image
                className="editorial-media-image final-night-image"
                src={nightImage}
                alt="Vue aérienne nocturne d’Amabay Place et de ses accès éclairés"
                fill
                sizes="100vw"
                placeholder="blur"
              />
              <span className="media-grain" aria-hidden="true" />
              <figcaption className="media-label">AMABAY PLACE / Casablanca, porte sud-est</figcaption>
            </figure>
          </div>
          <div className="final-overlay" />
          <div className="final-content">
            <span className="reveal">Opportunités commerciales / Casablanca</span>
            <h2 id="final-heading" className="reveal">
              Faites partie
              <br />
                {" "}
              <em>d’Amabay Place.</em>
            </h2>
            <a className="text-link text-link--light reveal" href="#shopping">
              Découvrir les espaces <Arrow />
            </a>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="footer-wordmark" href="#top">
            AMABAY PLACE
          </a>
          <nav aria-label="Navigation de pied de page">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <span>Home. Life. Style.</span>
            <p>Km 9 — Route de Médiouna</p>
            <p>Avenue Mohammed VI · Casablanca, Maroc</p>
            <p>Une nouvelle destination pour la maison, le lifestyle et les expériences.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Amabay Place. Tous droits réservés.</span>
          <div>
            <a href="#">Confidentialité</a>
            <a href="#">Mentions légales</a>
          </div>
          <a href="#top">Retour en haut ↑</a>
        </div>
      </footer>
    </main>
  );
}
