import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { motion } from "framer-motion";

const PdfToJpg = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const convertToJpg = async () => {
    if (!selectedFiles.length) return;
    let allImages = {};

    for (let file of selectedFiles) {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      await new Promise((resolve) => {
        fileReader.onload = async () => {
          const pdfData = new Uint8Array(fileReader.result);
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

          let images = [];
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = page.view[2];
            canvas.height = page.view[3];

            await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 2 }) }).promise;
            images.push(canvas.toDataURL("image/jpeg"));
          }

          allImages[file.name] = images;
          resolve();
        };
      });
    }
    setImageUrls(allImages);
  };

  return (
    <motion.section className="converter"
      initial={{ opacity: 0, x: "-100vw" }} animate={{ opacity: 1, x: 0 }} exit={{ x: "100vw" }}
      transition={{ duration: 0.5 }}>
      <h2>PDF to JPG Converter</h2>
      <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
      <button onClick={convertToJpg} className="convert-btn">Convert</button>
      <div className="image-preview">
        {Object.keys(imageUrls).map((file) => (
          <div key={file}>
            <h4>{file}</h4>
            {imageUrls[file].map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Page ${index + 1}`} width="300" />
                <a href={img} download={`${file}-page-${index + 1}.jpg`} className="download-btn">Download</a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default PdfToJpg;