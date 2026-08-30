import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Damiano Oro e Gioielli",
  description: "Informativa sul trattamento dei dati personali del sito Damiano Oro e Gioielli.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Informativa ai sensi del Regolamento UE 2016/679"
      title="Privacy Policy"
      intro="Questa informativa descrive, in modo semplice e trasparente, quali dati possono essere trattati durante la visita del sito e come vengono protetti."
    >
      <section>
        <h2>1. Titolare del trattamento</h2>
        <p>
          Il titolare del trattamento è <strong>Damiano Oro e Gioielli</strong>, con sede in Via Camillo Benso Conte di Cavour 33, 73044 Galatone (LE). Per richieste relative alla privacy è possibile inviare una comunicazione scritta a questo indirizzo oppure contattare il numero <a href="tel:+393930436460">+39 393 043 6460</a>.
        </p>
      </section>

      <section>
        <h2>2. Dati trattati</h2>
        <p>Il sito non contiene moduli di contatto, aree di acquisto, newsletter o sistemi pubblicitari. Durante la navigazione possono essere trattati:</p>
        <ul>
          <li>dati tecnici di connessione, come indirizzo IP, tipo di dispositivo e browser, data e ora della richiesta, pagina visitata e dati necessari alla sicurezza del servizio;</li>
          <li>dati tecnici di autenticazione, soltanto quando l’accesso al sito richiede l’identificazione tramite la piattaforma che lo ospita;</li>
          <li>dati comunicati volontariamente quando l’utente contatta l’attività per telefono o attraverso i servizi esterni collegati dal sito.</li>
        </ul>
      </section>

      <section>
        <h2>3. Finalità e basi giuridiche</h2>
        <p>I dati sono trattati esclusivamente per rendere disponibile il sito, garantirne sicurezza e corretto funzionamento, prevenire abusi e rispondere alle richieste degli utenti. Le basi giuridiche sono l’esecuzione di misure richieste dall’interessato, l’adempimento di obblighi di legge e il legittimo interesse del titolare alla sicurezza e alla gestione del servizio.</p>
      </section>

      <section>
        <h2>4. Hosting e destinatari</h2>
        <p>
          Il sito è ospitato tramite ChatGPT Sites. Il fornitore dell’infrastruttura può trattare dati tecnici per conto del titolare al fine di ospitare, mantenere e proteggere il servizio. Maggiori informazioni sono disponibili nell’<a href="https://openai.com/it-IT/policies/chatgpt-sites-data-processing-addendum/" target="_blank" rel="noreferrer">Addendum sul trattamento dei dati dei siti ChatGPT</a> e nell’<a href="https://openai.com/it-IT/policies/eu-services-privacy-policy/" target="_blank" rel="noreferrer">Informativa privacy europea di OpenAI</a>.
        </p>
        <p>I dati possono inoltre essere comunicati a fornitori tecnici strettamente necessari o ad autorità pubbliche quando previsto dalla legge. Non vengono venduti né utilizzati dal titolare per profilazione pubblicitaria.</p>
      </section>

      <section>
        <h2>5. Collegamenti esterni</h2>
        <p>Il sito contiene collegamenti a Google Maps, Instagram e Facebook. Questi servizi diventano autonomamente responsabili dei rispettivi trattamenti soltanto quando l’utente decide di aprirli. Si invita a consultare le informative pubblicate da ciascun servizio.</p>
      </section>

      <section>
        <h2>6. Conservazione e trasferimenti</h2>
        <p>I dati tecnici sono conservati per il tempo strettamente necessario al funzionamento, alla sicurezza e alla gestione di eventuali contestazioni, secondo le impostazioni e i tempi applicati dal fornitore di hosting. I dati forniti volontariamente sono conservati per il tempo necessario a gestire la richiesta e per gli eventuali obblighi di legge.</p>
        <p>Qualora i fornitori tecnici trattino dati fuori dallo Spazio economico europeo, il trasferimento avviene mediante gli strumenti e le garanzie previsti dagli articoli 44 e seguenti del GDPR.</p>
      </section>

      <section>
        <h2>7. Diritti dell’interessato</h2>
        <p>Nei casi previsti dal GDPR è possibile chiedere accesso, rettifica, cancellazione, limitazione, portabilità dei dati oppure opporsi al trattamento. Se un trattamento fosse basato sul consenso, questo potrebbe essere revocato in qualsiasi momento senza pregiudicare la liceità del trattamento precedente.</p>
        <p>È inoltre possibile proporre reclamo al <a href="https://www.garanteprivacy.it/" target="_blank" rel="noreferrer">Garante per la protezione dei dati personali</a>.</p>
      </section>

      <section>
        <h2>8. Decisioni automatizzate e aggiornamenti</h2>
        <p>Il titolare non effettua decisioni automatizzate o profilazione attraverso questo sito. La presente informativa potrà essere aggiornata se cambieranno le funzionalità, i fornitori o la normativa applicabile.</p>
      </section>
    </LegalPage>
  );
}
