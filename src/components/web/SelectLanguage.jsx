'use client';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const LOCALE_CONFIG = {
    en: { flag: '🇺🇸', name: 'English' },
    vi: { flag: '🇻🇳', name: 'Tiếng Việt' },
};

export default function SelectLanguage() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (selectedLocale) => {
        router.push(pathname, { locale: selectedLocale });
        setIsOpen(false);
    };

    const currentConfig = LOCALE_CONFIG[currentLocale] || LOCALE_CONFIG.en;

    return (
        <div ref={dropdownRef} className="relative">
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Select Language"
            >
                <span className="text-xl">{currentConfig.flag}</span>
                {/* <span className="hidden sm:inline">{currentConfig.name}</span> */}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FaChevronDown className="w-3 h-3 text-muted-foreground" />
                </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50"
                    >
                        {routing.locales.map((locale) => {
                            const config = LOCALE_CONFIG[locale];
                            const isActive = locale === currentLocale;

                            return (
                                <motion.button
                                    key={locale}
                                    onClick={() => handleChange(locale)}
                                    className={`
                                        w-full flex items-center gap-3 px-2 py-1 text-sm
                                        transition-colors text-left
                                        ${isActive
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'hover:bg-muted text-foreground'
                                        }
                                    `}
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="text-2xl">{config.flag}</span>
                                    <span className="flex-1">{config.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeLocale"
                                            className="w-2 h-2 rounded-full bg-primary"
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}