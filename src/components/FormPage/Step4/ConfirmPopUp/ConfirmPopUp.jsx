import PopUpImage from "../../../../assets/images/PopUp.svg";
import "./ConfirmPopUp.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ConfirmPopUp = ({ setShowPopUp, setStep, formData, setFormData, km }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth <= 768;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  return (
    <motion.div
      className="confirm-popup"
      initial={{ y: "100%", x: "-50%" }}
      animate={isMobile ? { y: 0, x: "-50%" } : { y: "-50%", x: "-50%" }}
      transition={{ duration: 0.5 }}
    >
      <div className="close-pop-up-CAP-container">
        <a className="close-pop-up-CAP" onClick={() => setShowPopUp(false)}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 1.5L30.5 30" stroke="#10002B" stroke-width="4"></path>
            <path d="M30.5 1.5L2 30" stroke="#10002B" stroke-width="4"></path>
          </svg>
        </a>
      </div>

      <img src={PopUpImage} alt="PopUpImage" />
      <h1>Per essere sicuri...</h1>
      <p>
        Controlla il kilometraggio inserito prima di andare avanti, incide molto
        sul valore dell'auto
      </p>
      <div className="confirm-buttons">
        <button
          onClick={() => {
            setShowPopUp(false);
            setFormData({ ...formData, Km: km });
            setStep(5);
          }}
        >
          Sono sicuro!
        </button>
        <button
          onClick={() => {
            setShowPopUp(false);
          }}
        >
          Reimposta kilometri
        </button>
      </div>
    </motion.div>
  );
};

export default ConfirmPopUp;
