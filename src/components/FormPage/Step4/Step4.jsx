import "./Step4.css";
import { useState } from "react";
import ConfirmPopUp from "./ConfirmPopUp/ConfirmPopUp";
import { motion } from "framer-motion";

const Step4 = ({
  setStep,
  setFormData,
  formData,
  handleGoBack,
  reverseAnimation,
}) => {
  const [km, setKm] = useState(formData.Km ? formData.Km : "");
  const [showPopUp, setShowPopUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (km < 5000 || km > 200000) {
      setShowPopUp(true);
    } else {
      setFormData({ ...formData, Km: km });
      setStep(5);
    }
  };
  return (
    <>
      {showPopUp && <div className="backdrop"></div>}
      <motion.form
        action="POST"
        role="form"
        encType="multipart/form-data"
        className="step4"
        onSubmit={handleSubmit}
        initial={{ y: reverseAnimation ? "-100%" : "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="form-header">
          <h1>Quanti kilometri ha la tua auto?</h1>
          <h2>Inserisci il numero di kilometri che la tua auto ha percorso.</h2>
        </header>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="km"
            placeholder="Kilometri"
            name="km"
            required
            value={km}
            onInput={(e) => {
              setKm(e.target.value);
            }}
          />
        </div>
        <div className="step-buttons">
          <button type="button" onClick={() => handleGoBack(false)}>
            Torna indietro
          </button>
          <button type="submit" disabled={km.length < 1}>
            Prossimo step
          </button>
        </div>
      </motion.form>
      {showPopUp && (
        <ConfirmPopUp
          setShowPopUp={setShowPopUp}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
          km={km}
        />
      )}
    </>
  );
};

export default Step4;
