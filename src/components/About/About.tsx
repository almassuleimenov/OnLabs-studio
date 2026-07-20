"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import BezierCurve from "@/components/BezierCurve/BezierCurve";
import styles from "./About.module.css";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className={styles.about}>
      <div className={styles.content}>
        <ScrollReveal
          enableBlur={true}
          baseOpacity={0.1}
          baseRotation={2}
          blurStrength={8}
          rotationEnd="bottom center"
          wordAnimationEnd="bottom center"
        >
          We are a digital atelier dedicated to the craft of web development. 
          Much like the meticulous assembly of a Swiss timepiece, our work is defined 
          by an uncompromising pursuit of perfection. We reject the ordinary, 
          focusing entirely on striking aesthetics and fluid interactions.
        </ScrollReveal>
      </div>

      {/* Вызываем переиспользуемый компонент */}
      <BezierCurve 
        triggerRef={sectionRef} 
        fillColor="var(--color-text)" 
      />
    </section>
  );
}