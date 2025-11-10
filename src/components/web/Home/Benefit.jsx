// ...existing code...
"use client";
// Benefit Section
import { Check } from "lucide-react";
import { FastForward, Package, Support } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Benefit() {
    const t = useTranslations("Benefit");

    const data = [
        {
            title: t("items.easy.title"),
            description: t("items.easy.description"),
            icon: <Check size={48} />,
        },
        {
            title: t("items.fast.title"),
            description: t("items.fast.description"),
            icon: <FastForward size={48} />,
        },
        {
            title: t("items.beautiful.title"),
            description: t("items.beautiful.description"),
            icon: <Package size={48} />,
        },
    ];
    return (
        <section className="bg-primary/10 text-foreground section-padding-y">
            <div className="max-w-6xl mx-auto flex gap-4 lg:py-40 flex-col items-start">
                <div className="flex flex-col gap-4 text-center w-full">
                    <h2 className="text-foreground text-2xl md:text-5xl tracking-tighter mx-auto font-medium text-center">
                        {t("title")}
                    </h2>
                </div>
                <div className="flex gap-10 pt-12 flex-col w-full">
                    <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
                        {data.map((item, index) => (
                            <div key={index} className="flex flex-col gap-4 items-center text-center ">
                                <div className="bg-primary/10 text-primary  rounded-full text-4xl  p-4 mt-1">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-2xl font-semibold text-primary">{item.title}</h3>
                                    <p className=" text-lg leading-relaxed font-serif">{item.description}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
}