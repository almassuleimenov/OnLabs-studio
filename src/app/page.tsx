import Hero from "@/components/Hero/Hero";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Клиентский компонент со сложной анимацией Безье */}
      <Hero />
      
      {/* 
        Светлая секция для демонстрации "отрыва" темного Hero.
        Используем твой оригинальный текст и шрифты.
      */}
      <section className={styles.nextSection}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.sectionTitle}>
            Digital<br />
            Architecture.
          </h2>
          <p className={styles.sectionSubtitle}>
            Engineered for performance. Designed for impact. Welcome to On labs.
          </p>
        </div>
      </section>
    </main>
  );
}