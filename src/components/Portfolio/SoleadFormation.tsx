"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { solead } from "../Data";
import CardSection from './CardSection';
import styles from "./portfolio.module.scss";
import { useLanguage } from '../Context/LanguageContext';
import { ProjectData } from './types';

interface LanguageContextType {
  language: 'FR' | 'EN';
}

const SoleadFormation: React.FC = () => {
  const [isopen, setIsOpen] = useState<boolean>(false);
  const { language } = useLanguage() as LanguageContextType;
  const IMG = solead[0]?.image ?? '';

  return (
    <>
      <a className={styles.anchor} id="projets-solead"></a>
      <section className={`${styles.container_portfolio}`} id="projets-solead">
        <div className={styles.container_title_img} style={{ position: 'relative' }}>
          <Image
            src={IMG}
            alt="Projets Solead"
            fill
            style={{
              filter: 'blur(3px)',
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: 0,
            }}
            quality={75}
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
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div onClick={() => setIsOpen(!isopen)} className={styles.container_arrow_title}>
              <h1 className={styles.main_title_portfolio}>
                {language === 'FR' ? 'Projets Solead' : 'Solead Projects'}
              </h1>
            </div>
          </div>
        </div>
        {isopen && (
          <article className={styles.container_projects}>
            <CardSection datas={solead as ProjectData[]} />
          </article>
        )}
      </section>
    </>
  );
};

export default SoleadFormation;
