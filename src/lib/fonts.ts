import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";

export const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const displayFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});
