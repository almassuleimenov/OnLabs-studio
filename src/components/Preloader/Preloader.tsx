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
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useGSAP(() => {
    if (dimension.width === 0 || wordsRef.current.length === 0) return;

    const tl = gsap.timeline();
    const totalWords = wordsRef.current.length;

    // 1. Динамическая кривая времени для слов
    wordsRef.current.forEach((word, index) => {
      let holdTime = 0.06; // Исходная быстрая скорость

      if (index >= totalWords - 3) {
        holdTime = 0.4; // Последние 3 слова сильно замедляются
      } else if (index > totalWords / 2) {
        // Плавное замедление после середины списка
        holdTime = 0.06 + ((index - (totalWords / 2)) * 0.04); 
      }

      tl.set(word, { visibility: "visible" })
        .to(word, { opacity: 1, duration: 0.02 }) // Мгновенное появление
        .to(word, { opacity: 0, duration: 0.02 }, `+=${holdTime}`); // Удержание и исчезновение
    });

    // 2. Математика "липкого яйца" Денниса Снелленберга
    const { width, height } = dimension;
    
    const flatPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;
    const curvePath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;

    gsap.set(pathRef.current, { attr: { d: flatPath } });

    // 3. Синхронная двухфазная анимация
    tl.to(containerRef.current, {
      y: "-100vh",
      duration: 1.0,
      ease: "power3.inOut",
    }, "slideUp") // Метка для синхронизации
    .to(pathRef.current, {
      attr: { d: curvePath },
      duration: 0.5,
      ease: "power3.in",
    }, "slideUp") // Первая половина подъема: натягиваем яйцо вниз
    .to(pathRef.current, {
      attr: { d: flatPath },
      duration: 0.5,
      ease: "power3.out",
    }, "slideUp+=0.5") // Вторая половина: резко схлопываем в прямую линию
    .set(containerRef.current, { display: "none" });

  }, { dependencies: [dimension], scope: containerRef });

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