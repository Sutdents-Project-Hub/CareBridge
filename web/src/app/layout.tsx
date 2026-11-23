import type { Metadata } from "next";
import "@fontsource/fredoka/latin-600.css";
import "@fontsource/andika/latin-400.css";
import "@fontsource/andika/latin-700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareBridge | Dementia care conversations",
  description: "Find respectful words for everyday dementia care in English, Traditional Chinese, or Indonesian, and review a factual family handover.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
