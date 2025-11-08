// "use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function Hero() {
    return (
        <section
            className=" shadow-sm section-padding-y rounded-b-4xl -mt-20 h-screen "
            aria-labelledby="hero-heading">
            <div
                className="max-w-6xl mt-24 container mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
                {/* Left Column */}
                <div className="flex flex-1 flex-col gap-6 lg:gap-8">
                    {/* Section Title */}
                    <div className="section-title-gap-xl flex flex-col text-primary">
                        {/* Main Heading */}
                        <h1 id="hero-heading" className="heading-xl">
                            Exclusive Deals of Furniture Collection
                        </h1>
                        {/* Description */}
                        <p className="text-muted-foreground font-serif text-base lg:text-lg">
                            Explore different categories. Find the best deals.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row font-serif">
                        <Button size="lg" variant="">Shop now</Button>
                        <Button variant="ghost">
                            Explore
                            <ArrowRight />
                        </Button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full flex-1">
                    <AspectRatio ratio={1 / 1}>
                        <Image
                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1558"
                            alt="Hero section visual"
                            fill
                            priority
                            className="h-full w-full rounded-xl object-cover" />
                    </AspectRatio>
                </div>
            </div>
        </section>
    );
}
