"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import styles from "./SmoothScroll.module.css";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Инициализация инстанса Lenis
    const lenis = new Lenis({
      duration: 1.2, // Длительность инерции
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Плавная кривая замедления
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2, // Ускоряем скролл на тачпадах
    });

    lenisRef.current = lenis;

    // 2. Синхронизация с GSAP Ticker
    // Это критически важно для производительности. Вместо отдельного requestAnimationFrame 
    // мы заставляем GSAP управлять временем Lenis.
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000); // GSAP Ticker передает время в секундах, Lenis требует миллисекунды
    };

    // Привязываем обновление Lenis к глобальному циклу GSAP
    gsap.ticker.add(updateLenis);
    
    // Отключаем задержку GSAP, чтобы предотвратить скачки при переключении вкладок
    gsap.ticker.lagSmoothing(0);

    // 3. Cleanup: Предотвращение утечек памяти (особенно в Strict Mode)
    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className={styles.scrollContainer}>
      {children}
    </div>
  );
}