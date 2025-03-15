import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PdfToJpg from "./components/PdfToJpg";
import JpgToPdf from "./components/JpgToPdf";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
