import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareBridge｜失智照護溝通顧問",
  description: "用繁體中文、英文或印尼文找出尊重長者的說法，並整理可確認的家屬照護摘要。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-TW"><body>{children}</body></html>;
}
