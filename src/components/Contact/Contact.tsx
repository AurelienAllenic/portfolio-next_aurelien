"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./contact.module.scss";
import { FaArrowRight } from "react-icons/fa";
//import { useLanguage } from "../Context/LanguageContext";

// Define type for the context
interface LanguageContextType {
  language: 'FR' | 'EN';
}

// Define type for form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  //const { language } = useLanguage() as LanguageContextType;
  const language = 'FR'
  const [isError, setIsError] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {}, [showConfirmation]);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const formData: FormData = {
      name: form.current.name.value,
      email: form.current.email.value,
      message: form.current.message.value,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_VERCEL_LINK}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsError(false);
        setShowConfirmation(true);
        document.body.classList.add("overflow");
        setTimeout(() => {
          setShowConfirmation(false);
          document.body.classList.remove("overflow");
        }, 3000);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setIsError(true);
    }

    form.current.reset();
  };

  return (
    <>
      {showConfirmation && (
        <div className={styles.container_confirmation_contact}>
          <p className={styles.content_confirmation_contact}>
            {isError
              ? language === "FR"
                ? "Message non envoyé !"
                : "Message not sent !"
              : language === "FR"
              ? "Message envoyé !"
              : "Message Sent !"}
          </p>
        </div>
      )}
      <a className={styles.anchor} id="contact"></a>
      <section className={styles.section_contact} id="no_border">
        <form ref={form} onSubmit={sendEmail} className={styles.form}>
          <h1 className={styles.main_title_contact}>Contact</h1>
          <h2 className={styles.sub_title_contact}>
            {language === "FR"
              ? "N'hésitez pas à me contacter, je reviendrai vers vous dans les plus brefs délais"
              : "Feel free to contact me, I will come back to you shortly"}
          </h2>
          <div className={styles.container_inputs}>
            <input
              id="name"
              type="text"
              name="name"
              placeholder={language === "FR" ? "Votre Nom" : "Your full Name"}
              required
              className={styles.input}
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder={language === "FR" ? "Votre Email" : "Your Email"}
              required
              className={styles.input}
            />
          </div>
          <textarea
            id="textarea"
            name="message"
            placeholder={language === "FR" ? "Votre message" : "Your message"}
            rows={7}
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.btn_submit}>
            {language === "FR" ? "Envoyer" : "Send"}
            <FaArrowRight />
          </button>
        </form>
      </section>
    </>
  );
};

export default Contact;