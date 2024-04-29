import Header from "../../components/Header/Header";
import UnreachableIcon from "../../assets/images/UnreachableIcon.svg";
import WhatsappIcon from "../../assets/images/WhatsappIcon.svg";
import "./UnreachablePage.css";

const UnreachablePage = () => {
  return (
    <>
      <Header />
      <main className="unreachable-container">
        <img src={UnreachableIcon} alt="Unreachable Icon" />
        <h1>Ooops, ci dispiace!</h1>
        <h2>Il nostro servizio non è ancora disponibile nella tua zona.</h2>
        <p>
          Finora arriviamo lontano nella regione Lombardia e stiamo lavorando
          intensamente per raggiungere anche altre zone.
        </p>
        <div className="buttons">
          <button>Torna alla Home</button>
          <button >
            <img src={WhatsappIcon} alt="Whatsapp Icon" />
            <span>Scrivici su Whatsapp</span>
          </button>
        </div>
      </main>
    </>
  );
};

export default UnreachablePage;
