"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./About.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%", // Анимация начнется, когда верх секции достигнет 75% высоты экрана
        once: true, // Проигрываем только один раз для чистоты восприятия
      },
    });

    // 1. Анимация разделительной линии (швейцарская строгость)
    tl.fromTo(
      dividerRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.2, ease: "expo.inOut" }
    )
    // 2. Появление заголовка
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    // 3. Каскадное появление параграфов O(N)
    .fromTo(
      textRefs.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out", 
        stagger: 0.15 // Точная, механическая задержка между абзацами
      },
      "-=0.8"
    );

  }, { scope: sectionRef });

  // Вспомогательная функция для добавления ссылок в массив ref
  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className={styles.about}>
      {/* Декоративная линия, задающая сетку */}
      <div ref={dividerRef} className={styles.divider}></div>

      <div className={styles.grid}>
        <div className={styles.metaColumn}>
          <h2 ref={titleRef} className={styles.title}>
            The Pursuit<br />
            Of Perfection.
          </h2>
          <div className={styles.metaData}>
            <span>EST. 2025</span>
            <span>ALMATY, KZ</span>
          </div>
        </div>

        <div className={styles.textColumn}>
          <p ref={addToRefs} className={styles.paragraph}>
            We are a digital atelier dedicated to the craft of web development. Much like the meticulous assembly of a Swiss timepiece, our work is defined by an uncompromising pursuit of perfection. We reject the ordinary, focusing entirely on striking aesthetics and fluid, high-impact interactions.
          </p>
          <p ref={addToRefs} className={styles.paragraph}>
            Founded in 2025 by our principal designer, Almas Suleimenov, the studio began with a singular vision: to engineer bespoke, unconventional digital solutions tailored for small and medium-sized businesses.
          </p>
          <p ref={addToRefs} className={styles.paragraph}>
            Today, our portfolio reflects this idealism, spanning collaborations with creative agencies, luxury residential complexes, and ambitious brands. We don't just build websites. We engineer mechanisms of digital excellence.
          </p>
        </div>
      </div>
    </section>
  );
}