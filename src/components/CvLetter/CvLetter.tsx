"use client"
/* eslint-disable */
import React from "react";
import Image from "next/image";
import styles from "./cvLetter.module.scss";
import CV from "../../assets/cv.png";
import CVEN from "../../assets/CV_EN.png";
import CVPDF from "../../assets/CV.pdf";
import CVENPDF from "../../assets/CV_EN.pdf";
//import { useLanguage } from "../Context/LanguageContext";
/*
import Motivation from "../../assets/motivation.png";
import MotivationPDF from "../../assets/motivation.pdf";
*/

interface CvLetterProps {}

declare module "*.pdf" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

const CvLetter: React.FC<CvLetterProps> = () => {
  //const { language } = useLanguage();

  const downloadDocument = (document: string): void => {
    window.open(document, "_blank");
  };

  const language = 'FR';

  return (
    <>
      <section className={styles.cvLetter} id="cvLetter">
        <h1 className={styles.main_title_languages}>Curriculum</h1>
        <div className={styles.cvLetter_container}>
          {language === "FR" ? (
            <div
              className={styles.container_cv}
              onClick={() => downloadDocument(CVPDF)}
            >
              <Image 
                src={CV} 
                alt="CV en français"
                width={500}
                height={700}
                priority
              />
            </div>
          ) : (
            <div
              className={styles.container_cv}
              onClick={() => downloadDocument(CVENPDF)}
            >
              <Image 
                src={CVEN} 
                alt="CV in English"
                width={500}
                height={700}
                priority
              />
            </div>
          )}
          {/*
            <div className='container_letter' onClick={() => downloadDocument(MotivationPDF)}>
                <img src={Motivation} alt="" />
            </div>
        */}
        </div>
      </section>
    </>
  );
};

export default CvLetter;