'use client';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

export default function SelectLanguage() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const handleChange = (e) => {
        const selectedLocale = e.target.value;

        router.push(pathname, { locale: selectedLocale });
    };

    return (
        <select onChange={handleChange} defaultValue={currentLocale}>
            {routing.locales.map((locale) => (
                <option key={locale} value={locale}>
                    {locale.toUpperCase()}
                </option>
            ))}
        </select>
    );
}