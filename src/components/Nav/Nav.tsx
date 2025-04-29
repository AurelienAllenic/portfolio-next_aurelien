"use client"

import React, { useState, useEffect } from "react";
import styles from "./nav.module.scss";
import dropdownStyles from "./Dropdown/dropdown.module.scss";
import { DropDownElements } from "./Dropdown/DropdownElements";
import { Link } from "react-scroll";
//import { useLanguage } from '../Context/LanguageContext';

const Navbar: React.FC = () => {
  //const { language } = useLanguage();
  const [showlinks, setShowlinks] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [navbarBackground, setNavbarBackground] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const language = 'FR';

  const handleScroll = () => {
    if (window.innerWidth > 1073) {
      if (window.scrollY > 50) {
        setNavbarBackground(true);
      } else {
        setNavbarBackground(false);
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth < 1073) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1073);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeDropdown = () => {
    setDropdown(false);
  };

  const closeNavMob = () => {
    const navElement = document.getElementById("nav");
    if (!navElement?.classList.contains("show-nav")) {
      return;
    }
    navElement.classList.remove("show-nav");
    closeDropdown();
    setShowlinks(false);
    document.body.classList.remove(styles.overflow);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const onMouseEnter = () => {
    if (window.innerWidth >= 960) {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth >= 960) {
      setDropdown(false);
    }
  };

  const handleShowLinks = () => {
    setShowlinks(!showlinks);
    if (showlinks) {
      document.body.classList.remove(styles.overflow);
    } else {
      document.body.classList.add(styles.overflow);
    }
  };

  return (
    <>
      <div
        className={`${styles.navbar} ${showlinks ? styles['show-nav'] : styles['hide-nav']} ${
          navbarBackground || isMobile ? styles.scrolled : ''
        }`}
        id="nav"
      >
        <ul className={`${styles.navbar_links} ${isMobile ? styles.scrolled : ''}`}>
          <li className={`${styles.navbar_item} ${styles['slideInDown-1']}`}>
            <Link
              className={`${styles.navbar_link} ${
                navbarBackground || isMobile ? styles.scrolled_no_back : ''
              }`}
              to="home"
              spy={true}
              smooth={true}
              offset={0}
              duration={800}
              onClick={handleShowLinks}
            >
              {language === 'FR' ? 'Accueil' : 'Home'}
            </Link>
          </li>
          <li className={`${styles.navbar_item} ${styles['slideInDown-2']}`}>
            <Link
              className={`${styles.navbar_link} ${
                navbarBackground || isMobile ? styles.scrolled_no_back : ''
              }`}
              to="cvLetter"
              spy={true}
              smooth={true}
              offset={0}
              duration={800}
              onClick={handleShowLinks}
            >
              Curriculum
            </Link>
          </li>
          <li className={`${styles.navbar_item} ${styles['slideInDown-3']}`}>
            <Link
              className={`${styles.navbar_link} ${
                navbarBackground || isMobile ? styles.scrolled_no_back : ''
              }`}
              to="languages"
              spy={true}
              smooth={true}
              offset={0}
              duration={800}
              onClick={handleShowLinks}
            >
              Programmation
            </Link>
          </li>
          <li
            className={`${styles.navbar_item} ${styles['slideInDown-4']}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div 
              className={`${styles.navbar_link} ${
                navbarBackground || isMobile ? styles.scrolled_no_back : ''
              }`}
              onClick={toggleDropdown}
            >
              Portfolio
              {dropdown && (
                <ul className={`${dropdownStyles['dropdown-menu']} ${
                  navbarBackground || isMobile ? styles.scrolled : ''
                }`}>
                  {DropDownElements.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.path}
                        className={styles.linkStyle}
                        onClick={closeNavMob}
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={800}
                      >
                        <span>{language === 'FR' ? item.title : item.titleEn}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li className={`${styles.navbar_item} ${styles['slideInDown-5']}`}>
            <Link
              className={`${styles.navbar_link} ${
                navbarBackground || isMobile ? styles.scrolled_no_back : ''
              }`}
              to="contact"
              spy={true}
              smooth={true}
              offset={0}
              duration={800}
              onClick={handleShowLinks}
            >
              Contact
            </Link>
          </li>
        </ul>
        <button className={styles.navbar_burger} onClick={handleShowLinks}>
          <span className={styles['burger-bar']}></span>
        </button>
      </div>
    </>
  );
}

export default Navbar;