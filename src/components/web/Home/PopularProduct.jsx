"use client";
import React from "react";
import { useTranslations } from "next-intl";
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
import { FaArrowRight } from "react-icons/fa";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function ThreeDCardDemo(data) {
    // const data = {
    //     id: 1,
    //     name: "3D Floating Card",
    //     description: "A card that uses CSS perspective to create a 3D floating effect.",
    //     image: "/product-image/minisofa.png",
    //     price: "$80",
    // }
    return (
        <CardContainer className="inter-var font-serif">
            <CardBody
                className="bg-accent/15 relative group/card w-auto h-auto rounded-xl px-10 py-10  border-muted ">

                <CardItem translateZ="300" className="w-full ">
                    <img
                        src={data.image}
                        height="1200"
                        width="1200"
                        className="w-auto h-70  mx-auto rounded-xl"
                        alt="thumbnail" />
                </CardItem>
                <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-secondary mt-8">
                    {data.name}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-md font-light max-w-sm mt-2 dark:text-neutral-300">
                    {data.description}
                </CardItem>
                <div className="flex justify-between items-center mt-2">
                    <CardItem
                        translateZ={20}
                        as="a"
                        href=""
                        target="__blank"
                        className="py-2 rounded-xl text-lg font-bold text-primary">
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
        <Carousel
            opts={{ align: "start" }}
            orientation="horizontal"
            className=""
        >
            <CarouselContent className="mt-1 max-h-[calc(100vh-120px)] flex gap-6" overflow="visible">
                {data.map((item) => (
                    <CarouselItem key={item.id} className="md:basis-1/3 lg:basis-1/3 px-2">
                        {/* <Card className="rounded-xl px-4 py-12 bg-accent/5 hover:bg-accent/70 backdrop-blur-xs transition-colors duration-300">
                            <Image
                                src={item.image}
                                alt={t(item.nameKey)}
                                width={1200}
                                height={1200}
                                className="w-auto h-64 object-contain rounded-2xl"
                            />
                            <CardHeader className="font-serif select-none">
                                <CardTitle className="text-2xl text-secondary font-bold mt-4 text-ellipsis line-clamp-1">
                                    {t(item.nameKey)}
                                </CardTitle>
                                <CardDescription className="text-base text-foreground/80">
                                    <div className="line-clamp-1 text-secondary font-light">
                                        {t(item.descriptionKey)}
                                    </div>
                                    <div className="mt-2 text-lg font-bold text-primary">
                                        {item.price}
                                    </div>
                                </CardDescription>
                            </CardHeader>
                        </Card> */}
                        <ThreeDCardDemo
                            id={item.id}
                            name={t(item.nameKey)}
                            description={t(item.descriptionKey)}
                            image={item.image}
                            price={item.price}
                        />
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
                <h2 className="text-5xl text-center mb-12 font-bold">{t("title")}</h2>
                <Image
                    src={backgroundImageUrl}
                    alt="Popular Products Background"
                    width={700}
                    height={1080}
                    className="absolute -top-20 -left-1/2 transform"
                >

                </Image>
                <ProductList />
                <div className="">
                    <Button size="huge" className="mx-auto mt-28 flex items-center gap-2">
                        {t("viewAllButton")}
                        <FaArrowRight />
                    </Button>
                </div>
                <ThreeDCardDemo />
            </div>
        </section>
    );
}