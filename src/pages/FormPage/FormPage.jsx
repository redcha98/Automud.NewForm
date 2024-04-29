import "./FormPage.css";
import Header from "../../components/Header/Header";
import Step1 from "../../components/FormPage/Step1/Step1";
import Step2 from "../../components/FormPage/Step2/Step2";
import Step3 from "../../components/FormPage/Step3/Step3";
import Step4 from "../../components/FormPage/Step4/Step4";
import Step5 from "../../components/FormPage/Step5/Step5";
import Step6 from "../../components/FormPage/Step6/Step6";
import Step7 from "../../components/FormPage/Step7/Step7";
import Step8 from "../../components/FormPage/Step8/Step8";
import Step9 from "../../components/FormPage/Step9/Step9";
import Step10 from "../../components/FormPage/Step10/Step10";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

function FormPage() {
  const [step, setStep] = useState(1);
  const [marche, setMarche] = useState([]);
  const [formData, setFormData] = useState({});
  const [reverseAnimation, setReverseAnimation] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cap = searchParams.get("cap");
  const navigate = useNavigate();
  const handleGoBack = (isRestart) => {
    setReverseAnimation(true);
    if (isRestart) {
      setStep(1);
      setFormData({});
    } else {
      setStep(step - 1);
    }

    setTimeout(() => {
      setReverseAnimation(false);
    }, 500);
  };

  useEffect(() => {
    if (cap) {
      axios
        .get(`https://CUSTOM_BACKEND_ENDPOINT/api/cap/${cap}`)
        .then((res) => {
          if (res.data.IsReachable) {
            setFormData({ ...formData, CAP: cap });
            setStep(2);
          } else {
            navigate("/unreachable");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cap]);

  useEffect(() => {
    const getMarche = async () => {
      const res = await axios.get(
        "https://CUSTOM_BACKEND_ENDPOINT/api/make"
      );
      setMarche(res.data);
    };
    getMarche();
  }, []);

  return (
    <div className="form-page">
      <Header />
      <main className="form-main">
        <div className="form-container">
          {step === 1 && (
            <Step1
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
              reverseAnimation={reverseAnimation}
            />
          )}
          {step === 2 && (
            <Step2
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
            />
          )}
          {step === 3 && (
            <Step3
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
              marche={marche}
              reverseAnimation={reverseAnimation}
            />
          )}
          {step === 4 && (
            <Step4
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
              handleGoBack={handleGoBack}
              reverseAnimation={reverseAnimation}
            />
          )}
          {step === 5 && (
            <Step5
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
              handleGoBack={handleGoBack}
              reverseAnimation={reverseAnimation}
            />
          )}
          {step === 6 && (
            <Step6
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
              handleGoBack={handleGoBack}
              reverseAnimation={reverseAnimation}
            />
          )}
          {step === 7 && (
            <Step7
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
              handleGoBack={handleGoBack}
              reverseAnimation={reverseAnimation}
            />
          )}
          {step === 8 && (
            <Step8
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
              handleGoBack={handleGoBack}
              reverseAnimation={reverseAnimation}
            />
          )}
          {step === 9 && (
            <Step9
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
              handleGoBack={handleGoBack}
              reverseAnimation={reverseAnimation}
            />
          )}
          {step === 10 && (
            <Step10
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
              handleGoBack={handleGoBack}
            />
          )}
          <ProgressBar
            step={step}
            setStep={setStep}
            handleGoBack={handleGoBack}
          />
        </div>
      </main>
    </div>
  );
}

export default FormPage;
