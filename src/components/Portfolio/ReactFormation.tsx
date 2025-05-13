"use client";

import { openclassrooms2 } from "../Data";
import CardSection from './CardSection';
import styles from "./portfolio.module.scss";
import { useState } from 'react';
import { StaticImageData } from 'next/image';
import { useLanguage } from "../Context/LanguageContext";

// Define types for the data structure
interface ProjectData {
  image: StaticImageData;
  // Add other properties of openclassrooms2 items as needed
}

// Define type for the context
interface LanguageContextType {
  language: 'FR' | 'EN';
}

const ReactFormation = () => {
  const {language} = useLanguage() as LanguageContextType;
  const [isopen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <a className={styles.anchor} id='formation_react'></a>
      <section className={styles.container_portfolio} id="formation_react">
        <div className={styles.container_title_img} style={{ position: 'relative' }}>
          <div 
            style={{ 
              backgroundImage: "url('/assets/portfolio/fisheye.webp')",
              filter: 'blur(3px)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0
            }} 
          />
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1 
            }} 
          />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div onClick={() => setIsOpen(!isopen)} className={styles.container_arrow_title}>
              <h1 className={styles.main_title_portfolio}>{language === 'FR' ? 'Formation React' : 'React formation'}</h1>
            </div>
          </div>
        </div>
        {
          isopen &&
          <article className={styles.container_projects}>
            <CardSection datas={openclassrooms2 as ProjectData[]} />
          </article>
        }
      </section>
    </>
  );
}

export default ReactFormation;