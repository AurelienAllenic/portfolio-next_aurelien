// hooks/useScrollToHash.ts
"use client";

import { useEffect } from "react";

export const useScrollToHash = () => {
  useEffect(() => {
    // Fonction pour gérer le scroll vers l'élément
    const scrollToElement = (hash: string) => {
      if (hash) {
        // Enlever le # du hash
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);

        if (element) {
          // Option 1: Scroll smooth basique
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Option 2: Scroll avec offset (si vous avez un header fixe)
          // const offset = 80; // Ajustez selon la hauteur de votre header
          // const elementPosition = element.offsetTop - offset;
          // window.scrollTo({
          //   top: elementPosition,
          //   behavior: 'smooth'
          // });
        }
      }
    };

    // Gérer le hash initial au chargement de la page
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // Petit délai pour s'assurer que les composants sont montés
        setTimeout(() => {
          scrollToElement(hash);
        }, 100);
      }
    };

    // Gérer les changements de hash
    const handleHashChange = () => {
      const hash = window.location.hash;
      scrollToElement(hash);
    };

    // Écouter les changements de hash
    window.addEventListener("hashchange", handleHashChange);

    // Gérer le hash initial
    handleInitialHash();

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
};

// Alternative: Hook avec plus d'options
export const useScrollToHashAdvanced = (offset: number = 0) => {
  useEffect(() => {
    const scrollToElement = (hash: string) => {
      if (hash) {
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);

        if (element) {
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      }
    };

    const handleHashChange = () => scrollToElement(window.location.hash);
    const handleInitialHash = () => {
      setTimeout(() => scrollToElement(window.location.hash), 100);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleInitialHash();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [offset]);
};
