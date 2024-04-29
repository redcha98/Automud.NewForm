import "./SuccessPage.css";
import Header from "../../components/Header/Header";
import SuccessMobile from "../../assets/images/SuccessMobile.svg";
const SuccessPage = () => {
  return (
    <div className="success-page_container">
      <Header />
      <main className="success-page">
        <div className="success-page_left">
          <div className="success-page_left_container">
            <div className="stars"></div>
            <h1>Congratulazioni!</h1>
            <h2>Più facile. Zero stress.</h2>
            <p>
              Verrai ricontattato da noi tramite una telefonata in giornata, in
              cui ti inizieremo a seguire passo passo nella vendita della tua
              auto. 
            </p>
            <button>Torna alla home</button>
          </div>
        </div>
        <div className="success-page_right">
          <h2>Controlla le tue notifiche</h2>
          <img src={SuccessMobile} alt="SuccessMobile" />
        </div>
      </main>
    </div>
  );
};

export default SuccessPage;
