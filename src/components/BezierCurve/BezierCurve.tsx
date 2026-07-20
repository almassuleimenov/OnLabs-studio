"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useWindowSize } from "@/hooks/useWindowSize";
import styles from "./BezierCurve.module.css";

interface BezierCurveProps {
  triggerRef: React.RefObject<HTMLElement | null>;
  fillColor?: string;
  curveDepth?: number;
}

export default function BezierCurve({ 
  triggerRef, 
  fillColor = "var(--color-bg)", 
  curveDepth = 250 
}: BezierCurveProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const { width } = useWindowSize(150); // Используем наш оптимизированный хук

  useGSAP(() => {
    if (width === 0 || !pathRef.current || !triggerRef.current) return;

    // 1. Устанавливаем изначальную плоскую линию
    const flatPath = `M 0 0 L ${width} 0 Q ${width / 2} 0 0 0 Z`;
    gsap.set(pathRef.current, { attr: { d: flatPath } });

    // 2. Анимация оттяжки при выходе секции из области видимости
    gsap.to(triggerRef.current, {
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 0,
        onUpdate: (self) => {
          const curveValue = Math.sin(self.progress * Math.PI) * curveDepth;
          const dynamicPath = `M 0 0 L ${width} 0 Q ${width / 2} ${curveValue} 0 0 Z`;
          gsap.set(pathRef.current, { attr: { d: dynamicPath } });
        },
      },
    });
  }, { dependencies: [width], scope: triggerRef });

  if (width === 0) return null;

  return (
    <svg className={styles.svgContainer}>
      <path ref={pathRef} className={styles.svgPath} style={{ fill: fillColor }} />
    </svg>
  );
}