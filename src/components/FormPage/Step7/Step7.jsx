import { useState } from "react";
import { motion } from "framer-motion";

const Step7 = ({
  setStep,
  setFormData,
  formData,
  handleGoBack,
  reverseAnimation,
}) => {
  const [interni, setInterni] = useState(
    formData.Interni ? formData.Interni : ""
  );
  const handleSubmit = (e) => {
    //Inserire qui la logica per usare l'API
    e.preventDefault();
    setFormData({ ...formData, Interni: interni });
    setStep(8);
  };

  return (
    <motion.form
      className="step7"
      onSubmit={handleSubmit}
      action="POST"
      role="form"
      encType="multipart/form-data"
      initial={{ y: reverseAnimation ? "-100%" : "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="form-header">
        <h1>Come sono gli interni dell’auto?</h1>
        <h2>Descrivi in poche parole le condizioni degli interni.</h2>
      </header>
      <div className="form-group">
        <textarea
          name="interni"
          required
          value={interni}
          onChange={(e) => setInterni(e.target.value)}
          className="form-control"
          placeholder="Ha gli Air Bag scoppiati, ha il sedile rotto..."
        ></textarea>
      </div>
      <div className="step-buttons">
        <button type="button" onClick={() => handleGoBack(false)}>
          Torna indietro
        </button>
        <button type="submit" disabled={interni.length < 5}>
          Prossimo step
        </button>
      </div>
    </motion.form>
  );
};

export default Step7;
