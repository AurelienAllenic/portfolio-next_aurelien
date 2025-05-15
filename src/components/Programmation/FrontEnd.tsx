/* eslint-disable */
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, OrbitControls, Stage } from "@react-three/drei";
import { Atom } from './Atom';
import { FaArrowRight } from "react-icons/fa";
import styles from "./programmation.module.scss";

interface FrontEndProps {
  setCodingLanguage: (language: string) => void;
}

const FrontEnd: React.FC<FrontEndProps> = ({ setCodingLanguage }) => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '100px',
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
          <h1 className={`${styles.main_title_card} ${styles.underline}`}>Front End</h1>
          <button 
            className={styles.btn_card} 
            onClick={() => setCodingLanguage('Back End')}
          >
            Back End<FaArrowRight />
          </button>
        </div>
        <div className={styles.container_list_dev}>
          <ul className={styles.list_card}>
            <li>HTML</li>
            <li>CSS/SCSS</li>
            <li>Js/React</li>
            <li>NextJs</li>
          </ul>
        </div>
      </div>
      <div className={styles.position_animation_front} ref={canvasRef}>
        {isInView && (
          <Canvas>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.6} scale={1.5}>
                <Atom />
              </Stage>
              <OrbitControls enableZoom={false} autoRotate />
            </Suspense>
          </Canvas>
        )}
      </div>
    </>
  );
};

export default FrontEnd;