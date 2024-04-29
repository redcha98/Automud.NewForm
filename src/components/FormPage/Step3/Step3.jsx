import "./Step3.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Step3Data } from "./Step3Data";
import { motion } from "framer-motion";

const Step3 = ({
  setStep,
  formData,
  setFormData,
  marche,
  reverseAnimation,
}) => {
  const [stepData, setStepData] = useState({
    Anno: formData.Anno || "",
    Marca: formData.Marca || "",
    Modello: formData.Modello || "",
    Cilindrata: formData.Cilindrata || "",
    Alimentazione: formData.Alimentazione || "",
    Cambio: formData.Cambio || "",
  });

  const [modelli, setModelli] = useState([]);

  useEffect(() => {
    const getModelli = async () => {
      document.getElementById("Modello").classList.add("disabled");
      if (stepData.Marca === "") return;
      const marca = marche.find((marca) => marca.Name === stepData.Marca);
      await axios
        .get(
          `https://CUSTOM_BACKEND_ENDPOINT/api/make/${marca.Id}/model`
        )
        .then((res) => {
          setModelli(res.data);
          document.getElementById("Modello").classList.remove("disabled");
        });
    };
    getModelli();
  }, [stepData.Marca]);

  const handleSubmit = (e) => {
    //Inserire qui la logica per usare l'API
    e.preventDefault();
    setFormData({ ...formData, ...stepData });
    setStep(4);
  };

  const handleChange = (e) => {
    setStepData({ ...stepData, [e.target.name]: e.target.value });
  };

  return (
    <motion.form
      className="step3"
      onSubmit={handleSubmit}
      action="POST"
      role="form"
      encType="multipart/form-data"
      initial={{ y: reverseAnimation ? "-100%" : "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="form-header">
        <h1>Quali sono le caratteristiche della tua auto?</h1>
        <h2>Compila i dati della tua auto</h2>
      </header>
      <div className="form-group">
        {Step3Data.map((data, index) => {
          return (
            <select
              key={index}
              className={`form-control ${
                stepData[data.name] === "" ? "" : "selected"
              } ${
                data.name === "Modello" && modelli.length === 0
                  ? "disabled"
                  : ""
              }`}
              id={data.name}
              name={data.name}
              required
              value={stepData[data.name]}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                {data.name}
              </option>
              {data.name === "Marca" &&
                marche.map((marca) => {
                  return (
                    <option key={marca.Id} value={marca.Name}>
                      {marca.Name}
                    </option>
                  );
                })}
              {data.name === "Modello" &&
                modelli.map((modello) => {
                  return (
                    <option key={modello.Id} value={modello.Name}>
                      {modello.Name}
                    </option>
                  );
                })}
              {data.options.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={Object.values(stepData).some((value) => value === "")}
      >
        Prossimo step
      </button>
    </motion.form>
  );
};

export default Step3;
