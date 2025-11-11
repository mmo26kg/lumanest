"use client";
// components/Newsletter.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Newsletter() {
    const t = useTranslations("Newsletter");

    return (
        <section className="relative w-full overflow-hidden bg-primary/5 ">
            {/* Background Image - Left Side */}
            <div className="absolute inset-0 md:w-1/2">
                <Image
                    src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1480"
                    alt={t("imageAlt")}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Optional: Dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-background/20" />
            </div>

            <div className="relative container mx-auto px-4 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left: Image (hidden on mobile, shown on md+) */}
                    <div className="hidden md:block" />

                    {/* Right: Newsletter Form */}
                    <Card className="p-8 md:p-12 bg-background/80 backdrop-blur-md border-0 shadow-xl md:ml-8 lg:ml-16
                          supports-backdrop-blur:bg-white/60
                          fade-blur-gradient">
                        <div className="max-w-md mx-auto text-center space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                                    {t("titleLine1")}
                                    <span className="block text-primary">{t("titleAccent")}</span>
                                </h2>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                {t("description")}
                            </p>

                            <form className="space-y-4">
                                <Input
                                    type="email"
                                    placeholder={t("placeholder")}
                                    className="h-12 text-lg placeholder:text-gray-400 border-gray-300 focus:border-primary focus:ring-0"
                                    required
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-12 text-lg font-medium bg-secondary hover:bg-secondary/80 text-white"
                                >
                                    {t("cta.subscribe")}
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}