'use client';
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import SelectLanguage from "./SelectLanguage";
import ToggleTheme from "./ToogleTheme";

const MobileNav = () => {
    const t = useTranslations("Header");
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { href: "/products", label: "products" },
        // { href: "/categories", label: "category" },
        { href: "/about", label: "about" },
        { href: "/contacts", label: "contacts" }
    ];

    const isActive = (path) => pathname === path;

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="relative lg:hidden">
            {/* Mobile Menu Button */}
            <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground hover:bg-primary/10 rounded-full transition-colors relative z-60"
                aria-label="Toggle menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Dropdown Menu */}
                        <motion.nav
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="absolute top-14 right-0 w-72 bg-background/95 backdrop-blur-xl shadow-2xl border border-border/50 rounded-2xl overflow-hidden z-50"
                        >
                            {/* Header */}
                            <div className="md:hidden lg:hidden sm:block px-2  border-b border-border/50 bg-primary/5">
                                <div className="flex justify-end ">
                                    <ToggleTheme />
                                    <SelectLanguage />
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                {menuItems.map((item, index) => {
                                    const active = isActive(item.href);

                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={handleLinkClick}
                                                className="group relative block mx-2 my-1"
                                            >
                                                <div
                                                    className={`
                                                        relative px-4 py-3 rounded-xl
                                                        transition-all duration-300
                                                        ${active
                                                            ? 'bg-primary/15 text-primary font-bold'
                                                            : 'text-foreground/70 hover:text-primary hover:bg-primary/5 font-medium'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="relative z-10 text-sm">
                                                            {t(item.label)}
                                                        </span>

                                                        {active && (
                                                            <motion.div
                                                                layoutId="mobileActiveIndicator"
                                                                className="w-2 h-2 bg-primary rounded-full"
                                                                transition={{
                                                                    type: "spring",
                                                                    stiffness: 350,
                                                                    damping: 30
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </div >
    );
};

export default MobileNav;
