"use client";

import { IoLanguageOutline } from "react-icons/io5";
import { useLanguage } from "../Context/LanguageContext";
import styles from "./buttons_about.module.scss";
import { useRouter, useSearchParams } from "next/navigation";

export const ChangeLanguage = () => {
  const { language, toggleLanguage } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeLanguage = (lang: "FR" | "EN") => {
    toggleLanguage(lang);

    // Blocage scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Mise à jour de l'URL
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("lang", lang.toLowerCase()); // fr ou en
    router.push(`?${current.toString()}`);

    // Déblocage après 2s
    setTimeout(() => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }, 3000);
  };

  return (
    <div className={styles.container_change_languages}>
      <button
        className={styles.button_change_languages}
        onClick={() => changeLanguage(language === "FR" ? "EN" : "FR")}
        aria-label="Changer la langue"
      >
        <span>{language}</span>
      </button>
    </div>
  );
};
