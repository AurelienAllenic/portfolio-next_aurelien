"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from "./portfolio.module.scss";
import { useLanguage } from '../Context/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

// Define types for the data structure
interface FolderData {
  id: string;
  link: string;
  title: string;
  titleEn: string;
}

interface ProjectData {
  id: string;
  image: string; // Changed to string for image path
  title: string;
  titleEn: string;
  github: string;
  demo: string;
  figma: string;
  folder: FolderData[];
}

interface CardSectionProps {
  datas: ProjectData[];
}

interface LanguageContextType {
  language: 'FR' | 'EN';
}

const CardSection: React.FC<CardSectionProps> = ({ datas }) => {
  const { language } = useLanguage() as LanguageContextType;
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    const touchDown = touchPosition;
    if (touchDown === null) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) handleNextCard();
    if (diff < -5) handlePrevCard();

    setTouchPosition(null);
    e.stopPropagation();
  };

  useEffect(() => {
    ScrollTrigger.defaults({ passive: true });
    cardsRef.current = cardsRef.current.slice(0, datas.length);

    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.fromTo(card, {
          autoAlpha: 0,
          scale: 0.5,
        }, {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            end: "bottom -office0%",
            toggleActions: "play reverse play none",
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [datas]);

  const handleCardClick = (index: number) => {
    if (selectedCardIndex !== null && selectedCardIndex !== index) {
      return;
    }

    const card = cardsRef.current[index];

    if (selectedCardIndex === index) {
      return;
    }

    setSelectedCardIndex(index);
    document.body.classList.add('openModal');
    document.body.style.overflow = 'hidden';

    gsap.set(card, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      scale: 0.5,
      x: '0%',
      y: '0%',
      autoAlpha: 0
    });

    gsap.to(card, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      scale: 1,
      x: '-50%',
      y: '-50%',
      autoAlpha: 1,
      zIndex: 999,
      duration: 0.5,
      ease: 'power3.inOut',
    });
  };

  const handleCloseCard = () => {
    if (selectedCardIndex !== null) {
      const card = cardsRef.current[selectedCardIndex];

      gsap.to(card, {
        position: 'relative',
        top: 50,
        left: 0,
        scale: 0.5,
        autoAlpha: 0,
        zIndex: 999,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(card, {
            clearProps: 'all'
          });
        }
      });

      setSelectedCardIndex(null);
      document.body.classList.remove('openModal');
      document.body.style.overflow = '';
    }
  };

  const handlePrevCard = () => {
    if (selectedCardIndex !== null) {
      handleCloseCard();
      const newIndex = selectedCardIndex === 0 ? datas.length - 1 : selectedCardIndex - 1;
      animateCardChange(newIndex);
    }
  };

  const handleNextCard = () => {
    if (selectedCardIndex !== null) {
      handleCloseCard();
      const newIndex = selectedCardIndex === datas.length - 1 ? 0 : selectedCardIndex + 1;
      animateCardChange(newIndex);
    }
  };

  const animateCardChange = (newIndex: number) => {
    if (selectedCardIndex === null || selectedCardIndex === newIndex) {
      return;
    }

    const currentCard = cardsRef.current[selectedCardIndex];
    const newCard = cardsRef.current[newIndex];

    if (currentCard) {
      gsap.to(currentCard, {
        position: 'relative',
        scale: 0.5,
        zIndex: 1,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(currentCard, {
            clearProps: 'all',
            scale: 0.5
          });
        }
      });
    }

    if (newCard) {
      gsap.set(newCard, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        scale: 0.5,
        x: '-50%',
        y: '-50%',
        zIndex: 999,
        autoAlpha: 0
      });

      gsap.to(newCard, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        scale: 1,
        x: '-50%',
        y: '-50%',
        zIndex: 999,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }

    setSelectedCardIndex(newIndex);
    document.body.classList.add('openModal');
  };

  const handleCardHover = (card: HTMLElement | null) => {
    if (selectedCardIndex === null && card) {
      gsap.to(card, { scale: 1.05, duration: 0.3 });
    }
  };

  const handleCardHoverEnd = (card: HTMLElement | null) => {
    if (selectedCardIndex === null && card) {
      gsap.to(card, { scale: 1, duration: 0.5 });
    }
  };

  return (
    <>
      {datas.map(({ id, image, title, titleEn, github, demo, figma, folder }: ProjectData, index: number) => {
        const shouldAddClass = index === 3 && datas.length < 5;
        const shouldAddClass2 = index === 9 && datas.length < 11;
        const shouldAddClass3 = index === 4 && datas.length < 6;

        return (
          <article
            key={`${id}-${index}`}
            ref={el => cardsRef.current[index] = el}
            className={`${styles.card_single_project} ${selectedCardIndex !== null && selectedCardIndex !== index ? styles.disabled : styles.enabled} ${shouldAddClass || shouldAddClass2 || shouldAddClass3 ? styles.take_space : ''}`}
            onClick={() => handleCardClick(index)}
            onMouseEnter={() => handleCardHover(cardsRef.current[index])}
            onMouseLeave={() => handleCardHoverEnd(cardsRef.current[index])}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {selectedCardIndex === index && (
              <button className={styles.close_button} onClick={(e) => { e.stopPropagation(); handleCloseCard(); }}><IoMdClose /></button>
            )}
            <div className={styles.arrows_img}>
              {selectedCardIndex === index && (
                <>
                  {datas.length > 1 && <button className={styles.arrow_prev} onClick={(e) => { e.stopPropagation(); handlePrevCard(); }}><IoIosArrowBack /></button>}
                  <Image
                    src={image}
                    className={styles.img_single_project}
                    alt={language === 'FR' ? title : titleEn}
                    width={400} // Adjust based on your image dimensions
                    height={300} // Adjust based on your image dimensions
                    priority={index === 0} // Optional: prioritize first image for LCP
                  />
                  {datas.length > 1 && <button className={styles.arrow_next} onClick={(e) => { e.stopPropagation(); handleNextCard(); }}><IoIosArrowForward /></button>}
                </>
              )}
              {selectedCardIndex !== index && (
                <Image
                  src={image}
                  className={styles.img_single_project}
                  alt={language === 'FR' ? title : titleEn}
                  width={400}
                  height={300}
                  priority={index === 0}
                />
              )}
            </div>
            
            <p className={styles.content_single_project}>{language === 'FR' ? title : titleEn}</p>
            <div className={styles.container_links_portfolio}>
              {figma === '' && folder.length === 0 ? (
                <>
                  {github !== '' && demo !== '' ? (
                    <a href={github} target="_blank" className={styles.link_single_project}>Github</a>
                  ) : github !== '' ? (
                    <a href={github} target="_blank" className={styles.link_single_project_figma}>Github</a>
                  ) : null}
                  {demo !== '' && <a href={demo} target="_blank" className={styles.link_single_project}>{language === 'FR' ? 'Démo en direct' : 'Live Demo'}</a>}
                </>
              ) : figma !== '' ? (
                <a href={figma} target="_blank" download className={styles.link_single_project_figma}>Figma</a>
              ) : folder.length > 0 && folder.map((file: FolderData, idx: number) => (
                <a key={`${file.id}-${idx}`} href={file.link} target="_blank" className={styles.link_single_project}>{language === 'FR' ? file.title : file.titleEn}</a>
              ))}
            </div>
          </article>
        );
      })}
    </>
  );
};

export default CardSection;