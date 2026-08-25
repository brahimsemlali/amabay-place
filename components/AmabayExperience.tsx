"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import atriumLowAngleImage from "@/assets/images/amabay-atrium-low-angle.webp";
import floorPlansImage from "@/assets/images/amabay-place-floor-plans.webp";
import nightImage from "@/assets/images/amabay-place-night.webp";
import interiorImage from "@/assets/images/amabay-place-interior.webp";
import plazaCafeImage from "@/assets/images/amabay-plaza-cafe.webp";
import plazaFountainsImage from "@/assets/images/amabay-plaza-fountains.webp";
import sitePlanImage from "@/assets/images/amabay-site-plan.webp";
import tenantAtriumImage from "@/assets/images/amabay-tenant-atrium.webp";
import tenantCornerFacadeImage from "@/assets/images/amabay-tenant-corner-facade.webp";
import tenantFacadeFrontImage from "@/assets/images/amabay-tenant-facade-front.webp";
import tenantFacadeLandscapeImage from "@/assets/images/amabay-tenant-facade-landscape.webp";
import tenantFountainBridgeImage from "@/assets/images/amabay-tenant-fountain-bridge.webp";
import tenantOpenFloorImage from "@/assets/images/amabay-tenant-open-floor.webp";
import {
  contactDetails,
  contentSections,
  finalCta,
  finalStatement,
  heroContent,
  type ContentSection,
} from "@/data/amabayContent";
import { ContactForm } from "./ContactForm";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type Media = {
  src: StaticImageData;
  alt: string;
  objectPosition?: string;
  fit?: "cover" | "contain";
};

/**
 * Chaque visuel n'est utilisé qu'une seule fois : deux blocs ne doivent jamais
 * présenter la même photo au visiteur. Tous les cadres partagent les mêmes
 * angles arrondis, seul le format varie.
 */
const sectionMedia: Record<string, Media> = {
  accessibility: {
    src: plazaCafeImage,
    alt: "Accès, stationnements et parvis paysager autour d’AMABAY PLACE",
  },
  catchment: {
    src: tenantCornerFacadeImage,
    alt: "AMABAY PLACE au cœur d’un bassin de vie majeur du Grand Casablanca",
    objectPosition: "center 62%",
  },
  visibility: {
    src: tenantFacadeFrontImage,
    alt: "Façade principale et grand écran architectural visibles depuis le parvis",
    objectPosition: "center 58%",
  },
  universes: {
    src: interiorImage,
    alt: "Plateau intérieur réunissant mobilier, décoration et univers lifestyle",
    objectPosition: "center 60%",
  },
  architecture: {
    // La façade occupe le haut du cadre : un cadrage bas ne montrerait que le parvis.
    src: tenantFacadeLandscapeImage,
    alt: "Façade contemporaine d’AMABAY PLACE et passerelle d’accès",
    objectPosition: "center 32%",
  },
  levels: {
    src: floorPlansImage,
    alt: "Vue éclatée de l’organisation des niveaux d’AMABAY PLACE, du parking au R+3",
    fit: "contain",
  },
  atrium: {
    src: tenantAtriumImage,
    alt: "Atrium central avec galeries superposées et ascenseur panoramique",
    objectPosition: "center 42%",
  },
  "showroom-experience": {
    src: tenantOpenFloorImage,
    alt: "Plateau ouvert, lumineux et modulable destiné aux showrooms",
  },
  parking: {
    src: sitePlanImage,
    alt: "Vue aérienne des accès véhicules et de l’organisation du stationnement",
  },
  "connected-place": {
    src: tenantFountainBridgeImage,
    alt: "Parvis, fontaines et passerelle devant le bâtiment AMABAY PLACE",
  },
  "outdoor-experience": {
    src: plazaFountainsImage,
    alt: "Parvis paysager, fontaines, terrasses ombragées et stationnements",
  },
  brands: {
    src: atriumLowAngleImage,
    alt: "Contre-plongée sur l’atrium et ses galeries superposées",
    objectPosition: "center 38%",
  },
  night: {
    src: nightImage,
    // Cadrage décalé vers la droite : la tour, l’écran et l’axe routier plutôt
    // que les enseignes de showroom, illisibles à cette échelle.
    alt: "AMABAY PLACE illuminé à la tombée de la nuit, en bordure de l’Avenue Mohammed VI",
    objectPosition: "72% 60%",
  },
};

