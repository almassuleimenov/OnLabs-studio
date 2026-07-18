export interface PreloaderItem {
  readonly word: string;
  readonly fontFamily: string;
}

export const preloaderWords: readonly PreloaderItem[] = [
  { word: 'Kod', fontFamily: 'var(--font-space-grotesk)' },
  { word: 'Syzba', fontFamily: 'var(--font-fraunces)' },
  { word: 'Damu', fontFamily: 'var(--font-space-grotesk)' },
  { word: 'Logika', fontFamily: 'var(--font-fraunces)' },
  { word: 'Derek', fontFamily: 'var(--font-space-grotesk)' },
  { word: 'Talda', fontFamily: 'var(--font-fraunces)' },
  { word: 'Ulgi', fontFamily: 'var(--font-space-grotesk)' },
  { word: 'Jeli', fontFamily: 'var(--font-fraunces)' },
  { word: 'Onim', fontFamily: 'var(--font-space-grotesk)' },
  { word: 'Terim', fontFamily: 'var(--font-fraunces)' },
  { word: 'Tizim', fontFamily: 'var(--font-space-grotesk)' },
  { word: 'Onir', fontFamily: 'var(--font-fraunces)' },
] as const;