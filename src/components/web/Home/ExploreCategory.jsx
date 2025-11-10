"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselScrollBar
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import {
    FaBed,
    FaTable,
    FaBath,
    FaChair,
    FaUtensils,
    FaCouch,
    FaArrowRight,
    FaBaby,
    FaDoorOpen,
    FaTree
} from "react-icons/fa";

// Animation variants with viewport detection
const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function Searchbar() {
    const t = useTranslations("ExploreCategory");

    return (
        <motion.div
            className="grid w-full items-center gap-3 font-serif"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
        >
            <span>
                <Input type="text" id="search" placeholder={t("searchPlaceholder")} />
            </span>
        </motion.div>
    );
}

function CategoryList() {
    const t = useTranslations("ExploreCategory.categories");

    const data = [
        { id: 1, nameKey: "bedroom", icon: FaBed },
        { id: 2, nameKey: "kitchen", icon: FaUtensils },
        { id: 3, nameKey: "meetingRoom", icon: FaChair },
        { id: 4, nameKey: "livingRoom", icon: FaCouch },
        { id: 5, nameKey: "office", icon: FaTable },
        { id: 6, nameKey: "outdoor", icon: FaTree },
        { id: 7, nameKey: "bathroom", icon: FaBath },
        { id: 8, nameKey: "toilet", icon: FaDoorOpen },
        { id: 9, nameKey: "kidsRoom", icon: FaBaby },
        { id: 10, nameKey: "diningRoom", icon: FaUtensils },
        { id: 11, nameKey: "bedroom", icon: FaBed },
        { id: 12, nameKey: "kitchen", icon: FaUtensils },
        { id: 13, nameKey: "meetingRoom", icon: FaChair },
        { id: 14, nameKey: "livingRoom", icon: FaCouch },
        { id: 15, nameKey: "office", icon: FaTable },
        { id: 16, nameKey: "outdoor", icon: FaTree },
        { id: 17, nameKey: "bathroom", icon: FaBath },
        { id: 18, nameKey: "toilet", icon: FaDoorOpen },
        { id: 19, nameKey: "kidsRoom", icon: FaBaby },
        { id: 20, nameKey: "diningRoom", icon: FaUtensils },
    ];

    return (
        <Carousel
            opts={{ align: "start" }}
            orientation="vertical"
            className="w-full mt-4"
        >
            <CarouselContent className="mt-1 max-h-[calc(100vh-120px)] flex flex-col gap-2">
                {data.map((item, index) => (
                    <CarouselItem key={item.id} className="md:basis-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.03,
                                ease: "easeOut",
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button variant="ghost" className="w-full justify-start gap-2 p-4">
                                <item.icon className="mr-2 text-foreground text-3xl" />
                                <span className="text-lg text-foreground font-light">{t(item.nameKey)}</span>
                            </Button>
                        </motion.div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselScrollBar />
        </Carousel>
    );
}

function GridItem() {
    const t = useTranslations("ExploreCategory.products");

    const products = [
        {
            titleKey: "bed.title",
            descriptionKey: "bed.description",
            imageUrl: "https://plus.unsplash.com/premium_photo-1676968002767-1f6a09891350?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
        },
        {
            titleKey: "wardrobe.title",
            descriptionKey: "wardrobe.description",
            imageUrl: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1480",
        },
        {
            titleKey: "nightstand.title",
            descriptionKey: "nightstand.description",
            imageUrl: "https://images.unsplash.com/photo-1606744824163-985d376605aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1932",
        },
        {
            titleKey: "rug.title",
            descriptionKey: "rug.description",
            imageUrl: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
        },
    ];

    return (
        <motion.div
            className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariants}
        >
            {/* Tall Feature Card - Left */}
            <Card className="rounded-xl lg:col-span-2 lg:row-start-1">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.5 }}
                    variants={cardVariants}
                    className="flex flex-col gap-4 h-full"
                >
                    <CardHeader>
                        <CardTitle className="text-3xl font-semibold">
                            {t(products[0].titleKey)}
                        </CardTitle>
                        <CardDescription>
                            {t(products[0].descriptionKey)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col">
                        <Image
                            src={products[0].imageUrl}
                            alt={t(products[0].titleKey)}
                            width={1000}
                            height={1000}
                            className="w-full h-80 object-cover rounded-2xl"
                        />
                    </CardContent>
                </motion.div>
            </Card>

            {/* Regular Feature Card - Top Right */}
            <Card className="rounded-xl lg:row-start-2">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.5 }}
                    variants={cardVariants}
                    className="flex flex-col gap-4 h-full"
                >
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            {t(products[1].titleKey)}
                        </CardTitle>
                        <CardDescription>
                            {t(products[1].descriptionKey)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-full flex-col">
                        <Image
                            src={products[1].imageUrl}
                            alt={t(products[1].titleKey)}
                            width={1000}
                            height={1000}
                            className="h-full w-full object-cover h-80 rounded-2xl"
                        />
                    </CardContent>
                </motion.div>
            </Card>

            {/* Regular Feature Card - Bottom Right */}
            <Card className="rounded-xl lg:row-start-2 lg:col-start-2">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.5 }}
                    variants={cardVariants}
                    className="flex flex-col gap-4 h-full"
                >
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            {t(products[2].titleKey)}
                        </CardTitle>
                        <CardDescription>
                            {t(products[2].descriptionKey)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-full flex-col">
                        <Image
                            src={products[2].imageUrl}
                            alt={t(products[2].titleKey)}
                            width={1000}
                            height={1000}
                            className="h-full w-full object-cover h-80 rounded-2xl"
                        />
                    </CardContent>
                </motion.div>
            </Card>

            {/* Tall Feature Card - Right */}
            <Card className="rounded-xl lg:col-start-3 lg:row-span-2 lg:row-start-1">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.5 }}
                    variants={cardVariants}
                    className="flex flex-col gap-4 h-full"
                >
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            {t(products[3].titleKey)}
                        </CardTitle>
                        <CardDescription>
                            {t(products[3].descriptionKey)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-full flex-col">
                        <Image
                            src={products[3].imageUrl}
                            alt={t(products[3].titleKey)}
                            width={1000}
                            height={1000}
                            className="h-full w-full object-cover rounded-2xl"
                        />
                    </CardContent>
                </motion.div>
            </Card>
        </motion.div>
    );
}

export default function ExploreCategory() {
    const t = useTranslations("ExploreCategory");

    return (
        <section className="section-padding-y h-auto">
            <motion.h2
                className="text-5xl text-foreground text-center mb-12 font-bold"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {t("title")}
            </motion.h2>
            <div className="max-w-6xl mx-auto flex lg:flex-row md:flex-col flex-col gap-10 md:gap-10 h-full">
                <motion.div
                    className="lg:flex-1 h-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainerVariants}
                >
                    <Searchbar />
                    <CategoryList />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button size="huge" className="w-full mt-6 justify-between">
                            {t("allCategoriesButton")}
                            <FaArrowRight />
                        </Button>
                    </motion.div>
                </motion.div>
                <div className="lg:flex-4 h-full">
                    <GridItem />
                </div>
            </div>
        </section>
    );
}