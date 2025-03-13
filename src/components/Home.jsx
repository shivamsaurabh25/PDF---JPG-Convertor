import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <motion.section id="home" className="home"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
    <div className="container">
      <h1>Welcome to PDF & JPG Converter</h1>
      <p>Convert files seamlessly between PDF and JPG.</p>
      <button onClick={() => navigate("pdf-to-jpg")}>PDF to JPG</button>
      <button onClick={() => navigate("jpg-to-pdf")}>JPG to PDF </button>
    </div>
    </motion.section>
  );
};

export default Home;