'use client';

/* eslint-disable */
import React from 'react'
import { AiOutlineMail, AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
import { Link as ScrollLink } from 'react-scroll'
import styles from './buttons_about.module.scss'

const Links: React.FC = () => {
  return (
    <article className={styles.container_links}>
      <ul className={styles.list_links}>
        <li className={styles.link_home}>
          <a 
            href="https://github.com/AurelienAllenic?tab=repositories" 
            target="_blank" 
            rel="noreferrer"
            aria-label="GitHub"
          >
            <AiFillGithub />
          </a>
        </li>
        <li className={styles.link_home}>
          <ScrollLink 
            to="contact" 
            smooth={true} 
            duration={500}
            aria-label="Contact"
          >
            <AiOutlineMail />
          </ScrollLink>
        </li>
        <li className={styles.link_home}>
          <a 
            href="https://www.linkedin.com/in/aur%C3%A9lien-allenic2000" 
            target="_blank" 
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <AiFillLinkedin />
          </a>
        </li>
      </ul>
    </article>
  )
}

export default Links