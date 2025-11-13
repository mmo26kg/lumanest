'use client';
import { FaSearch } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import ToggleTheme from "./ToogleTheme";
import SelectLanguage from "./SelectLanguage";
import ShoppingCartButton from "./Cart";
import Login from "./Login";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "@/provider/AuthProvider";

const HeaderActions = () => {
    const t = useTranslations("Header");
    const { isAuthenticated, loading } = useAuth();

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
            <ShoppingCartButton />

            {/* Login or Profile Menu */}
            {loading ? (
                <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated ? (
                <ProfileMenu />
            ) : (
                <Login />
            )}
        </div>
    );
};

export default HeaderActions;