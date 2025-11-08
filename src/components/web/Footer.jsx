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

export default function Footer() {
    const navItems = [
        {
            title: "My Account",
            links: ["Sign in", "Register", "Order status"],
        },
        {
            title: "Help",
            links: ["Shipping", "Returns", "Sizing"],
        },
        {
            title: "Shop",
            links: ["All Products", "Bedroom", "Dining Room"],
        },
        {
            title: "Legal Stuff",
            links: ["Shipping & Delivery", "Terms & Conditions", "Privacy & Policy"],
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

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t font-serif">
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
                                alt="Lumanest Logo"
                                className="h-8 w-auto"
                            />
                            <span className="text-2xl font-bold text-gray-900 font-sans dark:text-white">Lumanest</span>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-start gap-2">
                                <FaMapMarkerAlt className="w-4 h-4 mt-0.5 text-primary" />
                                <div>
                                    <p>877 The Bronx, NY</p>
                                    <p>14568, USA</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhone className="w-4 h-4 text-primary" />
                                <p>+123 654 987</p>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex space-x-3 pt-4">
                            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPinterestP].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Navigation Columns */}
                    {navItems.map((col) => (
                        <motion.div key={col.title} variants={item} className="space-y-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{col.title}</h3>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                        >
                                            {link}
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
                    Copyright ©2020 NWOOD. All Rights Reserved
                </motion.div>
            </div>
        </footer>
    );
}