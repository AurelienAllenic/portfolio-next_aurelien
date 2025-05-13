"use client";
import React from "react";
import Image from "next/image";
import styles from "./cvLetter.module.scss";
import { useLanguage } from "../Context/LanguageContext";

// imports séparés dans des objets dynamiques
const CVAssets = {
  FR: {
    image: "/assets/CV.png",
    pdf: "/assets/CV.pdf",
  },
  EN: {
    image: "/assets/CV_EN.png",
    pdf: "/assets/CV_EN.pdf",
  },
};

const CvLetter: React.FC = () => {
  const { language } = useLanguage();

  const downloadDocument = (document: string): void => {
    window.open(document, "_blank");
  };

  const { image, pdf } = CVAssets[language];

  return (
    <section className={styles.cvLetter} id="cvLetter">
      <h1 className={styles.main_title_languages}>Curriculum</h1>
      <div className={styles.cvLetter_container}>
        <div className={styles.container_cv} onClick={() => downloadDocument(pdf)}>
          <Image
            src={image}
            alt={language === "FR" ? "CV en français" : "CV in English"}
            width={500}
            height={700}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default CvLetter;
