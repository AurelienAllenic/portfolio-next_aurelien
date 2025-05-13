// types.ts
export interface FolderData {
    id: number;
    link: string;
    title: string;
    titleEn: string;
  }
  
  export interface ProjectData {
    id: number;
    image: string;
    title: string;
    titleEn: string;
    github: string;
    demo: string;
    figma: string;
    folder: FolderData[];
    technologies: string[];
  }
  