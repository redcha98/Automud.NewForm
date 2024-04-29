import "./Step6.css";
import { useState } from "react";
import { motion } from "framer-motion";

const Step6 = ({
  setStep,
  setFormData,
  formData,
  handleGoBack,
  reverseAnimation,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, Stato2: selected });
    setStep(7);
  };
  const [selected, setSelected] = useState(formData.Stato2 || null);

  return (
    <motion.form
      className="step6"
      onSubmit={handleSubmit}
      action="POST"
      role="form"
      encType="multipart/form-data"
      initial={{ y: reverseAnimation ? "-100%" : "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="form-header">
        <h1>La tua auto si accende e si guida?</h1>
        <h2>Scegli l’opzione che descrive maggiormente la tua auto.</h2>
      </header>
      <div className="form-group">
        {[
          { value: 30, label: "Non si accende e non si guida" },
          { value: 20, label: "Si accende ma non si guida" },
          { value: 10, label: "Si accende e si guida" },
        ].map((field) => (
          <label key={field.value} className="form-control">
            <input
              type="radio"
              name="stato-2"
              value={field.value}
              required
              onChange={() => setSelected(field.value)}
              checked={selected === field.value}
            />
            {field.label}
          </label>
        ))}
      </div>
      <div className="step-buttons">
        <button type="button" onClick={() => handleGoBack(false)}>
          Torna indietro
        </button>
        <button type="submit" disabled={!selected}>
          Prossimo step
        </button>
      </div>
    </motion.form>
  );
};

export default Step6;
