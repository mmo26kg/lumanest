"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section
            className=" shadow-sm section-padding-y rounded-b-4xl -mt-20 h-screen "
            aria-labelledby="hero-heading">
            <div
                className="max-w-6xl mt-24 container mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
                {/* Left Column */}
                <motion.div
                    className="flex flex-1 flex-col gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Section Title */}
                    <motion.div
                        className="section-title-gap-xl flex flex-col text-primary"
                        variants={itemVariants}
                    >
                        {/* Main Heading */}
                        <h1 id="hero-heading" className="text-7xl leading-tight font-bold ">
                            {t("title")}
                        </h1>
                        {/* Description */}
                        <p className="text-muted-foreground font-serif text-base lg:text-lg">
                            {t("description")}
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col gap-3 sm:flex-row font-serif"
                        variants={itemVariants}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg">{t("cta.shop")}</Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="ghost">
                                {t("cta.explore")}
                                <ArrowRight />
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right Column */}
                <motion.div
                    className="w-full flex-1"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AspectRatio ratio={1 / 1}>
                        <Image
                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1558"
                            alt={t("imageAlt")}
                            fill
                            priority
                            className="h-full w-full rounded-xl object-cover" />
                    </AspectRatio>
                </motion.div>
            </div>
        </section>
    );
}