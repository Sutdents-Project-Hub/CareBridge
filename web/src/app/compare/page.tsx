import type { Metadata } from "next";
import { CareBridge } from "@/components/carebridge";

export const metadata: Metadata = { title: "CareBridge | One situation, three care roles" };

export default function Compare() {
  return <CareBridge initialMode="comparison" initialLocale="en" />;
}
