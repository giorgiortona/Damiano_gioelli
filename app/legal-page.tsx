import type { ReactNode } from "react";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated?: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, intro, updated = "30 agosto 2026", children }: LegalPageProps) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="wordmark" href="/" aria-label="Damiano Oro e Gioielli, torna al sito">
          <span>Damiano</span>
          <small>Oro e Gioielli</small>
        </a>
        <a className="legal-back" href="/">Torna al sito <span>↗</span></a>
      </header>

      <article className="legal-article">
        <p className="legal-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="legal-intro">{intro}</p>
        <p className="legal-updated">Ultimo aggiornamento: {updated}</p>
        <div className="legal-content">{children}</div>
        <a className="legal-return" href="/">
          Torna al sito
          <span aria-hidden="true">↗</span>
        </a>
      </article>

      <div className="legal-footer">
        <p>Damiano Oro e Gioielli · Galatone</p>
        <nav aria-label="Documenti legali">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/cookie-policy">Cookie Policy</a>
        </nav>
        <a className="site-credit" href="https://dimana.it" target="_blank" rel="noreferrer">
          Creato dal team di <strong>dimana.digitalcreations</strong>
        </a>
      </div>
    </main>
  );
}
