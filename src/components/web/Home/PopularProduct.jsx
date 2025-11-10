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
} from "@/components/ui/carousel";
import { FaArrowRight } from "react-icons/fa";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

// Animation variants
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

export function ThreeDCard(data) {
    return (
        <CardContainer className="inter-var font-serif">
            <CardBody className="relative group/card w-auto h-auto bg-card/50 rounded-xl px-10 py-10 border-muted">
                <CardItem translateZ="200" className="w-full">
                    <img
                        src={data.image}
                        height="1200"
                        width="1200"
                        className="w-auto h-70 mx-auto rounded-xl"
                    // alt={data.name}
                    />
                </CardItem>

                <CardItem translateZ="50" className="text-2xl font-bold text-secondary mt-8">
                    {data.name}
                </CardItem>

                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-md font-light max-w-sm mt-2 dark:text-neutral-300"
                >
                    {data.description}
                </CardItem>

                <div className="flex justify-between items-center mt-2">
                    <CardItem
                        translateZ={20}
                        as="a"
                        href=""
                        target="__blank"
                        className="py-2 rounded-xl text-lg font-bold text-primary"
                    >
                        {data.price}
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}

function ProductList() {
    const t = useTranslations("PopularProducts.products");

    const data = [
        {
            id: 1,
            nameKey: "armchair.name",
            descriptionKey: "armchair.description",
            image: "/product-image/armchair.png",
            price: "$120",
        },
        {
            id: 2,
            nameKey: "chair.name",
            descriptionKey: "chair.description",
            image: "/product-image/chair.png",
            price: "$100",
        },
        {
            id: 3,
            nameKey: "minisofa.name",
            descriptionKey: "minisofa.description",
            image: "/product-image/minisofa.png",
            price: "$80",
        },
        {
            id: 4,
            nameKey: "sofa.name",
            descriptionKey: "sofa.description",
            image: "/product-image/sofa.png",
            price: "$300",
        },
        {
            id: 5,
            nameKey: "armchair.name",
            descriptionKey: "armchair.description",
            image: "/product-image/armchair.png",
            price: "$120",
        },
        {
            id: 6,
            nameKey: "chair.name",
            descriptionKey: "chair.description",
            image: "/product-image/chair.png",
            price: "$100",
        },
        {
            id: 7,
            nameKey: "minisofa.name",
            descriptionKey: "minisofa.description",
            image: "/product-image/minisofa.png",
            price: "$80",
        },
        {
            id: 8,
            nameKey: "sofa.name",
            descriptionKey: "sofa.description",
            image: "/product-image/sofa.png",
            price: "$300",
        },
    ];

    return (
        <Carousel opts={{ align: "start" }} orientation="horizontal" className="">
            <CarouselContent className="mt-1 max-h-[calc(100vh-120px)] flex gap-6" overflow="visible">
                {data.map((item, index) => (
                    <CarouselItem key={item.id} className="md:basis-1/3 lg:basis-1/3 px-2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <ThreeDCard
                                id={item.id}
                                name={t(item.nameKey)}
                                description={t(item.descriptionKey)}
                                image={item.image}
                                price={item.price}
                            />
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

export default function PopularProducts() {
    const t = useTranslations("PopularProducts");
    const backgroundImageUrl = "/popular-product-bg.png";

    return (
        <section className="section-padding-y overflow-x-hidden">
            <div className="relative max-w-6xl mx-auto">
                <motion.h2
                    className="text-5xl text-foreground text-center mb-12 font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {t("title")}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <Image
                        src={backgroundImageUrl}
                        alt="Popular Products Background"
                        width={700}
                        height={1080}
                        className="absolute -top-20 -left-1/2 transform"
                    />
                </motion.div>

                <ProductList />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button size="huge" className="mx-auto mt-28 flex items-center gap-2">
                        {t("viewAllButton")}
                        <FaArrowRight />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}