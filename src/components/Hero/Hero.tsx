"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    if (width === 0 || !pathRef.current || !containerRef.current) return;

    // Исходная плоская линия
    const flatPath = `M 0 0 L ${width} 0 Q ${width / 2} 0 0 0 Z`;
    gsap.set(pathRef.current, { attr: { d: flatPath } });

    // Создаем ScrollTrigger, который напрямую управляет математикой SVG
    gsap.to(textRef.current, {
      y: 250, // Параллакс текста
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0, // Без задержки (жесткая привязка к Lenis)
        onUpdate: (self) => {
          // self.progress идет от 0 до 1
          // Math.sin(progress * PI) дает плавную дугу от 0 -> 1 -> 0
          // Умножаем на 250px (максимальная глубина изгиба)
          const curveValue = Math.sin(self.progress * Math.PI) * 250;
          
          // Рендерим новый путь O(1)
          const dynamicPath = `M 0 0 L ${width} 0 Q ${width / 2} ${curveValue} 0 0 Z`;
          gsap.set(pathRef.current, { attr: { d: dynamicPath } });
        }
      }
    });

  }, { dependencies: [width], scope: containerRef });

  return (
    <section ref={containerRef} className={styles.hero}>
      <div ref={textRef} className={styles.content}>
        <h1 className={styles.title}>
          Studia 74<span className={styles.dot}>.</span>
        </h1>
      </div>

      {/* SVG контейнер для кривой Безье */}
      {width > 0 && (
        <svg className={styles.svgContainer}>
          <path ref={pathRef} className={styles.svgPath} />
        </svg>
      )}
    </section>
  );
}