"use client"
/* eslint-disable */
import { useState } from 'react';
import styles from "./programmation.module.scss";
import FrontEnd from './FrontEnd';
import BackEnd from './BackEnd';
import { useLanguage } from '@/components/Context/LanguageContext';

const Programmation = () => {
  const { language } = useLanguage();
  const [codingLanguage, setCodingLanguage] = useState('Front End');
  return (
    <>
      <a className={styles.anchor} id='languages'></a>
      <section className={styles.section_languages}>
          <h1 className={styles.main_title_languages} data-aos="fade-top" data-aos-duration="1000">{language === 'FR' ? 'Langages de Programmation' : 'Programming Languages'}</h1>
          <div className={styles.container_two_languages} >
            <div className={styles.container_langages_cards}>
              {codingLanguage === 'Front End' ? <FrontEnd setCodingLanguage={setCodingLanguage}/> : <BackEnd setCodingLanguage={setCodingLanguage}/>}
            </div>
          </div>
      </section>
    </>
  )
}

export default Programmation;