import "./Step9.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader/Loader";
import { motion } from "framer-motion";

const Step9 = ({ setStep, formData, setFormData, handleGoBack }) => {
  const navigate = useNavigate();
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stepData, setStepData] = useState({
    Nome: "",
    Cognome: "",
    Telefono: "",
    Email: "",
  });

  const handleSubmit = async (e) => {
    // Fare qui chiamata POST all'API
    e.preventDefault();

    setFormData({ ...stepData, ...formData });

    setPhoneError(false);
    setEmailError(false);

    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(stepData.Email)
    ) {
      setEmailError(true);
      document.getElementById("Email").classList.add("error");
      return;
    } else {
      setEmailError(false);
      document.getElementById("Email").classList.remove("error");
    }

    if (!/^3[0-9]{9}$/.test(stepData.Telefono)) {
      setPhoneError(true);
      document.getElementById("Telefono").classList.add("error");
      return;
    } else {
      setPhoneError(false);
      document.getElementById("Telefono").classList.remove("error");
    }
    setLoading(true);

    setFormData({ ...formData, ...stepData });

    let apiFormData = new FormData();
    apiFormData.append("licensePlate", formData.Targa);
    apiFormData.append("km", formData.Km);
    apiFormData.append("make", formData.Marca);
    apiFormData.append("model", formData.Modello);
    apiFormData.append("registrationYear", formData.Anno);
    apiFormData.append("engineSize", formData.Cilindrata);
    apiFormData.append("fuelType", formData.Alimentazione);
    apiFormData.append("transmissionType", formData.Cambio);
    apiFormData.append("carCondition", formData.Stato);
    apiFormData.append("engineCondition", formData.Stato2);
    apiFormData.append("interiorConditions", formData.Interni);
    apiFormData.append("exteriorConditions", formData.Esterni);
    apiFormData.append("cap", formData.CAP.cap);
    apiFormData.append("city", formData.CAP.comune);
    apiFormData.append("firstName", stepData.Nome);
    apiFormData.append("lastName", stepData.Cognome);
    apiFormData.append("email", stepData.Email);
    apiFormData.append("phone", stepData.Telefono);

    await axios
      .post("https://CUSTOM_BACKEND_ENDPOINT/api/request", apiFormData)
      .then((res) => {
        console.log(res);
        let requestId = res.data.Id;
        console.log(requestId);
        let newFormData = { ...formData, RequestId: requestId };
        setFormData(newFormData);
        setStep(10);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setStepData({ ...stepData, [e.target.name]: e.target.value });
  };

  return (
    <motion.form
      className="step9"
      onSubmit={handleSubmit}
      action="POST"
      role="form"
      encType="multipart/form-data"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="form-header">
        <h1>Con chi abbiamo il piacere di parlare?</h1>
        <h2>
          Solo alcune informazioni su di te, prima di ricevere la tua
          valutazione.
        </h2>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <div className="form-group">
          {[
            { label: "Nome", type: "text" },
            { label: "Cognome", type: "text" },
            { label: "Telefono", type: "tel" },
            { label: "Email", type: "text" },
          ].map((input) => (
            <input
              key={input.label}
              type={input.type}
              name={input.label}
              id={input.label}
              placeholder={input.label}
              className="form-control"
              value={stepData[input.label]}
              onChange={handleChange}
            />
          ))}
        </div>
      )}

      {phoneError && !emailError && (
        <span className="form-error">
          Inserisci un numero di telefono valido
        </span>
      )}

      {emailError && (
        <span className="form-error">
          Inserisci un indirizzo email o numero di telefono valido
        </span>
      )}

      <div className="step-buttons">
        <button type="button" onClick={() => handleGoBack(false)}>
          Torna indietro
        </button>
        <button
          type="submit"
          disabled={Object.values(stepData).some((value) => value === "")}
        >
          Prossimo step
        </button>
      </div>
    </motion.form>
  );
};

export default Step9;
