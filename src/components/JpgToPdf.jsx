import { useState } from "react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";

const JpgToPdf = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const convertToPdf = () => {
    if (!selectedFiles.length) return;
    const pdf = new jsPDF();
    
    selectedFiles.forEach((file, index) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const width = pdf.internal.pageSize.getWidth();
        const height = (img.height * width) / img.width;
        if (index !== 0) pdf.addPage();
        pdf.addImage(img, "JPEG", 0, 0, width, height);
        if (index === selectedFiles.length - 1) pdf.save("converted.pdf");
      };
    });
  };

  return (
    <motion.section className="converter"
      initial={{ opacity: 0, x: "100vw" }} animate={{ opacity: 1, x: 0 }} exit={{ x: "-100vw" }}
      transition={{ duration: 0.5 }}>
      <h2>JPG to PDF Converter</h2>
      <input type="file" accept="image/jpeg" multiple onChange={handleFileChange} />
      <button onClick={convertToPdf} className="convert-btn">Convert to PDF</button>
    </motion.section>
  );
};

export default JpgToPdf;