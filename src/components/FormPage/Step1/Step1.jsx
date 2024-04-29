import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { motion } from "framer-motion";

const Step1 = ({ setStep, formData, setFormData, reverseAnimation }) => {
  const navigate = useNavigate();
  const [cap, setCap] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(
        `https://CUSTOM_BACKEND_ENDPOINT/api/cap/${cap}`
      );
      if (res.data.IsReachable) {
        let comune = res.data.Comuni[0].Comune;
        let provincia = res.data.Comuni[0].Provincia;
        comune = `${comune} (${provincia})`;
        setFormData({ ...formData, CAP: { comune, cap } });
        setStep(2);
      } else {
        navigate("/unreachable");
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.form
      action="POST"
      role="form"
      encType="multipart/form-data"
      className="step1"
      onSubmit={handleSubmit}
      initial={{ y: reverseAnimation ? "-100%" : "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="form-header">
        <h1>Dove ritireremo la tua auto?</h1>
        <h2>Inserisci il CAP della città dove si trova la tua auto</h2>
      </header>
      <div className="form-group">
        <input
          type="number"
          className={error ? "form-control error" : "form-control"}
          id="CAP"
          placeholder="CAP"
          name="CAP"
          required
          value={cap}
          onInput={(e) => {
            if (e.target.value.length > 5) {
              e.target.value = e.target.value.slice(0, 5);
            }
            setCap(e.target.value);
          }}
        />
      </div>
      {loading && <Loader />}
      {error && <span className="form-error">Inserisci un CAP valido</span>}
      <button disabled={cap.length < 5}>Prossimo step</button>
    </motion.form>
  );
};

export default Step1;
