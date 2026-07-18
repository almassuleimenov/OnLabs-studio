import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import Preloader from "@/components/Preloader/Preloader";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  variable: "--font-fraunces"
});

export const metadata: Metadata = {
  title: "On labs | Digital Architecture",
  description: "Elite frontend architecture and world-class web design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${fraunces.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}