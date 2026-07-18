"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { preloaderWords } from "./words";
import styles from "./Preloader.module.css";

interface Dimension {
  width: number;
  height: number;
}

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const wordsRef = useRef<HTMLParagraphElement[]>([]);
  const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 });

  useEffect(() => {
    // Дебаунс здесь избыточен для одноразового прелоадера, но состояние нужно для старта GSAP
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useGSAP(() => {
    if (dimension.width === 0 || wordsRef.current.length === 0) return;

    const tl = gsap.timeline();
    const totalWords = wordsRef.current.length;

    // 1. Анимация слов: O(N) setup, O(1) render с динамическим таймингом
    wordsRef.current.forEach((word, index) => {
      let holdTime: number;

      if (index === 0) {
        holdTime = 0.8; // Стартовое слово держим дольше
      } else if (index >= totalWords - 3) {
        holdTime = 0.4; // Последние 3 слова - выраженное замедление
      } else {
        // Высчитываем прогресс от 0 до 1 для средних слов и плавно увеличиваем задержку
        const progress = (index - 1) / (totalWords - 4);
        holdTime = 0.06 + (progress * 0.15); // Начинается с 0.06s и замедляется до 0.21s
      }

      tl.set(word, { visibility: "visible" })
        .to(word, {
          opacity: 1,
          duration: 0.05, // Появление резкое
        })
        .to(word, {
          opacity: 0,
          duration: 0.05,
          delay: holdTime,
        });
    });

    // 2. Математика кривой Безье: создание эффекта "разорванного яйца"
    const { width, height } = dimension;
    
    // Прямая линия внизу экрана
    const flatPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;
    // Натянутая кривая (точка тянется вверх на 600px, создавая "яйцо")
    const eggPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height - 600} 0 ${height} L0 0`;

    // Задаем исходное ровное состояние
    gsap.set(pathRef.current, { attr: { d: flatPath } });

    // 3. Вытягивание вверх и распрямление
    // Используем label "slideUp", чтобы синхронизировать движение контейнера и изгиб SVG
    tl.to(containerRef.current, {
      y: "-100vh",
      duration: 1.2,
      ease: "power4.inOut",
    }, "slideUp")
    .to(pathRef.current, {
      attr: { d: eggPath },
      duration: 0.6,
      ease: "power4.in",
    }, "slideUp") // Кривая натягивается первую половину пути
    .to(pathRef.current, {
      attr: { d: flatPath },
      duration: 0.6,
      ease: "power4.out",
    }, "slideUp+=0.6") // И распрямляется вторую половину
    .set(containerRef.current, { display: "none" });

  }, { dependencies: [dimension], scope: containerRef });

  // Предотвращаем рендер кривого SVG до получения размеров окна
  if (dimension.width === 0) return null;

  return (
    <div ref={containerRef} className={styles.preloader}>
      {preloaderWords.map((item, index) => (
        <p
          key={index}
          ref={(el) => {
            if (el) wordsRef.current[index] = el;
          }}
          className={styles.wordContainer}
          style={{ fontFamily: item.fontFamily }}
        >
          <span className={styles.dot}></span>
          {item.word}
        </p>
      ))}

      <svg className={styles.svgContainer}>
        <path ref={pathRef} className={styles.svgPath} />
      </svg>
    </div>
  );
}