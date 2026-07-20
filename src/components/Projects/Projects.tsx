"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import BezierCurve from "@/components/BezierCurve/BezierCurve";
import styles from "./Projects.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  title: string;
  category: string;
  slug: string;
}

const projects: Project[] = [
  { 
    title: "SNP.ARCH", 
    category: "Architecture Studio", 
    slug: "snp-arch"
  },
  { 
    title: "Symphonia", 
    category: "Premium Residences", 
    slug: "symphonia"
  },
  { 
    title: "V Club Villas", 
    category: "Luxury Real Estate", 
    slug: "v-club-villas"
  },
  { 
    title: "Soile AI", 
    category: "AI Platform", 
    slug: "soile-ai"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(() => {
    if (!containerRef.current || !listRef.current) return;

    // Плавное появление строк проектов при скролле
    const rows = gsap.utils.toArray(`.${styles.projectRow}`);
    gsap.fromTo(rows,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.projectsSection}>
      <div ref={listRef} className={styles.projectList}>
        {projects.map((project, index) => (
          <div
            key={index}
            onClick={() => router.push(`/projects/${project.slug}`)}
            className={styles.projectRow}
          >
            <h3 className={styles.projectTitle}>{project.title}</h3>
            
            <div className={styles.projectMeta}>
              <p className={styles.projectCategory}>{project.category}</p>
              <div className={styles.arrow}>↗</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.revealContainer}>
        <ScrollReveal
          enableBlur={true}
          baseOpacity={0.1}
          baseRotation={2}
          blurStrength={8}
          textClassName={styles.revealText}
          rotationEnd="bottom center"
          wordAnimationEnd="bottom center"
        >
          Every structure we build serves a distinct purpose. This is just a fraction of our digital architecture.
        </ScrollReveal>

        <button 
          onClick={() => router.push('/projects')} 
          className={styles.archiveButton}
        >
          View Full Archive
        </button>
      </div>

      {/* Вытягиваем светлый фон поверх темного NextSection */}
      <BezierCurve 
        triggerRef={containerRef} 
        fillColor="var(--color-bg)" 
      />
    </section>
  );
}