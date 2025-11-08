'use client';
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";

const DesktopNav = () => {
    const t = useTranslations("Header");
    const pathname = usePathname();

    const menuItems = [
        { href: "/products", label: "products" },
        { href: "/categories", label: "category" },
        { href: "/about", label: "about" },
        { href: "/contacts", label: "contacts" }
    ];

    const isActive = (path) => pathname === path;

    return (
        <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => {
                const active = isActive(item.href);

                return (
                    <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        <Link
                            href={item.href}
                            className={`
                                relative px-4 py-2 text-sm md:text-base
                                transition-all duration-300 block
                                ${active
                                    ? 'text-primary font-extrabold'
                                    : 'text-foreground hover:text-primary font-medium'
                                }
                            `}
                        >
                            <span className="relative z-10">{t(item.label)}</span>

                            {active && (
                                <motion.div
                                    layoutId="activeBg"
                                    className="absolute inset-0 rounded-md"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30
                                    }}
                                />
                            )}

                            {active && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30
                                    }}
                                />
                            )}

                            <AnimatePresence>
                                {!active && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/30"
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </AnimatePresence>
                        </Link>
                    </motion.div>
                );
            })}
        </nav>
    );
};

export default DesktopNav;
