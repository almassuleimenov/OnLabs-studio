import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heroTitle}>
        Digital<br />
        Architecture.
      </h1>
      <p className={styles.heroSubtitle}>
        Engineered for performance. Designed for impact. Welcome to On labs.
      </p>
    </main>
  );
}