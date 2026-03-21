import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import OpenPdf from "./Pages/Pdf";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/pdf" element={<OpenPdf />} />
    </Routes>
  );
}

export default App;
