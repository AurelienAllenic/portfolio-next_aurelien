"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../About/buttons_about.module.scss";

interface LanguageContextType {
  language: "FR" | "EN";
  toggleLanguage: (lang?: "FR" | "EN") => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<"FR" | "EN">("FR");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hideConfirmation, setHideConfirmation] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const langParam = searchParams.get("lang");
    if (langParam === "en" || langParam === "fr") {
      setLanguage(langParam.toUpperCase() as "EN" | "FR");
    }
  }, [searchParams]);

  const toggleLanguage = (newLang?: "FR" | "EN") => {
    setLanguage(newLang ?? (language === "FR" ? "EN" : "FR"));
    setShowConfirmation(true);
    setHideConfirmation(false);
    document.documentElement.style.overflow = "hidden";
  };
  

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showConfirmation && !hideConfirmation) {
      timer = setTimeout(() => {
        setHideConfirmation(true);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }, 1500);
    }

    if (hideConfirmation) {
      timer = setTimeout(() => {
        setShowConfirmation(false);
        setHideConfirmation(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [showConfirmation, hideConfirmation]);

  const confirmationClass = `${styles.container_confirmation_language} ${
    hideConfirmation ? styles.hide_confirmation : ""
  }`;

  return (
    <>
      {showConfirmation && (
        <div className={confirmationClass}>
          <p className={styles.content_confirmation_language}>
            {language === "FR" ? "Langue mise à jour : Français" : "Language changed : English"}
          </p>
        </div>
      )}
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        {children}
      </LanguageContext.Provider>
    </>
  );
};
