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
  const scrollTriggerApi = useRef<typeof import("gsap/ScrollTrigger").ScrollTrigger | null>(null);
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

  const jumpTo = (top: number) => {
    // Con il menu aperto il body ha overflow nascosto: lo sblocco prima di spostarmi.
    document.body.classList.remove("menu-open");
    setMobileMenuOpen(false);
    window.scrollTo({ top, left: 0, behavior: "instant" as ScrollBehavior });

    // I trigger con scrub inseguono lo scroll con un ritardo: li porto subito a destinazione.
    const ScrollTrigger = scrollTriggerApi.current;
    if (ScrollTrigger) {
      ScrollTrigger.update();
      ScrollTrigger.getAll().forEach((trigger) => trigger.getTween()?.progress(1));
    }
  };

  const jumpToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    jumpTo(0);
  };

  const jumpToSection = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = event.currentTarget.getAttribute("href");
    const target = hash?.startsWith("#") ? document.querySelector(hash) : null;
    if (!target) return;

    event.preventDefault();
    jumpTo(window.scrollY + target.getBoundingClientRect().top);
  };

  const toggleTimepiece = () => {
    setTimepieceActive((isActive) => {
      const nextState = !isActive;
      if (nextState) timepieceAnimation.current?.play();
      else timepieceAnimation.current?.reverse();
      return nextState;
    });
  };

  const moveFooterBrand = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--footer-x", `${(x * 18).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--footer-y", `${(y * 12).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--footer-rotate-x", `${(-y * 3).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--footer-rotate-y", `${(x * 3).toFixed(2)}deg`);
  };

  const resetFooterBrand = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--footer-x", "0px");
    event.currentTarget.style.setProperty("--footer-y", "0px");
    event.currentTarget.style.setProperty("--footer-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--footer-rotate-y", "0deg");
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
      scrollTriggerApi.current = ScrollTrigger;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const responsiveAnimations = gsap.matchMedia();
      const context = gsap.context(() => {
      if (reducedMotion) {
        setLoaderDone(true);
        gsap.set("[data-reveal]", { clearProps: "all" });
        return;
      }

      document.body.classList.add("is-loading");
      const loaderCounter = { value: 0 };
      const finishLoader = () => {
        document.body.classList.remove("is-loading");
        setLoaderDone(true);
        ScrollTrigger.refresh();
      };
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .fromTo(".loader-aura", { scale: .35, opacity: 0 }, { scale: 1.12, opacity: .8, duration: 2.8, ease: "power2.inOut" }, 0)
        .fromTo(".loader-ray", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: .28, duration: 1.1, stagger: .08, ease: "power2.out" }, .08)
        .fromTo(".loader-orbit--one", { scale: .58, rotate: -110, opacity: 0 }, { scale: 1, rotate: 250, opacity: .72, duration: 3.35, ease: "power2.inOut" }, .08)
        .fromTo(".loader-orbit--two", { scale: .42, rotate: 130, opacity: 0 }, { scale: 1, rotate: -210, opacity: .5, duration: 3.15, ease: "power2.inOut" }, .18)
        .fromTo(".loader-orbit--three", { scale: .72, rotate: -60, opacity: 0 }, { scale: 1, rotate: 170, opacity: .32, duration: 2.9, ease: "power2.inOut" }, .32)
        .fromTo(".loader-particle", { scale: 0, opacity: 0 }, { scale: 1, opacity: .9, duration: .55, stagger: .1, ease: "back.out(2.4)" }, .52)
        .fromTo(".loader-diamond-shell", { scale: .16, rotate: -135, opacity: 0, filter: "blur(10px)" }, { scale: 1, rotate: 0, opacity: 1, filter: "blur(0px)", duration: 1.18, ease: "power4.out" }, .64)
        .fromTo(".loader-facet", { opacity: 0, scale: .5 }, { opacity: 1, scale: 1, duration: .42, stagger: .07 }, 1.04)
        .fromTo(".loader-mark", { scale: .72, opacity: 0 }, { scale: 1, opacity: 1, duration: .86 }, 1.48)
        .fromTo(".loader-kicker, .loader-name", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .58, stagger: .13 }, 1.78)
        .to(".loader-progress-fill", { scaleX: 1, duration: 3.1, ease: "power2.inOut" }, .34)
        .to(loaderCounter, {
          value: 100,
          duration: 3.1,
          ease: "power2.inOut",
          onUpdate: () => {
            const value = Math.round(loaderCounter.value);
            const count = root.current?.querySelector<HTMLElement>(".loader-count");
            const progress = root.current?.querySelector<HTMLElement>(".loader-progress");
            if (count) count.textContent = value.toString().padStart(2, "0");
            progress?.setAttribute("aria-valuenow", value.toString());
          },
        }, .34)
        .to(".loader-diamond-flash", { scale: 2.8, opacity: .82, duration: .22, ease: "power2.out" }, 3.28)
        .to(".loader-diamond-flash", { scale: 4.2, opacity: 0, duration: .42, ease: "power2.in" }, 3.5)
        .to(".loader-stage, .loader-copy", { scale: .94, opacity: 0, duration: .42, ease: "power2.in" }, 3.48)
        .to(loader.current, { yPercent: -100, duration: .9, ease: "power4.inOut" }, 3.58)
        .call(finishLoader, [], 4.46);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".editorial-frame").forEach((frame, index) => {
        const media = frame.querySelector<HTMLElement>(".editorial-media");
        const image = frame.querySelector<HTMLImageElement>("img");
        if (!media || !image) return;

        gsap.fromTo(
          media,
          { clipPath: index % 2 === 0 ? "inset(18% 0 0 0)" : "inset(0 0 0 18%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: { trigger: frame, start: "top 84%", once: true },
          },
        );

        gsap.fromTo(
          image,
          { scale: 1.13 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 1.15 },
          },
        );
      });

      gsap.fromTo(
        ".editorial-thread",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".editorial-gallery", start: "top 78%", end: "bottom 24%", scrub: 1 },
        },
      );

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
        scrollTriggerApi.current = null;
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
        <div className="loader" ref={loader} aria-label="Damiano Oro e Gioielli, caricamento del sito">
          <div className="loader-ambient" aria-hidden="true">
            <span className="loader-ray loader-ray--one" />
            <span className="loader-ray loader-ray--two" />
            <span className="loader-ray loader-ray--three" />
            <span className="loader-ray loader-ray--four" />
          </div>

          <div className="loader-stage" aria-hidden="true">
            <span className="loader-aura" />
            <span className="loader-orbit loader-orbit--one" />
            <span className="loader-orbit loader-orbit--two" />
            <span className="loader-orbit loader-orbit--three" />
            <span className="loader-particle loader-particle--one" />
            <span className="loader-particle loader-particle--two" />
            <span className="loader-particle loader-particle--three" />
            <span className="loader-particle loader-particle--four" />
            <span className="loader-particle loader-particle--five" />
            <span className="loader-particle loader-particle--six" />
            <div className="loader-diamond-shell">
              <span className="loader-facet loader-facet--one" />
              <span className="loader-facet loader-facet--two" />
              <span className="loader-facet loader-facet--three" />
              <span className="loader-facet loader-facet--four" />
              <div className="loader-mark">
                <img src="/images/logo-damiano.png" alt="" width="640" height="640" decoding="async" />
              </div>
            </div>
            <span className="loader-diamond-flash" />
          </div>

          <div className="loader-copy">
            <p className="loader-kicker">Galatone</p>
            <p className="loader-name">Damiano</p>
          </div>

          <div className="loader-progress" role="progressbar" aria-label="Caricamento" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
            <span className="loader-count">00</span>
            <span className="loader-progress-track"><span className="loader-progress-fill" /></span>
            <span className="loader-progress-end">100</span>
          </div>
        </div>
      )}

      <header ref={header} className={`site-header${mobileMenuOpen ? " menu-is-open" : ""}`}>
        <a className="wordmark" href="#top" onClick={jumpToTop} aria-label="Damiano Oro e Gioielli, torna all'inizio">
          <img
            className="header-logo"
            src="/images/logo-damiano.png"
            alt=""
            width="640"
            height="640"
            decoding="async"
          />
          <span>Damiano</span>
          <small>Oro e Gioielli</small>
        </a>
        <nav className="desktop-navigation" aria-label="Navigazione principale">
          <a href="#atelier" onClick={jumpToSection}>Atelier</a>
          <a href="#gioielli" onClick={jumpToSection}>Gioielli</a>
          <a href="#contatti" onClick={jumpToSection}>Contatti</a>
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
        <a href="#atelier" onClick={jumpToSection}><span>01</span> Atelier</a>
        <a href="#gioielli" onClick={jumpToSection}><span>02</span> Gioielli</a>
        <a href="#contatti" onClick={jumpToSection}><span>03</span> Contatti</a>
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

            <a className="scroll-cue" href="#manifesto" aria-label="Scorri alla sezione successiva"><span /></a>
          </div>
        </div>
      </section>

      <section className="manifesto section-pad" id="manifesto">
        <div className="section-number" data-reveal>02 / 09</div>
        <div className="manifesto-head">
          <h2 data-reveal>Dove la materia<br />incontra il <em>gesto.</em></h2>
        </div>
        <div className="manifesto-grid">
          <figure className="image-card image-card--red" data-reveal>
            <div className="image-shell"><img data-parallax src="/images/image00009.jpg" alt="Bracciale in oro indossato" width="4000" height="6000" loading="lazy" decoding="async" /></div>
          </figure>
          <p className="manifesto-copy" data-reveal>
            Scegliere un gioiello è riconoscersi in un dettaglio. Nel nostro atelier ogni forma nasce dall&apos;ascolto, dalla precisione e dal tempo dedicato alle cose fatte bene.
          </p>
          <figure className="image-card image-card--still" data-reveal>
            <div className="image-shell"><img data-parallax src="/images/image00004.jpg" alt="Selezione di gioielli in oro" width="1440" height="1920" loading="lazy" decoding="async" /></div>
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
          <h2 data-reveal>Il gesto resta umano.<br /><em>La precisione evolve.</em></h2>
          <p className="atelier-copy" data-reveal>
            Ogni gioiello nasce al banco, tra mani esperte, lime, bulini e saldature. Microscopio e strumenti digitali affiancano il mestiere quando serve più controllo, senza sostituire l&apos;occhio e la mano dell&apos;orafo.
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

      <section className="editorial" aria-labelledby="editorial-title">
        <div className="editorial-heading section-pad">
          <div className="section-number light" data-reveal>05 / 09</div>
          <div className="editorial-heading-grid">
            <h2 id="editorial-title" data-reveal>Ogni prezioso<br />ha una <em>storia.</em></h2>
            <p data-reveal>
              Dalla scelta alla cura, ogni dettaglio è pensato per essere indossato, ricordato e tramandato.
            </p>
          </div>
        </div>

        <div className="editorial-gallery">
          <span className="editorial-thread" aria-hidden="true" />

          <figure className="editorial-frame editorial-frame--jewels">
            <div className="editorial-media">
              <img src="/images/editorial-gioielli-oro.webp" alt="Collane e anelli in oro esposti su tessuto prezioso" width="1440" height="1918" loading="lazy" decoding="async" />
            </div>
            <figcaption><span>01</span> Selezione</figcaption>
          </figure>

          <figure className="editorial-frame editorial-frame--wheat">
            <div className="editorial-media">
              <img src="/images/editorial-spiga-anello.webp" alt="Anello con pietre preziose posato su una spiga" width="1536" height="2048" loading="lazy" decoding="async" />
            </div>
            <figcaption><span>02</span> Promessa</figcaption>
          </figure>

          <figure className="editorial-frame editorial-frame--inspection">
            <div className="editorial-media">
              <img src="/images/editorial-controllo-anello.webp" alt="Controllo di un anello artigianale con lente da gioielliere" width="1440" height="1800" loading="lazy" decoding="async" />
            </div>
            <figcaption><span>03</span> Cura</figcaption>
          </figure>

          <figure className="editorial-frame editorial-frame--sweet">
            <div className="editorial-media">
              <img src="/images/editorial-sweet-luxury.webp" alt="Composizione Sweet Luxury con anelli e diamanti" width="1637" height="2048" loading="lazy" decoding="async" />
            </div>
            <figcaption><span>04</span> Dolce lusso</figcaption>
          </figure>

          <figure className="editorial-frame editorial-frame--watch">
            <div className="editorial-media">
              <img src="/images/editorial-orologio-seiko.webp" alt="Orologio vintage Seiko con quadrante bordeaux" width="1440" height="1920" loading="lazy" decoding="async" />
            </div>
            <figcaption><span>05</span> Tempo</figcaption>
          </figure>

          <figure className="editorial-frame editorial-frame--rings">
            <div className="editorial-media">
              <img src="/images/editorial-anelli-colorati.webp" alt="Anelli con pietre preziose colorate indossati" width="1440" height="1800" loading="lazy" decoding="async" />
            </div>
            <figcaption><span>06</span> Colore</figcaption>
          </figure>
        </div>
      </section>

      <section className="collections section-pad" id="gioielli">
        <div className="collections-head">
          <div className="section-number" data-reveal>06 / 09</div>
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

      <footer onPointerMove={moveFooterBrand} onPointerLeave={resetFooterBrand}>
        <a className="footer-brand" href="#top" onClick={jumpToTop} aria-label="Damiano Oro e Gioielli, torna all'inizio">
          <span className="footer-brand-name">Damiano</span>
          <span className="footer-brand-signature">Oro e Gioielli</span>
        </a>
        <div className="footer-info">
          <a className="site-credit" href="https://dimana.it" target="_blank" rel="noreferrer">
            Creato dal collettivo <strong>DIMANA - DIGITAL CREATIONS</strong>
          </a>
          <nav aria-label="Documenti legali">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </nav>
        </div>
        <a className="footer-top" href="#top" onClick={jumpToTop}>Torna su ↑</a>
      </footer>
    </main>
  );
}
