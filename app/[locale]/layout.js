import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

const messagesMap = {
  en: () => import("../../messages/en.json"),
  hi: () => import("../../messages/hi.json"),
  es: () => import("../../messages/es.json"),
  pt: () => import("../../messages/pt.json"),
  zh: () => import("../../messages/zh.json"),
  fr: () => import("../../messages/fr.json"),
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  const loadMessages = messagesMap[locale];

  if (!loadMessages) {
    notFound();
  }

  const messages = (await loadMessages()).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      {children}
    </NextIntlClientProvider>
  );
}