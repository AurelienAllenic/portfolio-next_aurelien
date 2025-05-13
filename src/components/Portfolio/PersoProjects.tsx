/* eslint-disable */
"use client";

import React, { useState } from 'react';
import CardSection from './CardSection';
import { projects } from "../Data";
import styles from "./portfolio.module.scss";
import { useLanguage } from '../Context/LanguageContext';
import { IoIosArrowUp } from "react-icons/io";
import { StaticImageData } from 'next/image';

// Define types for the data structure
interface ProjectData {
  image: StaticImageData;
  // Add other properties of projects items as needed
}

// Define type for the context
interface LanguageContextType {
  language: 'FR' | 'EN';
}

const PersoProjects = () => {
  const { language } = useLanguage();
  const [isopen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <a className={styles.anchor} id='projets-personnels'></a>
      <section className={styles.container_portfolio} id='projets-personnels'>
        <div className={styles.container_title_img} style={{ position: 'relative' }}>
          <div 
            style={{ 
              backgroundImage: "url('/assets/portfolio/paro.webp')", 
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
              <h1 className={styles.main_title_portfolio}>{language === 'FR' ? 'Projets Personnels' : 'Personal Projects'}</h1>
            </div>
          </div>
        </div>
        {
          isopen &&
          <article className={styles.container_projects}>
            <CardSection datas={projects as ProjectData[]} />
          </article>
        }
      </section>
    </>
  );
}

export default PersoProjects;