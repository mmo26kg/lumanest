'use client';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import ToggleTheme from "./ToogleTheme";
import SelectLanguage from "./SelectLanguage";

const HeaderActions = () => {
    const t = useTranslations("Header");
    const [cartCount] = useState(0); // TODO: Connect to cart state

    const iconVariants = {
        hover: { scale: 1.1 },
        tap: { scale: 0.95 }
    };

    return (
        <div className="flex items-center gap-2">
            {/* Language Selector */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="hidden md:block"
            >
                <SelectLanguage />
            </motion.div>

            {/* Theme Toggle */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden md:block"

            >
                <ToggleTheme />
            </motion.div>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-border mx-1" />

            {/* Search Button */}
            <motion.button
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="p-2 text-foreground hover:bg-primary/10 rounded-full transition-colors"
                aria-label={t("search")}
            >
                <FaSearch className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>

            {/* Cart Button */}
            <motion.button
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative p-2 text-foreground hover:bg-primary/10 rounded-full transition-colors"
                aria-label={t("cart")}
            >
                <FaShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                {cartCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-primary text-foreground-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                        {cartCount}
                    </motion.span>
                )}
            </motion.button>

            {/* User Button */}
            <motion.button
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="p-2 text-foreground hover:bg-primary/10 rounded-full transition-colors"
            >
                <FaUser className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>


        </div>
    );
};

export default HeaderActions;