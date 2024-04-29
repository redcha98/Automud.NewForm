import "./Step10.css";
import uploadIcon from "../../../assets/images/UploadIcon.svg";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import { motion } from "framer-motion";
import axios from "axios";

const Step10 = ({
  setStep,
  setFormData,
  formData,
  handleGoBack,
  reverseAnimation,
}) => {
  const navigate = useNavigate();
  const [foto, setFoto] = useState([]);
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await Promise.all(foto.map(compressImage))
      .then(async (compressedFiles) => {
        let fotoCompresse = createFileList(compressedFiles);
        setFormData({ ...formData, Foto: fotoCompresse.files });

        let apiFormData = new FormData();
        apiFormData.append("requestId", formData.RequestId)
        for (let i = 0; i < formData.Foto.length; i++) {
          apiFormData.append("files", formData.Foto[i], formData.Foto[i].name);
        }

        await axios
          .post("https://CUSTOM_BACKEND_ENDPOINT/api/requestPhotos", apiFormData)
          .then((res) => {
            console.log(res);
            navigate("/success");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        setError(true);
      });

    function createFileList(compressedFiles) {
      let list = new DataTransfer();
      for (let i = 0; i < compressedFiles.length; i++) {
        list.items.add(compressedFiles[i]);
      }
      return list;
    }
  };
  function compressImage(file) {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.25,
        success: (result) => {
          resolve(new File([result], file.name, { type: result.type }));
        },
        error: (error) => reject(error),
      });
    });
  }

  return (
    <motion.form
      className="step10"
      onSubmit={handleSubmit}
      action="POST"
      role="form"
      encType="multipart/form-data"
      initial={{ y: reverseAnimation ? "-100%" : "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="form-header">
        <h1>Mostraci la tua auto con qualche foto...</h1>
        <h2>
          Allega alcune foto dell’auto in modo da poter ricevere una valutazione
          accurata.
        </h2>
      </header>
      <div className="form-group">
        <Dropzone
          onDropAccepted={(acceptedFiles) => {
            setFoto(acceptedFiles);
            setError(false);
          }}
          onDropRejected={() => setError(true)}
          multiple={true}
          accept={"image/jpeg, image/png"}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Foto della tua auto</p>
                <img src={uploadIcon} alt="upload icon" />
              </div>
            </section>
          )}
        </Dropzone>
        <div className="number_uploaded">
          {!error && (
            <p>
              {foto.length}{" "}
              {foto.length === 1 ? "foto caricata" : "foto caricate"}
            </p>
          )}
          {error && (
            <span className="form-error">
              Il formato delle foto non è corretto. Riprova con un’altra foto.
            </span>
          )}
        </div>
      </div>
      <div className="step-buttons">
        <button type="button" onClick={() => handleGoBack(false)}>
          Torna indietro
        </button>
        <button type="submit" disabled={foto.length < 1 || error}>
          Richiedi valutazione
        </button>
      </div>
    </motion.form>
  );
};

export default Step10;

