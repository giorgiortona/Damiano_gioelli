"use client";

import { useEffect, useRef, useState } from "react";

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Gioielleria+Damiano+Oro+e+Gioielli+Galatone";

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const timeSection = useRef<HTMLElement>(null);
  const [loaderDone, setLoaderDone] = useState(false);

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

      const timeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: timeSection.current,
          start: "top top",
          end: "+=230%",
          pin: ".timepiece-stage",
          scrub: 1.2,
        },
      });

      timeTimeline
        .fromTo(".timepiece", { scale: 0.48, rotate: -45 }, { scale: 1, rotate: 28, ease: "power2.inOut" }, 0)
        .fromTo(".timepiece-outer", { rotate: -90 }, { rotate: 300, ease: "none" }, 0)
        .fromTo(".timepiece-gem", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(49% at 50% 50%)", ease: "power2.inOut" }, 0.1)
        .fromTo(".timepiece-hand--long", { rotate: -30 }, { rotate: 690, ease: "none" }, 0)
        .fromTo(".timepiece-hand--short", { rotate: 40 }, { rotate: 220, ease: "none" }, 0)
        .fromTo(".time-copy--left", { xPercent: -40, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "power2.out" }, 0.05)
        .fromTo(".time-copy--right", { xPercent: 40, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "power2.out" }, 0.45)
        .to(".timepiece-core", { boxShadow: "0 0 80px rgba(201,163,93,.38)", ease: "power2.inOut" }, 0.55);

      gsap.to(".atelier-track", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: ".atelier-gallery", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      }, root);

      cleanupAnimations = () => context.revert();
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

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Damiano Oro e Gioielli, torna all'inizio">
          <span>Damiano</span>
          <small>Oro e Gioielli</small>
        </a>
        <nav aria-label="Navigazione principale">
          <a href="#atelier">Atelier</a>
          <a href="#gioielli">Gioielli</a>
          <a href="#contatti">Contatti</a>
        </nav>
        <a className="header-cta" href="tel:+393930436460">Parliamone</a>
      </header>

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

      <section className="time-section" ref={timeSection} aria-label="Il gioiello prende forma con lo scorrimento">
        <div className="timepiece-stage">
          <div className="time-copy time-copy--left">
            <span>01</span>
            <p>Il tempo<br />della scelta</p>
          </div>

          <div className="timepiece" aria-hidden="true">
            <div className="timepiece-outer" />
            <div className="timepiece-core">
              <img className="timepiece-gem" src="/images/image00005.jpg" alt="" width="1440" height="1920" loading="lazy" decoding="async" />
              <i className="timepiece-hand timepiece-hand--long" />
              <i className="timepiece-hand timepiece-hand--short" />
              <b className="timepiece-pin" />
            </div>
          </div>

          <div className="time-copy time-copy--right">
            <span>02</span>
            <p>La precisione<br />del dettaglio</p>
          </div>
          <p className="time-caption">Scorri per comporre il gioiello</p>
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
