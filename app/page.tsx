"use client";

import { useEffect, useRef, useState } from "react";

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Gioielleria+Damiano+Oro+e+Gioielli+Galatone";

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const ringSection = useRef<HTMLElement>(null);
  const timeSection = useRef<HTMLElement>(null);
  const timepieceAnimation = useRef<{ play: () => void; reverse: () => void } | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timepieceActive, setTimepieceActive] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileMenuOpen);
    if (mobileMenuOpen) header.current?.classList.remove("is-hidden");

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let frameRequested = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - previousScrollY;

      if (currentScrollY < 40 || scrollDifference < -6) {
        header.current?.classList.remove("is-hidden");
      } else if (scrollDifference > 6 && currentScrollY > 120 && !document.body.classList.contains("menu-open")) {
        header.current?.classList.add("is-hidden");
      }

      if (Math.abs(scrollDifference) > 4) previousScrollY = currentScrollY;
      frameRequested = false;
    };

    const handleScroll = () => {
      if (frameRequested) return;
      frameRequested = true;
      window.requestAnimationFrame(updateHeader);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        .from(".ring-intro-reveal", { y: 58, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.5")
        .from(".ring-assembly", { scale: 0.88, opacity: 0, duration: 1.35, ease: "power3.out" }, "-=1.12")
        .from(".ring-orbit-frame", { scale: 0.68, rotate: -80, opacity: 0, duration: 1.3 }, "-=1.1");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      const composeRing = (timeline: ReturnType<typeof gsap.timeline>) => {
        timeline
          .fromTo(".ring-stage-glow", { scale: .62, opacity: .08 }, { scale: 1.08, opacity: .82, duration: 1.9, ease: "power2.inOut" }, 0)
          .fromTo(".ring-orbit--outer", { scale: .66, rotate: -150, opacity: .08 }, { scale: 1, rotate: 300, opacity: .72, duration: 1.9, ease: "power2.inOut" }, 0)
          .fromTo(".ring-orbit--inner", { scale: .5, rotate: 120, opacity: 0 }, { scale: 1, rotate: -260, opacity: .48, duration: 1.9, ease: "power2.inOut" }, 0)
          .fromTo(".ring-assembly-core", { scale: .56, rotate: -145, yPercent: 10 }, { scale: 1, rotate: 360, yPercent: 0, duration: 1.9, ease: "power3.inOut" }, 0)
          .fromTo(".ring-assembly-core", { clipPath: "circle(7% at 50% 24%)" }, { clipPath: "circle(76% at 50% 50%)", duration: 1.5, ease: "power3.inOut" }, .08)
          .fromTo(".ring-band", { opacity: .08, filter: "blur(10px) brightness(.55)" }, { opacity: 1, filter: "blur(0px) brightness(1)", duration: 1.5, ease: "power3.inOut" }, .08)
          .fromTo(".ring-fragment", { scale: .15, opacity: 0, rotate: -110 }, { scale: 1, opacity: .85, rotate: 90, duration: .72, stagger: .08, ease: "power2.out" }, .18)
          .to(".ring-fragment", { scale: .2, opacity: 0, duration: .55, stagger: .06, ease: "power2.in" }, .9)
          .fromTo(".ring-diamond", { yPercent: -330, scale: .18, rotate: -150, opacity: 0, filter: "blur(8px) brightness(1.8)" }, { yPercent: 0, scale: 1, rotate: 0, opacity: 1, filter: "blur(0px) brightness(1.04)", duration: .74, ease: "power4.in" }, 1.02)
          .fromTo(".ring-complete", { opacity: 0, filter: "blur(2px) brightness(1.5)" }, { opacity: 1, filter: "blur(0px) brightness(1)", duration: .22, ease: "power2.out" }, 1.74)
          .to(".ring-band, .ring-diamond", { opacity: 0, duration: .22, ease: "power2.out" }, 1.74)
          .fromTo(".ring-set-flash", { scale: .15, opacity: 0 }, { scale: 1.75, opacity: .9, duration: .25, ease: "power2.out" }, 1.74)
          .to(".ring-set-flash", { scale: 2.5, opacity: 0, duration: .42, ease: "power2.out" }, 1.92)
          .fromTo(".ring-copy--left", { xPercent: -35, opacity: 0 }, { xPercent: 0, opacity: 1, duration: .72, ease: "power2.out" }, .12)
          .fromTo(".ring-copy--right", { xPercent: 35, opacity: 0 }, { xPercent: 0, opacity: 1, duration: .72, ease: "power2.out" }, 1.18)
          .set(".opening-hero", { visibility: "visible" }, 2.16)
          .fromTo(".opening-hero", { opacity: 0 }, { opacity: 1, duration: 1.02, ease: "power3.inOut" }, 2.16)
          .fromTo(".opening-hero .hero-visual", { scale: 1.13, clipPath: "inset(15% 15% 15% 15%)" }, { scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.08, ease: "power3.inOut" }, 2.12)
          .fromTo(".opening-hero .hero-copy > *", { y: 62, opacity: 0 }, { y: 0, opacity: 1, duration: .82, stagger: .08, ease: "power3.out" }, 2.38)
          .fromTo(".opening-hero .hero-orbit", { scale: .62, rotate: -90, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: .92, ease: "power3.out" }, 2.42)
          .to(".ring-scene", { scale: .76, yPercent: -3, opacity: 0, filter: "blur(12px)", duration: .92, ease: "power3.inOut" }, 2.18);
        return timeline;
      };

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

      composeRing(gsap.timeline({
        scrollTrigger: {
          trigger: ringSection.current,
          start: "top top",
          end: "+=300%",
          pin: ".ring-stage",
          scrub: 1.1,
          anticipatePin: 1,
        },
      }));

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

        const atelierGallery = root.current?.querySelector<HTMLElement>(".atelier-gallery");
        const atelierTrack = root.current?.querySelector<HTMLElement>(".atelier-track");

        if (atelierGallery && atelierTrack) {
          gsap.to(atelierTrack, {
            x: () => -Math.max(0, atelierTrack.scrollWidth - atelierGallery.clientWidth),
            ease: "none",
            scrollTrigger: {
              trigger: atelierGallery,
              start: "top 82%",
              end: "bottom 18%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
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

      <header ref={header} className={`site-header${mobileMenuOpen ? " menu-is-open" : ""}`}>
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
        aria-label="Navigazione principale"
        aria-hidden={!mobileMenuOpen}
      >
        <p>Menu</p>
        <a href="#atelier" onClick={closeMobileMenu}><span>01</span> Atelier</a>
        <a href="#gioielli" onClick={closeMobileMenu}><span>02</span> Gioielli</a>
        <a href="#contatti" onClick={closeMobileMenu}><span>03</span> Contatti</a>
        <a className="mobile-call" href="tel:+393930436460" onClick={closeMobileMenu}>Chiama l&apos;atelier <span>↗</span></a>
      </nav>

      <section className="ring-section" id="top" ref={ringSection} aria-label="Anello con diamante che si compone durante lo scorrimento">
        <div className="ring-stage">
          <div className="ring-scene">
            <div className="ring-stage-glow" aria-hidden="true" />

            <div className="ring-copy ring-copy--left ring-intro-reveal">
              <span>Materia</span>
              <p>La forma<br /><em>prende vita.</em></p>
            </div>

            <div className="ring-assembly" aria-hidden="true">
              <div className="ring-orbit-frame ring-orbit ring-orbit--outer" />
              <div className="ring-orbit ring-orbit--inner" />
              <span className="ring-fragment ring-fragment--one" />
              <span className="ring-fragment ring-fragment--two" />
              <span className="ring-fragment ring-fragment--three" />
              <div className="ring-assembly-core">
                <img
                  className="ring-band ring-band--back"
                  src="/images/diamond-ring-setting.png"
                  alt=""
                  width="1254"
                  height="1254"
                  loading="eager"
                  fetchPriority="high"
                />
                <img
                  className="ring-diamond"
                  src="/images/round-brilliant-diamond.png"
                  alt=""
                  width="1254"
                  height="1254"
                  loading="eager"
                  fetchPriority="high"
                />
                <img
                  className="ring-band ring-band--front"
                  src="/images/diamond-ring-setting.png"
                  alt=""
                  width="1254"
                  height="1254"
                  loading="eager"
                  fetchPriority="high"
                />
                <img
                  className="ring-complete"
                  src="/images/diamond-ring-complete.png"
                  alt=""
                  width="1254"
                  height="1254"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <span className="ring-set-flash" />
            </div>

            <div className="ring-copy ring-copy--right ring-intro-reveal">
              <span>Diamante</span>
              <p>La luce<br /><em>trova casa.</em></p>
            </div>

            <p className="ring-caption ring-intro-reveal">
              <span className="desktop-instruction">Scorri per comporre l&apos;anello e rivelare l&apos;atelier</span>
              <span className="mobile-instruction">Scorri per incastonare il diamante</span>
            </p>
          </div>

          <div className="hero opening-hero" id="intro">
            <div className="hero-copy">
              <p className="eyebrow">Atelier orafo · Galatone</p>
              <h1>Il tempo<br />diventa <em>prezioso.</em></h1>
              <p className="hero-intro">
                Oro, argento, orologi e oggetti preziosi per la casa, scelti e lavorati con cura.
              </p>
              <a className="text-link" href="#atelier">Scopri l&apos;atelier <span>↘</span></a>
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
          </div>
        </div>
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
            <span className="timepiece-trigger-hint" aria-hidden="true">
              <strong>{timepieceActive ? "Premi ancora" : "Premi qui"}</strong>
              <small>{timepieceActive ? "per ricominciare" : "per animare"}</small>
            </span>
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
            Esperienza artigiana e tecnologia di precisione si incontrano nella lavorazione di gioielli in oro e argento, dal primo gesto all&apos;ultima finitura.
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
          <p className="eyebrow dark" data-reveal>Gioielli, tempo, casa</p>
          <h2 data-reveal>Forme che<br /><em>restano.</em></h2>
        </div>
        <div className="collection-list">
          <article data-reveal>
            <span>01</span>
            <h3>Oro e argento</h3>
            <p>Gioielli scelti per luce, equilibrio e carattere.</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <h3>Lavorazioni orafe</h3>
            <p>Precisione artigiana dedicata a ogni gioiello.</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <h3>Orologi di pregio</h3>
            <p>Il tempo, interpretato con stile e precisione.</p>
          </article>
          <article data-reveal>
            <span>04</span>
            <h3>Casa e cornici</h3>
            <p>Oggetti preziosi, cornici e dettagli d&apos;arredo eleganti.</p>
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
          <div className="opening-hours" data-reveal>
            <span>Orari</span>
            <p>
              Martedì — Sabato
              <strong>09:30 — 13:00&nbsp;&nbsp;·&nbsp;&nbsp;17:00 — 20:00</strong>
            </p>
          </div>
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
