import { notFound } from "next/navigation";
import { CareBridge } from "@/components/carebridge";
import { languages, roles } from "@/components/copy";

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.flatMap(({ id }) => roles.map((profile) => ({ locale: id, profile })));
}

export default async function TryExample({ params }: { params: Promise<{ locale: string; profile: string }> }) {
  const { locale, profile } = await params;
  const language = languages.find(({ id }) => id === locale);
  const role = roles.find((item) => item === profile);
  if (!language || !role) notFound();

  return <CareBridge initialLocale={language.id} initialExampleRole={role} />;
}
