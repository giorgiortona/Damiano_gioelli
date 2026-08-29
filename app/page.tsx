"use client";

import { useEffect, useRef, useState } from "react";

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Gioielleria+Damiano+Oro+e+Gioielli+Galatone";

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const timeSection = useRef<HTMLElement>(null);
  const timepieceAnimation = useRef<{ play: () => void; reverse: () => void } | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timepieceActive, setTimepieceActive] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileMenuOpen);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const toggleTimepiece = () => {
    setTimepieceActive((isActive) => {
      const nextState = !isActive;
      if (nextState) timepieceAnimation.current?.play();
      else timepieceAnimation.current?.reverse();
      return nextState;
    });
  };

  useEffect(() => {
    let cancelled = false;
    let cleanupAnimations: (() => void) | undefined;

    const startAnimations = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const responsiveAnimations = gsap.matchMedia();
      const context = gsap.context(() => {
      if (reducedMotion) {
        setLoaderDone(true);
        gsap.set("[data-reveal]", { clearProps: "all" });
        return;
      }

      document.body.classList.add("is-loading");
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.body.classList.remove("is-loading");
          setLoaderDone(true);
          ScrollTrigger.refresh();
        },
      });

      intro
        .fromTo(".loader-mark", { scale: 0.82, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9 })
        .to(".loader-progress-fill", { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.15)
        .to(".loader-count", { opacity: 1, duration: 0.35 }, 0.3)
        .to(loader.current, { yPercent: -100, duration: 1.05, ease: "power4.inOut" }, ">-0.1")
        .from(".hero-reveal", { y: 70, opacity: 0, duration: 1.1, stagger: 0.09 }, "-=0.5")
        .from(".hero-visual", { scale: 1.08, duration: 1.55, ease: "power3.out" }, "-=1.25")
        .from(".hero-orbit", { scale: 0.6, rotate: -80, opacity: 0, duration: 1.3 }, "-=1.1");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      const composeTimepiece = (timeline: ReturnType<typeof gsap.timeline>) => {
        timeline
          .fromTo(".timepiece", { scale: 0.58, rotate: -12, yPercent: 8 }, { scale: 1, rotate: 0, yPercent: 0, duration: 1.55, ease: "power3.inOut" }, 0)
          .fromTo(".timepiece-orbit", { scale: 0.72, rotate: -120, opacity: .15 }, { scale: 1, rotate: 240, opacity: 1, duration: 1.7, ease: "power2.inOut" }, 0)
          .fromTo(".timepiece-watch", { clipPath: "circle(27% at 50% 50%)", filter: "brightness(.62) blur(7px) drop-shadow(0 20px 18px rgba(29,25,20,.12))" }, { clipPath: "circle(72% at 50% 50%)", filter: "brightness(1) blur(0px) drop-shadow(0 38px 30px rgba(29,25,20,.22))", duration: 1.35, ease: "power3.inOut" }, 0.08)
          .fromTo(".timepiece-sweep", { rotate: -90, opacity: 0 }, { rotate: 630, opacity: .9, duration: 1.7, ease: "power1.inOut" }, 0.08)
          .fromTo(".timepiece-reflection", { xPercent: -230, opacity: 0 }, { xPercent: 230, opacity: .65, duration: 1.25, ease: "power2.inOut" }, 0.22)
          .fromTo(".time-copy--left", { xPercent: -40, opacity: 0 }, { xPercent: 0, opacity: 1, duration: .8, ease: "power2.out" }, 0.08)
          .fromTo(".time-copy--right", { xPercent: 40, opacity: 0 }, { xPercent: 0, opacity: 1, duration: .8, ease: "power2.out" }, 0.62)
          .to(".timepiece-dial-glow", { opacity: .78, scale: 1.08, duration: .72, ease: "power2.inOut" }, 0.78);
        return timeline;
      };

      responsiveAnimations.add("(min-width: 901px)", () => {
        gsap.utils.toArray<HTMLImageElement>("[data-parallax]").forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 1 },
            },
          );
        });

        composeTimepiece(gsap.timeline({
          scrollTrigger: {
            trigger: timeSection.current,
            start: "top top",
            end: "+=230%",
            pin: ".timepiece-stage",
            scrub: 1.2,
          },
        }));

        gsap.to(".atelier-track", {
          xPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: ".atelier-gallery", start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      responsiveAnimations.add("(max-width: 900px)", () => {
        const mobileTimeline = composeTimepiece(gsap.timeline({ paused: true }));
        timepieceAnimation.current = mobileTimeline;

        return () => {
          if (timepieceAnimation.current === mobileTimeline) timepieceAnimation.current = null;
        };
      });
      }, root);

      cleanupAnimations = () => {
        timepieceAnimation.current = null;
        responsiveAnimations.revert();
        context.revert();
      };
    };

    void startAnimations();

    return () => {
      cancelled = true;
      document.body.classList.remove("is-loading");
      cleanupAnimations?.();
    };
  }, []);

  return (
    <main ref={root}>
      {loaderDone ? null : (
        <div className="loader" ref={loader} aria-label="Caricamento del sito">
          <div className="loader-mark">
            <img src="/images/logo_damiano.jpeg" alt="Damiano Oro e Gioielli" width="1075" height="937" decoding="async" />
          </div>
          <p className="loader-count">Galatone · Atelier orafo</p>
          <div className="loader-progress"><span className="loader-progress-fill" /></div>
        </div>
      )}

      <header className={`site-header${mobileMenuOpen ? " menu-is-open" : ""}`}>
        <a className="wordmark" href="#top" aria-label="Damiano Oro e Gioielli, torna all'inizio">
          <span>Damiano</span>
          <small>Oro e Gioielli</small>
        </a>
        <nav className="desktop-navigation" aria-label="Navigazione principale">
          <a href="#atelier">Atelier</a>
          <a href="#gioielli">Gioielli</a>
          <a href="#contatti">Contatti</a>
        </nav>
        <a className="header-cta" href="tel:+393930436460">Parliamone</a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span className="menu-toggle-label" aria-hidden="true">
            <span className="menu-toggle-label-open">Menu</span>
            <span className="menu-toggle-label-close">Chiudi</span>
          </span>
          <span className="menu-toggle-seal" aria-hidden="true">
            <span className="menu-toggle-orbit">
              <span className="menu-toggle-gem" />
            </span>
            <span className="menu-toggle-line menu-toggle-line--top" />
            <span className="menu-toggle-line menu-toggle-line--bottom" />
          </span>
        </button>
      </header>

      <nav
        className={`mobile-navigation${mobileMenuOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Navigazione mobile"
        aria-hidden={!mobileMenuOpen}
      >
        <p>Menu</p>
        <a href="#atelier" onClick={closeMobileMenu}><span>01</span> Atelier</a>
        <a href="#gioielli" onClick={closeMobileMenu}><span>02</span> Gioielli</a>
        <a href="#contatti" onClick={closeMobileMenu}><span>03</span> Contatti</a>
        <a className="mobile-call" href="tel:+393930436460" onClick={closeMobileMenu}>Chiama l&apos;atelier <span>↗</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow hero-reveal">Atelier orafo · Galatone</p>
          <h1 className="hero-reveal">Il tempo<br />diventa <em>prezioso.</em></h1>
          <p className="hero-intro hero-reveal">
            Gioielli in oro, orologi di pregio e pezzi unici realizzati a mano.
          </p>
          <a className="text-link hero-reveal" href="#atelier">Scopri l&apos;atelier <span>↘</span></a>
        </div>

        <div className="hero-visual">
          <img src="/images/image00008.jpg" alt="Collana in oro indossata" width="1440" height="1920" loading="eager" fetchPriority="high" />
          <div className="hero-orbit" aria-hidden="true"><span /></div>
          <div className="edition-note">01 — Luce, materia, gesto</div>
        </div>

        <div className="hero-index" aria-hidden="true">
          <span>40°08&apos;53.5&quot;N</span>
          <span>18°04&apos;11.3&quot;E</span>
        </div>
        <a className="scroll-cue" href="#manifesto" aria-label="Scorri alla sezione successiva"><span /></a>
      </section>

      <section className="manifesto section-pad" id="manifesto">
        <div className="section-number" data-reveal>02 / 09</div>
        <div className="manifesto-head">
          <p className="eyebrow dark" data-reveal>Ogni dettaglio ha una storia</p>
          <h2 data-reveal>Dove la materia<br />incontra il <em>gesto.</em></h2>
        </div>
        <div className="manifesto-grid">
          <figure className="image-card image-card--red" data-reveal>
            <div className="image-shell"><img data-parallax src="/images/image00009.jpg" alt="Bracciale in oro indossato" width="4000" height="6000" loading="lazy" decoding="async" /></div>
            <figcaption>La luce che accompagna</figcaption>
          </figure>
          <p className="manifesto-copy" data-reveal>
            Scegliere un gioiello è riconoscersi in un dettaglio. Nel nostro atelier ogni forma nasce dall&apos;ascolto, dalla precisione e dal tempo dedicato alle cose fatte bene.
          </p>
          <figure className="image-card image-card--still" data-reveal>
            <div className="image-shell"><img data-parallax src="/images/image00004.jpg" alt="Selezione di gioielli in oro" width="1440" height="1920" loading="lazy" decoding="async" /></div>
            <figcaption>Materia da interpretare</figcaption>
          </figure>
        </div>
      </section>

      <section className="time-section" ref={timeSection} aria-label="Hamilton Jazzmaster Open Heart animato con lo scorrimento o con un tocco">
        <div className="timepiece-stage">
          <div className="time-copy time-copy--left">
            <span>H32705131</span>
            <p>Hamilton<br /><em>Jazzmaster</em></p>
          </div>

          <div className="timepiece" aria-hidden="true">
            <div className="timepiece-orbit" />
            <div className="timepiece-dial-glow" />
            <img
              className="timepiece-watch"
              src="/images/hamilton-jazzmaster-open-heart.webp"
              alt=""
              width="2000"
              height="2000"
              loading="lazy"
              decoding="async"
            />
            <i className="timepiece-sweep" />
            <b className="timepiece-pin" />
            <i className="timepiece-reflection" />
          </div>

          <button
            className="timepiece-trigger"
            type="button"
            aria-label={timepieceActive ? "Riporta l'Hamilton allo stato iniziale" : "Anima l'Hamilton Jazzmaster"}
            aria-pressed={timepieceActive}
            onClick={toggleTimepiece}
          >
            <span className="timepiece-trigger-ring" aria-hidden="true" />
          </button>

          <div className="time-copy time-copy--right">
            <span>H-10</span>
            <p>Open Heart<br />Automatico</p>
          </div>
          <p className="time-caption">
            <span className="desktop-instruction">Scorri per rivelare il movimento</span>
            <span className="mobile-instruction">{timepieceActive ? "Tocca per tornare all'inizio" : "Tocca l'Hamilton per animarlo"}</span>
          </p>
        </div>
      </section>

      <section className="atelier" id="atelier">
        <div className="atelier-intro section-pad">
          <div className="section-number light" data-reveal>04 / 09</div>
          <p className="eyebrow" data-reveal>Dentro l&apos;atelier</p>
          <h2 data-reveal>La cura non si vede.<br /><em>Si riconosce.</em></h2>
          <p className="atelier-copy" data-reveal>
            Esperienza artigiana e tecnologia di precisione si incontrano in ogni fase della lavorazione.
          </p>
        </div>

        <div className="atelier-gallery">
          <div className="atelier-track">
            <figure><img src="/images/image00001.jpg" alt="Artigiano al lavoro su un anello" width="1536" height="2048" loading="lazy" decoding="async" /><figcaption>Finitura</figcaption></figure>
            <figure><img src="/images/image00002.jpg" alt="Controllo di precisione al microscopio" width="1536" height="2048" loading="lazy" decoding="async" /><figcaption>Controllo</figcaption></figure>
            <figure><img src="/images/image00003.jpg" alt="Dettaglio della lavorazione sul monitor" width="1536" height="2048" loading="lazy" decoding="async" /><figcaption>Dettaglio</figcaption></figure>
            <figure><img src="/images/image00006.jpg" alt="Lavorazione orafa al microscopio" width="1639" height="2048" loading="lazy" decoding="async" /><figcaption>Precisione</figcaption></figure>
            <figure><img src="/images/image00007.jpg" alt="Lavorazione manuale di un gioiello" width="1639" height="2048" loading="lazy" decoding="async" /><figcaption>Gesto</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="collections section-pad" id="gioielli">
        <div className="collections-head">
          <div className="section-number" data-reveal>06 / 09</div>
          <p className="eyebrow dark" data-reveal>Una scelta personale</p>
          <h2 data-reveal>Forme che<br /><em>restano.</em></h2>
        </div>
        <div className="collection-list">
          <article data-reveal>
            <span>01</span>
            <h3>Creazioni in oro</h3>
            <p>Gioielli scelti per luce, equilibrio e carattere.</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <h3>Pezzi unici</h3>
            <p>Realizzati a mano per raccontare qualcosa di tuo.</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <h3>Orologi di pregio</h3>
            <p>Il tempo, interpretato con stile e precisione.</p>
          </article>
        </div>
      </section>

      <section className="quote-section">
        <div className="rating" data-reveal>
          <strong>4,7</strong>
          <span>★★★★★<br />26 recensioni Google</span>
        </div>
        <blockquote data-reveal>
          “Personale qualificato e disponibile, gentilezza e grande professionalità.”
          <cite>— Laura M.</cite>
        </blockquote>
        <a className="text-link dark-link" href={mapsUrl} target="_blank" rel="noreferrer" data-reveal>Leggi le recensioni <span>↗</span></a>
      </section>

      <section className="contact" id="contatti">
        <div className="contact-image"><img data-parallax src="/images/image00009.jpg" alt="Bracciale in oro su fondo rosso" width="4000" height="6000" loading="lazy" decoding="async" /></div>
        <div className="contact-panel">
          <p className="eyebrow" data-reveal>Vieni a trovarci</p>
          <h2 data-reveal>Inizia da<br />un <em>incontro.</em></h2>
          <address data-reveal>
            Via Camillo Benso Conte di Cavour, 33<br />73044 Galatone LE
          </address>
          <div className="contact-actions" data-reveal>
            <a href="tel:+393930436460">+39 393 043 6460 <span>↗</span></a>
            <a href={mapsUrl} target="_blank" rel="noreferrer">Indicazioni <span>↗</span></a>
          </div>
          <div className="social-links" data-reveal>
            <a href="https://www.instagram.com/damiano_oroegioielli/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61577544963505" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top"><span>Damiano</span><small>Oro e Gioielli</small></a>
        <p>Atelier orafo e gioielleria a Galatone.</p>
        <a href="#top">Torna su ↑</a>
      </footer>
    </main>
  );
}
