import "./ProgressBar.css";
import WhatsappIcon from "../../assets/images/WhatsappIcon.svg";

const ProgressBar = ({ step, handleGoBack }) => {
  return (
    <>
      <div className="progress-bar_container">
        <div className="progress-bar_main">
          <span>{step > 1 ? "Ben fatto.." : "Iniziamo"}</span>
          <div className="progress-bar">
            <div
              className="progress-bar_fill"
              style={{ width: `${((step - 1) / 10) * 100}%` }}
            ></div>
          </div>
          {step < 3 && (
            <button className="progress-bar_whatsapp_btn">
              <img src={WhatsappIcon} alt="Whatsapp Icon" />
              <span>Valuta con Whatsapp</span>
            </button>
          )}
          {step >= 3 && (
            <button
              className="progress-bar_restart_btn"
              onClick={() => handleGoBack(true)}
            >
              <span>Inizia da zero</span>
            </button>
          )}
        </div>
      </div>
      <div className="progress-bar_mobile">
        {step < 3 && (
          <button className="progress-bar_whatsapp_btn">
            <img src={WhatsappIcon} alt="Whatsapp Icon" />
            <span>Valuta con Whatsapp</span>
          </button>
        )}
        <p>{step} di 10</p>
      </div>
    </>
  );
};

export default ProgressBar;
