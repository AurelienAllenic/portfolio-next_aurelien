"use client";

import React from 'react';
import SearchProject from './SeachProject/SearchProject';
import styles from "./portfolio.module.scss";
import { useLanguage } from '../Context/LanguageContext';

interface LanguageContextType {
  language: 'FR' | 'EN';
}

const PortfolioHeader: React.FC = () => {
  const { language } = useLanguage() as LanguageContextType;

  return (
    <section className={`${styles.container_portfolio} ${styles.margin}`}>
      <h1 className={`${styles.react} ${styles.first_title}`}>
        {language === 'FR' ? 'Projets' : 'Projects'}
      </h1>
      <SearchProject />
    </section>
  );
};

export default PortfolioHeader;
