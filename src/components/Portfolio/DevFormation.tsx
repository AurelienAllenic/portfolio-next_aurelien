"use client";

import { openclassrooms1 } from "../Data";
import CardSection from './CardSection';
import styles from "./portfolio.module.scss";
import { useLanguage } from '../Context/LanguageContext';
import { useState } from 'react';
import { ProjectData } from './types';

// Define type for the context
interface LanguageContextType {
  language: 'FR' | 'EN';
}

const DevFormation = () => {
  const { language } = useLanguage() as LanguageContextType;
  const [isopen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <a className={styles.anchor} id='formation-web'></a>
      <section className={styles.container_portfolio} id="formation-web">
        <div className={styles.container_title_img} style={{ position: 'relative' }}>
          <div 
            style={{ 
              backgroundImage: "url('/assets/portfolio/booki.webp')",
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
              <h1 className={styles.main_title_portfolio}>{language === 'FR' ? 'Formation Dev Web' : 'Web Dev formation'}</h1>
            </div>
          </div>
        </div>
        {
          isopen &&
          <article className={styles.container_projects}>
            <CardSection datas={openclassrooms1 as ProjectData[]} />
          </article>
        }
      </section>
    </>
  );
}

export default DevFormation;