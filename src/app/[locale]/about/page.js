import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SelectLanguage from "@/components/web/SelectLanguage";

export default function AboutPage() {
    const t = useTranslations("AboutPage");
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
            <p className="text-lg">
                {t('title')}
            </p>
            <SelectLanguage />
            <Link href="/" className="text-blue-500 underline mt-4 inline-block">
                Back to Home
            </Link>
        </div>
    );
}