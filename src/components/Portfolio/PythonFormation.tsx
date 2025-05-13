"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { openclassrooms3 } from "../Data";
import CardSection from './CardSection';
import styles from "./portfolio.module.scss";
import SearchProject from './SeachProject/SearchProject';
import { useLanguage } from '../Context/LanguageContext';
import { ProjectData } from './types';

interface PythonFormationProps {}

const PythonFormation: React.FC<PythonFormationProps> = () => {
  const [isopen, setIsOpen] = useState<boolean>(false);
  const {language} = useLanguage()
  const IMG = openclassrooms3[0].image;

  return (
    <>
      <a className={styles.anchor} id="formation-python"></a>
      <section className={`${styles.container_portfolio} ${styles.margin}`} id="formation-python">
        <h1 className={`${styles.react} ${styles.first_title}`}>
          {language === 'FR' ? 'Projets' : 'Projects'}
        </h1>
        <SearchProject />
        <div className={styles.container_title_img} style={{ position: 'relative' }}>
          <Image
            src={IMG}
            alt="Background Python Formation"
            fill
            style={{
              filter: 'blur(3px)',
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: 0,
            }}
            quality={75} // Réduit la qualité pour optimiser
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div
              onClick={() => setIsOpen(!isopen)}
              className={styles.container_arrow_title}
            >
              <h1 className={styles.main_title_portfolio}>
                {language === 'FR' ? 'Formation Python' : 'Python formation'}
              </h1>
            </div>
          </div>
        </div>
        {isopen && (
          <article className={styles.container_projects}>
            <CardSection datas={openclassrooms3 as ProjectData[]} />
          </article>
        )}
      </section>
    </>
  );
};

export default PythonFormation;