import FormPage from "./pages/FormPage/FormPage";
import UnreachablePage from "./pages/UnreachablePage/UnreachablePage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/?cap=:cap" element={<FormPage />} />
        <Route path="/unreachable" element={<UnreachablePage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
  );
}

export default App;
