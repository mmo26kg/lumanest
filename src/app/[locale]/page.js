'use client';
import Image from "next/image";
import { useTranslations } from "next-intl";
import SelectLanguage from "@/components/web/SelectLanguage";
import { Link } from "@/i18n/navigation";
import { useTheme } from "next-themes";

export default function Home() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
        <h1 className="text-4xl font-bold mb-4">{t("HomePage.title")}</h1>
        <p className="text-lg mb-8">{t("HomePage.welcomeMessage")}</p>
        <div className="flex space-x-4 mb-8">
          <Link
            href="/about"
            className="text-blue-500 underline"
          >
            {t("HomePage.aboutLink")}
          </Link>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-red-300 dark:bg-green-700 rounded"
          >
            {t("HomePage.toggleTheme")}
          </button>
        </div>
        <SelectLanguage />
      </div>
    </>
  );
}
