import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Damiano Oro e Gioielli",
  description: "Informativa sul trattamento dei dati personali del sito Damiano Oro e Gioielli.",
};

// Recapiti non ancora forniti: appena disponibili basta valorizzarli qui e
// compaiono nell’informativa, senza toccare il testo.
const EMAIL_TITOLARE = "";
const PARTITA_IVA = "";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Informativa ai sensi degli articoli 13 e 14 del Regolamento UE 2016/679"
      title="Privacy Policy"
      intro="Questa informativa descrive, in modo semplice e trasparente, quali dati possono essere trattati durante la visita del sito, per quali finalità, per quanto tempo e quali diritti puoi esercitare."
      updated="1 settembre 2026"
    >
      <section>
        <h2>1. Titolare del trattamento</h2>
        <p>
          Il titolare del trattamento è <strong>Damiano Oro e Gioielli</strong>, con sede in Via Camillo Benso Conte di Cavour 33, 73044 Galatone (LE)
          {PARTITA_IVA ? <>, partita IVA {PARTITA_IVA}</> : null}.
        </p>
        <p>
          Per qualsiasi richiesta relativa ai dati personali, compreso l’esercizio dei diritti descritti al punto 9, è possibile scrivere all’indirizzo sopra indicato
          {EMAIL_TITOLARE ? (
            <>
              , inviare una email a <a href={`mailto:${EMAIL_TITOLARE}`}>{EMAIL_TITOLARE}</a>
            </>
          ) : null}{" "}
          oppure telefonare al numero <a href="tel:+393930436460">+39 393 043 6460</a>.
        </p>
        <p>
          Il titolare non è tenuto a designare un Responsabile della protezione dei dati (RPD/DPO) ai sensi dell’articolo 37 del GDPR, perché non svolge
          monitoraggio regolare e sistematico su larga scala né tratta su larga scala categorie particolari di dati. Le richieste vanno quindi indirizzate
          direttamente al titolare, ai recapiti indicati sopra.
        </p>
      </section>

      <section>
        <h2>2. Dati trattati</h2>
        <p>
          Il sito è una vetrina informativa: non contiene moduli di contatto, aree riservate proprietarie, carrelli o acquisti online, newsletter, sistemi
          pubblicitari, strumenti di statistica o pixel di tracciamento, e non conserva alcun archivio di clienti o di visitatori. Non vengono caricate risorse
          da server di terze parti (font, mappe incorporate, video o widget social). Durante la navigazione possono essere trattati:
        </p>
        <ul>
          <li>
            <strong>dati tecnici di connessione</strong>, trasmessi automaticamente dai protocolli di Internet: indirizzo IP, tipo di dispositivo, sistema
            operativo e browser, data e ora della richiesta, pagina richiesta, esito della risposta e informazioni necessarie alla sicurezza del servizio;
          </li>
          <li>
            <strong>dati tecnici di autenticazione</strong>, soltanto nel caso in cui la piattaforma che ospita il sito richieda l’identificazione dell’utente
            per accedervi: in tal caso il fornitore comunica al sito un identificativo, l’indirizzo email e il nome dell’account utilizzato per l’accesso;
          </li>
          <li>
            <strong>dati comunicati volontariamente</strong>, quando decidi di contattare l’attività per telefono o attraverso i canali esterni collegati dal
            sito: in questo caso i dati sono soltanto quelli che scegli di fornire.
          </li>
        </ul>
        <p>
          Il sito non tratta consapevolmente dati di minori e non richiede categorie particolari di dati personali (articolo 9 del GDPR).
        </p>
      </section>

      <section>
        <h2>3. Finalità, basi giuridiche e natura del conferimento</h2>
        <p>I dati sopra indicati sono trattati esclusivamente per le finalità che seguono.</p>
        <ul>
          <li>
            <strong>Erogazione del sito, sicurezza e prevenzione degli abusi.</strong> Base giuridica: legittimo interesse del titolare (articolo 6, paragrafo 1,
            lettera f del GDPR), consistente nel rendere disponibili le pagine richieste, mantenere il servizio integro e difenderlo da accessi non autorizzati,
            frodi e attacchi informatici.
          </li>
          <li>
            <strong>Riscontro alle richieste ricevute.</strong> Base giuridica: esecuzione di misure precontrattuali adottate su richiesta dell’interessato
            (articolo 6, paragrafo 1, lettera b) oppure legittimo interesse a rispondere a chi contatta l’attività (articolo 6, paragrafo 1, lettera f).
          </li>
          <li>
            <strong>Adempimento di obblighi di legge</strong> e gestione di eventuali contestazioni o richieste dell’autorità. Base giuridica: obbligo legale
            (articolo 6, paragrafo 1, lettera c) e, per la tutela dei diritti in sede giudiziaria, legittimo interesse (articolo 6, paragrafo 1, lettera f).
          </li>
        </ul>
        <p>
          I dati tecnici di connessione non sono conferiti volontariamente: la loro trasmissione è insita nel funzionamento dei protocolli di Internet e senza di
          essi il sito non può essere visualizzato. Ogni altro dato è invece facoltativo e il rifiuto di comunicarlo comporta soltanto l’impossibilità di dare
          seguito alla richiesta. Non viene richiesto alcun consenso, perché nessun trattamento si fonda su di esso.
        </p>
      </section>

      <section>
        <h2>4. Cookie e strumenti tecnici</h2>
        <p>
          Il sito utilizza soltanto cookie e identificatori tecnici necessari a fornire le pagine, mantenere la sessione e proteggere il servizio, che ai sensi
          dell’articolo 122 del Codice in materia di protezione dei dati personali (decreto legislativo 196/2003) non richiedono il consenso preventivo: per
          questo non viene mostrato alcun banner. Non sono installati cookie di profilazione, pubblicitari o di analisi statistica. Il dettaglio è nella{" "}
          <a href="/cookie-policy">Cookie Policy</a>.
        </p>
      </section>

      <section>
        <h2>5. Destinatari e responsabili del trattamento</h2>
        <p>
          I dati non sono diffusi, non vengono venduti e non sono utilizzati dal titolare per profilazione o pubblicità. Possono essere trattati, per conto del
          titolare e su sue istruzioni, dai fornitori tecnici che rendono possibile la pubblicazione del sito, designati responsabili del trattamento ai sensi
          dell’articolo 28 del GDPR:
        </p>
        <ul>
          <li>
            <strong>OpenAI</strong>, che fornisce la piattaforma di pubblicazione ChatGPT Sites su cui il sito è ospitato. Maggiori informazioni nell’
            <a href="https://openai.com/it-IT/policies/chatgpt-sites-data-processing-addendum/" target="_blank" rel="noreferrer">Addendum sul trattamento dei dati dei siti ChatGPT</a>{" "}
            e nell’<a href="https://openai.com/it-IT/policies/eu-services-privacy-policy/" target="_blank" rel="noreferrer">Informativa privacy europea di OpenAI</a>;
          </li>
          <li>
            <strong>Cloudflare</strong>, che fornisce l’infrastruttura di rete, la distribuzione dei contenuti, l’ottimizzazione delle immagini e la protezione
            del servizio su cui la piattaforma si appoggia. Maggiori informazioni nell’
            <a href="https://www.cloudflare.com/it-it/privacypolicy/" target="_blank" rel="noreferrer">Informativa privacy di Cloudflare</a>.
          </li>
        </ul>
        <p>
          I dati possono inoltre essere comunicati ad autorità pubbliche o all’autorità giudiziaria quando previsto dalla legge, e a consulenti del titolare
          nei limiti necessari alla difesa di un diritto. L’elenco aggiornato dei responsabili del trattamento può essere richiesto ai recapiti indicati al
          punto 1.
        </p>
      </section>

      <section>
        <h2>6. Trasferimenti fuori dallo Spazio economico europeo</h2>
        <p>
          I fornitori indicati al punto 5 sono società con sede negli Stati Uniti e alcuni trattamenti tecnici possono avvenire, in tutto o in parte, fuori
          dallo Spazio economico europeo. In questi casi il trasferimento avviene sulla base delle garanzie previste dal capo V del GDPR: le clausole
          contrattuali tipo adottate dalla Commissione europea con decisione di esecuzione (UE) 2021/914 e, ove il fornitore vi aderisca, la decisione di
          adeguatezza relativa al quadro UE-USA per la protezione dei dati (EU-US Data Privacy Framework). Una copia delle garanzie adottate può essere
          richiesta ai recapiti indicati al punto 1.
        </p>
      </section>

      <section>
        <h2>7. Periodi di conservazione</h2>
        <ul>
          <li>
            <strong>Dati tecnici di connessione e di sicurezza:</strong> conservati per il tempo strettamente necessario a garantire il funzionamento e la
            sicurezza del servizio, di norma non oltre 12 mesi, salvo che debbano essere conservati più a lungo per accertare o difendere un diritto in giudizio
            oppure su richiesta dell’autorità.
          </li>
          <li>
            <strong>Dati di autenticazione</strong> eventualmente comunicati dalla piattaforma: trattati per la durata della sessione di accesso e non
            archiviati dal titolare.
          </li>
          <li>
            <strong>Dati comunicati volontariamente:</strong> conservati per il tempo necessario a gestire la richiesta e, se questa dà luogo a un rapporto
            commerciale, per i termini previsti dagli obblighi civilistici e fiscali (di regola 10 anni).
          </li>
        </ul>
        <p>Al termine dei periodi indicati i dati sono cancellati o resi anonimi in modo irreversibile.</p>
      </section>

      <section>
        <h2>8. Collegamenti a siti esterni</h2>
        <p>
          Il sito contiene collegamenti a Google Maps, Instagram e Facebook. Si tratta di semplici link: nessun contenuto di queste piattaforme viene caricato
          all’interno delle pagine e nessun dato viene loro comunicato finché non decidi di aprire il collegamento. Da quel momento il trattamento è di
          esclusiva competenza del servizio di destinazione, che agisce come titolare autonomo e al quale si rimanda per la relativa informativa. Il titolare
          non risponde dei contenuti e dei trattamenti dei siti di terzi.
        </p>
      </section>

      <section>
        <h2>9. Diritti dell’interessato</h2>
        <p>
          Nei limiti e nei casi previsti dagli articoli da 15 a 22 del GDPR puoi chiedere in ogni momento l’accesso ai tuoi dati personali, la loro rettifica o
          cancellazione, la limitazione del trattamento e la portabilità dei dati.
        </p>
        <p>
          <strong>
            Hai inoltre diritto di opporti in qualsiasi momento, per motivi legati alla tua situazione particolare, ai trattamenti fondati sul legittimo
            interesse del titolare, ai sensi dell’articolo 21 del GDPR.
          </strong>{" "}
          In caso di opposizione il trattamento cessa, salvo che sussistano motivi legittimi cogenti prevalenti sui tuoi interessi, diritti e libertà, oppure la
          necessità di accertare, esercitare o difendere un diritto in sede giudiziaria.
        </p>
        <p>
          Le richieste vanno inviate ai recapiti indicati al punto 1 e ricevono riscontro senza ingiustificato ritardo e comunque entro un mese dal ricevimento,
          prorogabile di due mesi in caso di particolare complessità, con informativa all’interessato (articolo 12 del GDPR). L’esercizio dei diritti è
          gratuito.
        </p>
        <p>
          Se ritieni che il trattamento violi la normativa, puoi proporre reclamo al{" "}
          <a href="https://www.garanteprivacy.it/" target="_blank" rel="noreferrer">Garante per la protezione dei dati personali</a> (Piazza Venezia 11, 00187
          Roma) oppure ricorrere all’autorità giudiziaria.
        </p>
      </section>

      <section>
        <h2>10. Decisioni automatizzate e aggiornamenti</h2>
        <p>
          Il titolare non effettua profilazione né processi decisionali automatizzati che producano effetti giuridici o incidano in modo analogamente
          significativo sull’interessato (articolo 22 del GDPR).
        </p>
        <p>
          La presente informativa può essere aggiornata se cambiano le funzionalità del sito, i fornitori tecnici o la normativa applicabile. La versione in
          vigore è sempre quella pubblicata in questa pagina, con la data di ultimo aggiornamento indicata in alto.
        </p>
      </section>
    </LegalPage>
  );
}
