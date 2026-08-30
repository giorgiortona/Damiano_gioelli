import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy | Damiano Oro e Gioielli",
  description: "Informativa sui cookie tecnici utilizzati dal sito Damiano Oro e Gioielli.",
};

export default function CookiePolicy() {
  return (
    <LegalPage
      eyebrow="Cookie e tecnologie necessarie"
      title="Cookie Policy"
      intro="Il sito utilizza esclusivamente tecnologie necessarie al funzionamento, alla sicurezza e, quando richiesto, all’autenticazione degli utenti."
    >
      <section>
        <h2>1. Cosa sono i cookie</h2>
        <p>I cookie sono piccoli file di testo che un sito può memorizzare sul dispositivo dell’utente. Tecnologie analoghe possono essere impiegate per mantenere una sessione, proteggere il servizio o ricordare impostazioni indispensabili.</p>
      </section>

      <section>
        <h2>2. Cookie utilizzati</h2>
        <p>Il sito non installa direttamente cookie pubblicitari, di profilazione o di analisi statistica e non utilizza pixel di tracciamento. La piattaforma di hosting può utilizzare cookie o identificatori tecnici strettamente necessari per:</p>
        <ul>
          <li>fornire le pagine e mantenere la continuità della sessione;</li>
          <li>gestire l’autenticazione quando il sito è ad accesso riservato;</li>
          <li>proteggere il sito da frodi, abusi e accessi non autorizzati;</li>
          <li>memorizzare preferenze tecniche indispensabili al servizio.</li>
        </ul>
        <p>Nomi, durata e disponibilità di questi cookie possono variare in base al dispositivo, alla regione e alla configurazione della piattaforma. Per i dettagli aggiornati è possibile consultare la <a href="https://openai.com/policies/cookie-policy/" target="_blank" rel="noreferrer">Cookie Policy di OpenAI</a>.</p>
      </section>

      <section>
        <h2>3. Consenso</h2>
        <p>Poiché vengono utilizzati soltanto cookie e strumenti tecnici necessari, non è richiesto il consenso preventivo. Per questo motivo il sito non mostra un banner di accettazione. Se in futuro venissero introdotti strumenti analytics non assimilabili ai tecnici, contenuti incorporati o cookie di profilazione, saranno bloccati fino alla scelta dell’utente e questa informativa verrà aggiornata.</p>
      </section>

      <section>
        <h2>4. Siti esterni</h2>
        <p>I collegamenti a Google Maps, Instagram e Facebook non caricano contenuti di tali piattaforme all’interno delle pagine. Eventuali cookie di questi servizi possono essere installati soltanto dopo che l’utente apre volontariamente il relativo collegamento, secondo le informative del servizio esterno.</p>
      </section>

      <section>
        <h2>5. Gestione dal browser</h2>
        <p>L’utente può visualizzare, eliminare o bloccare i cookie tramite le impostazioni del proprio browser. Il blocco dei cookie tecnici può impedire l’accesso al sito o compromettere alcune funzioni essenziali. Le preferenze devono essere gestite separatamente su ogni browser e dispositivo.</p>
      </section>

      <section>
        <h2>6. Titolare e aggiornamenti</h2>
        <p>Il titolare è <strong>Damiano Oro e Gioielli</strong>, Via Camillo Benso Conte di Cavour 33, 73044 Galatone (LE), telefono <a href="tel:+393930436460">+39 393 043 6460</a>. Per maggiori informazioni sul trattamento dei dati è possibile consultare la <a href="/privacy-policy">Privacy Policy</a>.</p>
      </section>
    </LegalPage>
  );
}
