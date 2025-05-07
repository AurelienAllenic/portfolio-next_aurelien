import React from "react";
import Image from "next/image";
import IMG from "../../assets/about.jpg";
import styles from "./about.module.scss";
import { useLanguage } from "../Context/LanguageContext";
import Logos from "./Logos";
import Links from "./Links";
import Navbar from "../Nav/Nav";
import { ChangeLanguage } from "./ChangeLanguage";

type DocumentType = string;

const About: React.FC = () => {
  const { language } = useLanguage();

  const downloadDocument = (document: DocumentType): void => {
    window.open(document, "_blank");
  };

  return (
    <>
      <Navbar />
      <a className={styles.anchor} id="home"></a>
      <section className={styles.container_about}>
            <ChangeLanguage />
        <div className={styles.container_title_about}>
          <h1 className={styles.main_title_about}>Aurélien Allenic</h1>
          <h2 className={styles.sub_title}>
            {language === "FR" ? "Développeur Web" : "Web Developer"}
          </h2>
        </div>

        <div className={styles.sub_container_about}>
          <div className={styles.container_img_about}>
            <Image 
              src={IMG} 
              alt="Aurélien Allenic" 
              width={500}
              height={500}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className={styles.container_text_about}>
            {language === "FR" ? (
              <p>
                Diplômé de trois formations Openclassrooms : développeur web,
                développeur d'applications javascript / react et développeur
                d'applications Python, j'ai également suivi une piscine en école
                d'informatique.
                <br />
                Je suis actuellement en 4éme année de mastère chez{" "}
                <a
                  href="https://www.iim.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link_bio}
                >
                  IIM Digital School
                </a>{" "}
                dans le cadre d'une alternance chez{" "}
                <a
                  href="https://www.soleadagency.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link_bio}
                >
                  Solead Agency
                </a>{" "}
                en tant que développeur Wordpress.
                <br />
                J'ai aussi réalisé des projets hors de mes parcours et possède
                une certaine appétence pour le développement web et mobile.
              </p>
            ) : (
              <p>
                Graduated from three OpenClassrooms programs : web developer,
                JavaScript/React application developer, and Python application
                developer, I have also completed a coding bootcamp at a computer
                science school.
                <br />
                I'm also in the fourth year of my master's degree at{" "}
                <a
                  href="https://www.iim.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link_bio}
                >
                  IIM Digital School
                </a>{" "}
                as part of an apprenticeship at{" "}
                <a
                  href="https://www.soleadagency.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link_bio}
                >
                  Solead Agency
                </a>{" "}
                as a Wordpress developer. <br />I have also completed projects
                outside of my courses and have a keen interest in web and mobile
                development.
              </p>
            )}
          </div>
        </div>
        <Logos />
        <Links />
      </section>
    </>
  );
};

export default About;
