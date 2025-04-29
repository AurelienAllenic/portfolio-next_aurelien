/* eslint-disable */
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Python } from './Python';
import { FaArrowRight } from "react-icons/fa";
import styles from "./programmation.module.scss";

interface BackEndProps {
  setCodingLanguage: (language: string) => void;
}

const BackEnd: React.FC<BackEndProps> = ({ setCodingLanguage }) => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className={styles.card_front}>
        <div className={styles.container_title_button}>
          <h1 className={`${styles.main_title_card} ${styles.underline}`}>Back End</h1>
          <button 
            className={styles.btn_card} 
            onClick={() => setCodingLanguage('Front End')}
          >
            Front End<FaArrowRight />
          </button>
        </div>
        <div className={styles.container_list_dev}>
          <ul className={styles.list_card}>
            <li>nodeJS</li>
            <li>MongoDb</li>
            <li>Python</li>
            <li>Django</li>
          </ul>
        </div>
      </div>
      <div className={styles.position_animation_front} ref={canvasRef}>
        {isInView && (
          <Canvas>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.6} scale={1.5}>
                <Python />
              </Stage>
              <OrbitControls enableZoom={false} autoRotate />
            </Suspense>
          </Canvas>
        )}
      </div>
    </>
  );
};

export default BackEnd;