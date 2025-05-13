"use client";

import About from "@/components/About/About";
import styles from "./page.module.scss";
import CvLetter from "@/components/CvLetter/CvLetter";
import Programmation from "@/components/Programmation/Programmation";
import PythonFormation from "@/components/Portfolio/PythonFormation";
import ReactFormation from "@/components/Portfolio/ReactFormation";
import './page.scss'
import DevFormation from "@/components/Portfolio/DevFormation";
import PersoProjects from "@/components/Portfolio/PersoProjects";
import Contact from "@/components/Contact/Contact";
import { LanguageProvider } from "@/components/Context/LanguageContext";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={styles.page}>
      <Suspense fallback={<div>Chargement...</div>}>
        <LanguageProvider>
          <About  />
          <CvLetter />
          <Programmation />
          <PythonFormation />
          <ReactFormation />
          <DevFormation />
          <PersoProjects />
          <Contact />
        </LanguageProvider>
      </Suspense>
    </div>
  );
}