const navigation = [
  { label: "LOCALISATION", href: "#location" },
  { label: "UNIVERS", href: "#universes" },
  { label: "ARCHITECTURE", href: "#architecture" },
  { label: "CHIFFRES", href: "#key-figures" },
  { label: "ESPACES", href: "#showroom-experience" },
  { label: "ENSEIGNES", href: "#brands" },
  { label: "CONTACT", href: "#contact" },
] as const;

const byId = Object.fromEntries(
  contentSections.map((section) => [section.id, section]),
) as Record<string, ContentSection>;

const overviewIds = ["accessibility", "catchment", "visibility"] as const;
const spaceIds = ["parking", "connected-place", "outdoor-experience"] as const;

function SectionVisual({ id, className = "" }: { id: string; className?: string }) {
  const media = sectionMedia[id];
  if (!media) return null;

  return (
    <figure
      className={[
        "property-visual",
        media.fit === "contain" ? "is-plated" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(min-width: 1100px) 50vw, (min-width: 720px) 46vw, 100vw"
        placeholder="blur"
        style={{
          objectFit: media.fit ?? "cover",
          objectPosition: media.objectPosition ?? "center",
        }}
      />
      <span className="media-grain" aria-hidden="true" />
    </figure>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 32 16" aria-hidden="true">
      <path d="M2 8h27m-7-6 7 6-7 6" />
    </svg>
  );
}

/** Intitulé de rubrique : « 03 / LE BÂTIMENT », numéro en rouge signal. */
function Eyebrow({ index, label }: { index: number; label: string }) {
  return (
    <span className="property-eyebrow">
      <i>{String(index).padStart(2, "0")}</i> / {label}
    </span>
  );
}

export function AmabayExperience() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set(
          "[data-reveal], .hero-kicker, .hero-title-line, .hero-detail, .property-visual",
          { autoAlpha: 1, y: 0, clearProps: "clipPath" },
        );
        return;
      }

      const enter = (trigger: Element) => ({
        trigger,
        start: "clamp(top 88%)",
        once: true,
      });

      /* Reprend le masque du hero : chaque ligne monte derrière son propre
         cache. `autoSplit` refait la découpe au chargement des polices et au
         redimensionnement, `onSplit` reconstruit l'animation avec elle. */
      const revealLines = (
        element: HTMLElement,
        { duration = 1.1, stagger = 0.075, ease = "power4.out" } = {},
      ) =>
        SplitText.create(element, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "auto",
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration,
              ease,
              stagger,
              scrollTrigger: enter(element),
            }),
        });

      /* ---- Rang 1 — les trois moments choréographiés ---- */

      gsap
        .timeline({ defaults: { duration: 1.05, ease: "power3.out" } })
        .from(".hero-kicker", { autoAlpha: 0, y: 18 }, 0.2)
        .from(".hero-title-line", { yPercent: 115 }, 0.3)
        .from(".hero-detail", { autoAlpha: 0, y: 22, stagger: 0.1 }, 0.65)
        .from(".hero-rule", { scaleX: 0, transformOrigin: "left" }, 0.8);

      gsap.utils
        .toArray<HTMLElement>('[data-reveal="closing"]')
        .forEach((element) => revealLines(element, { duration: 1.35, stagger: 0.11 }));

      // Les chiffres : chaque glyphe roule derrière un cache, ligne après ligne.
      const statItems = gsap.utils.toArray<HTMLElement>(".property-stats-grid > div");
      if (statItems.length > 0) {
        const grid = statItems[0].parentElement as HTMLElement;
        statItems.forEach((item, index) => {
          const value = item.querySelector("dt");
          const label = item.querySelector("dd");
          const at = index * 0.09;

          const timeline = gsap.timeline({ scrollTrigger: enter(grid) });

          if (value) {
            SplitText.create(value, {
              // « words,chars » et non « chars » seul : sans les mots, chaque
              // glyphe devient un point de césure et « ENVIRON » se coupe.
              type: "words,chars",
              mask: "chars",
              autoSplit: true,
              aria: "auto",
              onSplit: (self) =>
                timeline.from(
                  self.chars,
                  { yPercent: 105, duration: 0.85, ease: "power4.out", stagger: 0.028 },
                  at,
                ),
            });
          }
          if (label) {
            timeline.from(label, { autoAlpha: 0, y: 10, duration: 0.6 }, at + 0.2);
          }
        });
      }

      /* ---- Rang 2 — titres de section et médias ---- */

      gsap.utils.toArray<HTMLElement>('[data-reveal="heading"]').forEach((element) => {
        revealLines(element);
      });

      gsap.utils
        .toArray<HTMLElement>('[data-reveal="statement"]')
        .forEach((element) => revealLines(element, { duration: 1.2, stagger: 0.09 }));

      gsap.utils.toArray<HTMLElement>(".property-visual").forEach((element) => {
        gsap.from(element, {
          clipPath: "inset(12% 0 0 0)",
          scale: 1.04,
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: { ...enter(element), start: "clamp(top 84%)" },
        });
      });

      /* ---- Rang 3 — le reste, presque rien ---- */

      gsap.utils.toArray<HTMLElement>('[data-reveal="lead"]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: enter(element),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="card"]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 18,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: enter(element),
        });
      });

      /* ---- Défilement lié : deux dérives et un calage, pas davantage ---- */

      const parallaxTargets = gsap.utils.toArray<HTMLElement>(
        [
          ".property-building-visual img",
          ".property-spaces-visual img",
          ".property-feature-visual img",
          ".property-universes-visual img",
          ".property-brands-visual img",
        ].join(", "),
      );

      parallaxTargets.forEach((image) => {
        const frame = image.closest("figure");
        if (!frame) return;
        // L'image est agrandie pour avoir de la matière à faire glisser sans
        // jamais découvrir le bord du cadre : le débord vaut 8 % de la hauteur
        // de chaque côté, la dérive n'en consomme que 5 %.
        gsap.set(image, { scale: 1.16 });
        gsap.fromTo(
          image,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      const closingImage = document.querySelector<HTMLElement>(".property-closing-image");
      const closingSection = document.querySelector<HTMLElement>(".property-closing");
      if (closingImage && closingSection) {
        gsap.fromTo(
          closingImage,
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: closingSection,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          },
        );
      }

      /* Pas d'épinglage : le bandeau des chiffres mesure ~980 px alors qu'une
         fenêtre de bureau courante en fait 900. Le figer masquerait sa base, et
         le réserver aux très grands écrans le rendrait incohérent. L'entrée
         chorégraphiée des chiffres suffit à marquer le moment. */
    },
    { scope: root },
  );

  const closeMenu = () => setMenuOpen(false);

  const introduction = byId.introduction;
  const homeLifeStyle = byId["home-life-style"];
  const location = byId.location;
  const universes = byId.universes;
  const architecture = byId.architecture;
  const verticalExperience = byId["vertical-experience"];
  const wayfinding = byId.wayfinding;
  const atrium = byId.atrium;
  const keyFigures = byId["key-figures"];
  const showroom = byId["showroom-experience"];
  const brands = byId.brands;
  const ecosystem = byId.ecosystem;
  const strapex = byId.strapex;

  const hasPhone = contactDetails.phone.length > 0;
  const hasEmail = contactDetails.email.length > 0;

  return (
    <main ref={root} className="site-shell content-site">
      <a className="skip-link" href="#main-content">
        Aller au contenu principal
      </a>

      <header
        className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-active" : ""}`}
      >
        <a className="wordmark" href="#top" onClick={closeMenu}>
          AMABAY PLACE
        </a>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="sr-only">{menuOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
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
        <p>{heroContent.title}</p>
      </div>

      <div id="main-content">
        <section id="top" className="content-hero" aria-labelledby="hero-title">
          <HeroBackgroundVideo className="hero-media" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="content-hero-copy">
            <p className="hero-kicker">AMABAY PLACE</p>
            <h1 id="hero-title" className="content-hero-title">
              <span className="title-mask">
                <span className="hero-title-line">{heroContent.title}</span>
              </span>
            </h1>
            <p className="content-hero-location hero-detail">{heroContent.location}</p>
            <div className="content-hero-actions hero-detail">
              <a href="#location">
                {heroContent.ctas[0]} <Arrow />
              </a>
              <a href="#showroom-experience">
                {heroContent.ctas[1]} <Arrow />
              </a>
            </div>
            <span className="hero-rule" aria-hidden="true" />
          </div>
        </section>

        <div className="content-flow content-flow--day">
          {/* 01 — Manifeste : l'ouverture narrative du projet. */}
          <section id="manifesto" className="property-manifesto" aria-labelledby="manifesto-heading">
            <div className="property-manifesto-lead">
              <Eyebrow index={1} label="LE PROJET" />
              <h2 id="manifesto-heading" data-reveal="heading">{introduction.title}</h2>
            </div>
            <div className="property-manifesto-copy" data-reveal="lead">
              {introduction.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="property-triptych" data-reveal="card">
              {homeLifeStyle.items?.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
            <p className="property-manifesto-signature" data-reveal="statement">{heroContent.signature}</p>
          </section>

          {/* 02 — Implantation. */}
          <section id="location" className="property-overview" aria-labelledby="overview-heading">
            <div className="property-section-heading">
              <div className="property-section-title">
                <Eyebrow index={2} label="IMPLANTATION" />
                <h2 id="overview-heading" data-reveal="heading">{location.title}</h2>
              </div>
              <div className="property-section-intro">
                {location.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {location.statement && (
                  <p className="property-section-statement">{location.statement}</p>
                )}
              </div>
            </div>

            <div className="property-card-grid">
              {overviewIds.map((id, index) => {
                const section = byId[id];
                return (
                  <article id={id} className="property-card" data-reveal="card" key={id}>
                    <SectionVisual id={id} />
                    <span className="property-card-index">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{section.title}</h3>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.items && (
                      <dl className="property-metrics">
                        {section.items.map((item, itemIndex) => (
                          <div key={`${id}-${itemIndex}`}>
                            <dt>{item.value}</dt>
                            <dd>{item.text}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* 03 — Les univers réunis sur le site. */}
          <section id="universes" className="property-universes" aria-labelledby="universes-heading">
            <SectionVisual id="universes" className="property-universes-visual" />
            <div className="property-universes-copy">
              <div>
                <Eyebrow index={3} label="LES UNIVERS" />
                <h2 id="universes-heading" data-reveal="heading">{universes.title}</h2>
                {universes.paragraphs?.map((paragraph) => (
                  <p className="property-universes-intro" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <ol className="property-universe-list" data-reveal="card">
                {universes.items?.map((item, index) => (
                  <li key={item.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 04 — Le bâtiment : façade, circulations et niveaux réunis. */}
          <section id="architecture" className="property-building" aria-labelledby="architecture-heading">
            <div className="property-building-head">
              <div className="property-building-title">
                <Eyebrow index={4} label="LE BÂTIMENT" />
                <h2 id="architecture-heading" data-reveal="heading">{architecture.title}</h2>
              </div>
              <div className="property-building-intro">
                {architecture.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {architecture.statement && (
                  <p className="property-building-statement">{architecture.statement}</p>
                )}
              </div>
            </div>

            <SectionVisual id="architecture" className="property-building-visual" />

            <div className="property-building-columns">
              <div className="property-building-column" data-reveal="card">
                {/* Le titre de section porte déjà l'accroche : la colonne prend un
                    intitulé court pour ne pas la répéter. */}
                <h3>Façade et volumes</h3>
                <ul className="property-attributes">
                  {architecture.items?.map((item) => (
                    <li key={item.text}>{item.text}</li>
                  ))}
                </ul>
              </div>
              <div className="property-building-column" data-reveal="card">
                <h3>{verticalExperience.title.replace(/\.$/, "")}</h3>
                {verticalExperience.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <ul className="property-attributes">
                  {verticalExperience.items?.map((item) => (
                    <li key={item.text}>{item.text}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="property-levels" data-reveal="card">
              <div className="property-levels-copy">
                <h3>{wayfinding.title}</h3>
                {wayfinding.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="property-levels-range">
                  {wayfinding.items?.find((item) => item.value)?.value}
                </p>
                <ul className="property-levels-list">
                  {wayfinding.items
                    ?.filter((item) => item.text)
                    .map((item) => (
                      <li key={item.text}>{item.text}</li>
                    ))}
                </ul>
              </div>
              <SectionVisual id="levels" className="property-levels-visual" />
            </div>
          </section>

          {/* 05 — L'atrium, seul grand bloc « feature » conservé. */}
          <section id="atrium" className="property-feature" aria-labelledby="atrium-heading">
            <SectionVisual id="atrium" className="property-feature-visual" />
            <article className="property-feature-copy">
              <Eyebrow index={5} label="LE CŒUR DU PROJET" />
              <h2 id="atrium-heading" data-reveal="heading">{atrium.title}</h2>
              <div className="property-feature-intro">
                {atrium.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {atrium.statement && (
                <p className="property-feature-statement">{atrium.statement}</p>
              )}
            </article>
          </section>
        </div>

        {/* 06 — Les chiffres, en bandeau sombre pleine largeur. */}
        <section id="key-figures" className="property-stats" aria-labelledby="stats-heading">
          <div className="property-stats-inner">
            <div className="property-stats-heading">
              <Eyebrow index={6} label="DIMENSIONS" />
              <h2 id="stats-heading" data-reveal="heading">{keyFigures.title}</h2>
            </div>
            <dl className="property-stats-grid">
              {keyFigures.items?.map((item, index) => (
                <div key={`stat-${index}`}>
                  <dt>{item.value}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="content-flow content-flow--dusk">
          {/* 07 — Espaces et services. */}
          <section id="showroom-experience" className="property-spaces" aria-labelledby="spaces-heading">
            <div className="property-section-heading">
              <div className="property-section-title">
                <Eyebrow index={7} label="ESPACES & SERVICES" />
                <h2 id="spaces-heading" data-reveal="heading">{showroom.title}</h2>
              </div>
              <div className="property-section-intro">
                {showroom.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {showroom.statement && (
                  <p className="property-section-statement">{showroom.statement}</p>
                )}
              </div>
            </div>

            <figure className="property-visual property-spaces-visual">
              <Image
                src={sectionMedia["showroom-experience"].src}
                alt={sectionMedia["showroom-experience"].alt}
                fill
                sizes="(min-width: 1100px) 1380px, 100vw"
                placeholder="blur"
                style={{ objectFit: "cover", objectPosition: "center 55%" }}
              />
              <span className="media-grain" aria-hidden="true" />
            </figure>

            <div className="property-card-grid property-card-grid--spaces">
              {spaceIds.map((id, index) => {
                const section = byId[id];
                return (
                  <article id={id} className="property-card" data-reveal="card" key={id}>
                    <SectionVisual id={id} />
                    <span className="property-card-index">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{section.title}</h3>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.items && (
                      <ul className="property-attributes">
                        {section.items.map((item) => (
                          <li key={item.text}>{item.text}</li>
                        ))}
                      </ul>
                    )}
                    {section.statement && (
                      <p className="property-card-statement">{section.statement}</p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* 08 — L'argumentaire enseignes : la cible commerciale du site. */}
          <section id="brands" className="property-brands" aria-labelledby="brands-heading">
            <div className="property-brands-copy">
              <div>
                <Eyebrow index={8} label="POUR LES ENSEIGNES" />
                <h2 id="brands-heading" data-reveal="heading">{brands.title}</h2>
                {brands.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {brands.statement && <p className="property-brands-statement">{brands.statement}</p>}
              </div>
              <div className="property-ecosystem" data-reveal="card">
                <h3>{ecosystem.title}</h3>
                {ecosystem.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {ecosystem.statement && (
                  <p className="property-ecosystem-statement">{ecosystem.statement}</p>
                )}
              </div>
            </div>
            <SectionVisual id="brands" className="property-brands-visual" />
          </section>

          {/* 09 — L'histoire du groupe : la preuve de solidité. */}
          <section id="strapex" className="property-heritage" aria-labelledby="heritage-heading">
            <div className="property-heritage-head">
              <Eyebrow index={9} label="LE GROUPE" />
              <h2 id="heritage-heading" data-reveal="heading">{strapex.title}</h2>
              {strapex.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ol className="property-timeline" data-reveal="card">
              {strapex.items?.map((item) => (
                <li key={item.value}>
                  <strong>{item.value}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ol>
            {strapex.statement && (
              <p className="property-heritage-statement" data-reveal="statement">{strapex.statement}</p>
            )}
          </section>
        </div>

        {/* 10 — Déclaration de clôture, en pleine image. */}
        <section className="property-closing" aria-labelledby="closing-heading">
          <Image
            className="property-closing-image"
            src={sectionMedia.night.src}
            alt={sectionMedia.night.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            style={{ objectFit: "cover", objectPosition: sectionMedia.night.objectPosition }}
          />
          <div className="property-closing-shade" aria-hidden="true" />
          <div className="property-closing-copy">
            <h2 id="closing-heading" data-reveal="closing">
              {finalStatement.title}
            </h2>
            {finalStatement.paragraphs.map((paragraph) => (
              <p data-reveal="lead" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <p className="property-closing-signature" data-reveal="lead">
              <strong>{finalStatement.signature}</strong>
              <span>{finalStatement.closing}</span>
            </p>
          </div>
        </section>

        {/* 11 — Contact : le point de conversion. */}
        <section id="contact" className="content-contact" aria-labelledby="contact-heading">
          <div className="content-contact-inner">
            <div className="content-contact-lead">
              <Eyebrow index={10} label="CONTACT" />
              <h2 id="contact-heading" data-reveal="heading">
                {finalCta.title}
              </h2>
              <p className="content-contact-intro" data-reveal="lead">{finalCta.introduction}</p>
              <p data-reveal="lead">{finalCta.text}</p>
            </div>

            <div className="content-contact-form" data-reveal="card">
              <ContactForm />
            </div>

            <div className="content-contact-panel" data-reveal="card">
              <ul className="contact-channels">
                {hasPhone && (
                  <li>
                    <span>Téléphone</span>
                    <a href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}>
                      {contactDetails.phoneLabel || contactDetails.phone}
                    </a>
                  </li>
                )}
                {hasEmail && (
                  <li>
                    <span>E-mail</span>
                    <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
                  </li>
                )}
                <li>
                  <span>Adresse</span>
                  <a
                    href={contactDetails.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {finalCta.address}
                    <br />
                    {finalCta.city}
                    <em>{contactDetails.mapsLabel}</em>
                  </a>
                </li>
              </ul>

              <div className="content-contact-actions">
                <a href="#brands">
                  Devenir partenaire <Arrow />
                </a>
                <a href="#showroom-experience">
                  Découvrir nos espaces <Arrow />
                </a>
                {hasEmail && (
                  <a
                    href={`mailto:${contactDetails.email}?subject=${encodeURIComponent(
                      "Organiser une visite d’AMABAY PLACE",
                    )}`}
                  >
                    Organiser une visite <Arrow />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="site-footer-inner">
            <div className="site-footer-brand">
              <strong>{finalCta.brand}</strong>
              <address>
                {finalCta.address}
                <br />
                {finalCta.city}
              </address>
            </div>
            <nav className="site-footer-nav" aria-label="Navigation de pied de page">
              {navigation.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="site-footer-legal">
              <span>{finalStatement.signature}</span>
              <span>© {new Date().getFullYear()} AMABAY PLACE — Groupe STRAPEX Maroc</span>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
