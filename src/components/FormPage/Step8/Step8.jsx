import { useState } from "react";
import { motion } from "framer-motion";

const Step8 = ({
  setStep,
  setFormData,
  formData,
  handleGoBack,
  reverseAnimation,
}) => {
  const [esterni, setEsterni] = useState(
    formData.Esterni ? formData.Esterni : ""
  );
  const handleSubmit = (e) => {
    //Inserire qui la logica per usare l'API
    e.preventDefault();
    setFormData({ ...formData, Esterni: esterni });
    setStep(9);
  };

  return (
    <motion.form
      className="step8"
      onSubmit={handleSubmit}
      action="POST"
      role="form"
      encType="multipart/form-data"
      initial={{ y: reverseAnimation ? "-100%" : "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="form-header">
        <h1>Come sono gli esterni dell’auto?</h1>
        <h2>Descrivi in poche parole le condizioni degli esterni.</h2>
      </header>
      <div className="form-group">
        <textarea
          name="esterni"
          required
          value={esterni}
          onChange={(e) => setEsterni(e.target.value)}
          className="form-control"
          placeholder="Non ha graffi, ha una botta..."
        ></textarea>
      </div>
      <div className="step-buttons">
        <button type="button" onClick={() => handleGoBack(false)}>
          Torna indietro
        </button>
        <button type="submit" disabled={esterni.length < 5}>
          Prossimo step
        </button>
      </div>
    </motion.form>
  );
};

export default Step8;
