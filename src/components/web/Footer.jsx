// ...existing code...
"use client";
// components/Footer.tsx
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");

    const navItems = [
        {
            id: "myAccount",
            titleKey: "nav.myAccount.title",
            links: [
                "nav.myAccount.links.signIn",
                "nav.myAccount.links.register",
                "nav.myAccount.links.orderStatus",
            ],
        },
        {
            id: "help",
            titleKey: "nav.help.title",
            links: ["nav.help.links.shipping", "nav.help.links.returns", "nav.help.links.sizing"],
        },
        {
            id: "shop",
            titleKey: "nav.shop.title",
            links: ["nav.shop.links.allProducts", "nav.shop.links.bedroom", "nav.shop.links.diningRoom"],
        },
        {
            id: "legal",
            titleKey: "nav.legal.title",
            links: [
                "nav.legal.links.shippingDelivery",
                "nav.legal.links.terms",
                "nav.legal.links.privacy",
            ],
        },
    ];

    const container = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    const year = new Date().getFullYear();

    return (
        <footer className="bg-background text-foreground border-t border-primary font-serif">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
                >
                    {/* Logo & Address */}
                    <motion.div variants={item} className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
                        <div className="flex items-center space-x-2">
                            <img
                                src="/lumanest-logo-dark.png"
                                alt={t("logoAlt")}
                                className="h-8 w-auto"
                            />
                            <span className="text-2xl font-bold text-gray-900 font-sans dark:text-white">
                                {t("brandName")}
                            </span>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-start gap-2">
                                <FaMapMarkerAlt className="w-4 h-4 mt-0.5 text-primary" />
                                <div>
                                    <p>{t("contact.addressLine1")}</p>
                                    <p>{t("contact.addressLine2")}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhone className="w-4 h-4 text-primary" />
                                <p>{t("contact.phone")}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="w-4 h-4 text-primary" />
                                <p>{t("contact.email")}</p>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex space-x-3 pt-4">
                            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPinterestP].map(
                                (Icon, i) => (
                                    <motion.a
                                        key={i}
                                        href="#"
                                        aria-label={t(`social.${i}`) ?? t("social.link")}
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                )
                            )}
                        </div>
                    </motion.div>

                    {/* Navigation Columns */}
                    {navItems.map((col) => (
                        <motion.div key={col.id} variants={item} className="space-y-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{t(col.titleKey)}</h3>
                            <ul className="space-y-2">
                                {col.links.map((linkKey) => (
                                    <li key={linkKey}>
                                        <a
                                            href="#"
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                        >
                                            {t(linkKey)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                <Separator className="my-8" />

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-sm text-gray-600 dark:text-gray-400"
                >
                    {t("copyright", { year, brand: t("brandName") })}
                </motion.div>
            </div>
        </footer>
    );
}