import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <h1 className="logo">PDF-JPG Converter</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pdf-to-jpg">PDF to JPG</Link></li>
        <li><Link to="/jpg-to-pdf">JPG to PDF</Link></li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;