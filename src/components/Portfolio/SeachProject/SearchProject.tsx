"use client";

import React, { useState, useEffect } from 'react';
import { StaticImageData } from 'next/image';
import { openclassrooms1, openclassrooms2, openclassrooms3, projects } from "../../Data";
import CardSection from '../CardSection';
import styles from './searchProject.module.scss';
import { useLanguage } from '@/components/Context/LanguageContext';
import { ProjectData } from '../types';


const SearchProject: React.FC = () => {
  const { language } = useLanguage();
  // Combinaison de tous les projets en une seule liste de base
  const baseAllProjects: ProjectData[] = [...openclassrooms1, ...openclassrooms2, ...openclassrooms3, ...projects] as ProjectData[];
  const [searchData, setSearchData] = useState<ProjectData[]>(baseAllProjects);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<string[]>([]);

  // Fonction pour filtrer les projets en fonction de la valeur et du tableau donné
  const sortProject = (value: string, array: ProjectData[]): ProjectData[] => {
    return array
      .filter(project => {
        if (language === 'FR') {
          const title = project.title ? project.title.toLowerCase() : '';
          return title.includes(value.toLowerCase());
        } else {
          const title = project.titleEn ? project.titleEn.toLowerCase() : '';
          return title.includes(value.toLowerCase());
        }
      })
      .map((project, index) => ({
        ...project,
        id: `${project.title}-${index}-${Date.now()}` // id devient string ici
      }));
  };

  // Appliquer les filtres sélectionnés aux projets
  const applyFilters = (array: ProjectData[]): ProjectData[] => {
    if (filterSelected.length === 0) return array;
    return array.filter(project => {
      return filterSelected.some(filter => {
        const title = project.title ? project.title.toLowerCase() : '';
        return title.includes(filter.toLowerCase());
      });
    });
  };

  // Fonction principale pour vérifier et filtrer les projets
  const checkForProject = (value: string, array: ProjectData[]) => {
    // Filtrer les projets en fonction de la recherche textuelle
    const dataAfterSearchInput = sortProject(value, array);
    // Appliquer les filtres aux projets filtrés
    const dataAfterFilters = applyFilters(dataAfterSearchInput);
    // Mettre à jour les données de recherche
    setSearchData(dataAfterFilters);
  };

  // Gérer le changement d'entrée de texte
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length >= 3) {
      checkForProject(value, baseAllProjects);
    } else {
      setSearchData(baseAllProjects);
    }
  };

  // Mettre à jour les résultats de recherche lorsque la langue change
  useEffect(() => {
    if (searchValue.length >= 3) {
      checkForProject(searchValue, baseAllProjects);
    } else {
      setSearchData(baseAllProjects);
    }
  }, [language, searchValue]);

  return (
    <div id='search-project' className={styles.search_project}>
      <div className={styles.container_search_filters}>
        <div className={styles.container_input}>
          <input
            type="text"
            placeholder={language === 'FR' ? 'Recherchez un projet par description ou langage de programmation' : 'Search a project by description or programming language'}
            onChange={handleInputChange}
            value={searchValue}
          />
        </div>
      </div>
      <div className={styles.container_results}>
        {searchValue.length > 0 && searchValue.length < 3 && filterSelected.length === 0 ? (
          <div className={styles.container_no_projects}>
            <p className={styles.indication_research}>
              {language === 'FR' ? 'La recherche commence à partir de 3 caractères' : 'The search starts from 3 characters'}
            </p>
          </div>
        ) : searchValue.length > 0 ? (
          searchData.length > 0 ? (
            <CardSection datas={searchData} />
          ) : (
            <p>{language === 'FR' ? 'Aucun projet trouvé' : 'No project found'}</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default SearchProject;