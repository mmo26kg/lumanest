"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
    FaStar,
    FaChevronDown,
    FaMinus,
    FaPlus,
    FaRegHeart,
} from "react-icons/fa"

import { cn } from "@/lib/utils" // Import tiện ích 'cn' từ shadcn
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent } from "@/components/ui/card"

// Tiện ích để bọc các section với animation
const AnimatedSection = ({
    children,
    className,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={className}
    >
        {children}
    </motion.div>
)

// --- Components Con ---

const HeroSection = () => (
    <div
        className="w-full bg-center bg-no-repeat bg-cover min-h-[60vh] md:min-h-[90vh] flex flex-col justify-end"
        style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDbOe5oy1Q85H_vFazEiLI21t63lWgY66oIjb-i8l_RO5AKPfrw59oEU1WeKVkqjDGuhhf_jlQFQVKX6giH9eeawjR9hx9PCfSDHveMAoY6h_5LNQcU5nA8fqqVgX7QauiDgmw1ipEcBdBy0GxDXC1ZiMGBwNiouxaXCIu2RlNfpeCBd38F4CiYNpBATCo_NhJPu4ke-zGPOoIQ5qzoVRRE1nS54lQ7_CgAGMRVVyBBtcItNu4GQf-QcgvxaUAzeg5b_FondkZAvepq")`,
        }}
    >
        {/* Lớp phủ gradient để làm mờ ảnh */}
        <div className="w-full pt-24 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
    </div>
)

const ProductIntro = () => (
    <AnimatedSection className="flex flex-col items-center text-center -mt-24">
        <h1 className="text-foreground tracking-tight text-4xl md:text-5xl font-sans font-medium leading-tight pb-4 pt-6">
            The Sienna Sideboard
        </h1>
        <p className="text-foreground/90 text-base font-normal font-serif leading-relaxed pb-8 pt-1 px-4 max-w-2xl mx-auto">
            Discover the story behind the Sienna Sideboard, a piece designed not just
            to furnish a room, but to define it. Inspired by minimalist aesthetics and
            a commitment to sustainable craftsmanship, it's more than furniture—it's a
            philosophy of intentional living.
        </p>
    </AnimatedSection>
)

const ImageGrid = () => (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 md:gap-6 p-4">
        <AnimatedSection>
            <AspectRatio ratio={4 / 5}>
                <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg"
                    style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAenniqyUhFoaMiADJFaM_a73DPVw5cHVlJ-o8ARnc5AaCUxrE3Ewua5TTBlKN98WHMyQM35IT06pRoguLfgG5Ze5wB0nbXLXDhRiJb1gBUHqDvxOZoOENjmZ4gcm2Bd4_u08xdyc_cT6FaafBJENme9GTWc4Z-1BAHxmRuJVabxat6SeDZxnUnd-PQLo3SPkARotch1V58xNBrTQMawQqWp8IbniOWd7zb4Q_FWTe-ujqD5ym4dFpV-LlUKwHkScElNPXBdbE-OPMZ")`,
                    }}
                ></div>
            </AspectRatio>
        </AnimatedSection>
        <AnimatedSection>
            <AspectRatio ratio={4 / 5}>
                <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg"
                    style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCw-nQaIg2QSnLK2E9vgXiAZPc5_NPIeHEKimjQs5lUYUNCqqbhPjlx-JPkGqI-DWUNdfWS0Vb8NfoJ3mJ41CSxCayXB-kiHvspK9-rReFwVpr_kGuG8YafVAqrqTglmxqQOYx9r1qgmhAJhdWFaFX4ee1h_DAUATdZfCWHf2gEfdD80wWMIbSZR28hZcyTk7sQfT35Xk1dWFyiJ6Bz0YWKMNldqbrTsC-9oFvqnqf0CqH8iqxr_9aXnJUSYP346x6WjF-2NnUVgpY-")`,
                    }}
                ></div>
            </AspectRatio>
        </AnimatedSection>
    </div>
)

const FeatureCallout = () => (
    <AnimatedSection className="py-16 md:py-24 text-center">
        <h2 className="text-foreground text-3xl md:text-4xl font-sans font-medium leading-tight tracking-tight px-4 pb-4">
            Crafted for a Lifetime
        </h2>
        <p className="text-foreground/90 text-base font-serif leading-relaxed max-w-xl mx-auto">
            Each Sienna Sideboard is meticulously handcrafted from solid, sustainably
            sourced oak. The timeless design features clean lines, soft-close
            hardware, and a durable, hand-applied finish that enhances the natural
            beauty of the wood.
        </p>
    </AnimatedSection>
)

// Component cho 1 mục trong Accordion (dùng Collapsible của shadcn)
const SpecItem = ({
    title,
    children,
    defaultOpen = false,
}) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="group p-4 border-b border-border last:border-b-0 font-serif"
        >
            <CollapsibleTrigger asChild>
                <button className="flex items-center justify-between cursor-pointer list-none w-full">
                    <span className="text-lg font-medium text-foreground">{title}</span>
                    <FaChevronDown className="text-foreground/80 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 text-foreground/80 space-y-2 text-sm leading-relaxed">
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}

const Specifications = () => (
    <AnimatedSection className="border-t border-border divide-y divide-border max-w-2xl mx-auto w-full">
        <SpecItem title="Dimensions & Materials" defaultOpen>
            <p>
                <strong>Overall:</strong> 72"W x 18"D x 30"H
            </p>
            <p>
                <strong>Material:</strong> Solid White Oak
            </p>
            <p>
                <strong>Finish:</strong> Natural Matte Oil
            </p>
            <p>
                <strong>Origin:</strong> Handcrafted in Portugal
            </p>
        </SpecItem>
        <SpecItem title="Care & Shipping">
            <p>
                Wipe clean with a soft, dry cloth. Avoid the use of harsh chemicals and
                household cleaners. Ships via white glove delivery within 4-6 weeks.
            </p>
        </SpecItem>
    </AnimatedSection>
)

const StarRating = ({ rating = 5 }) => (
    <div className="flex items-center gap-1 text-primary mb-2">
        {Array.from({ length: rating }).map((_, idx) => (
            <FaStar key={idx} className="text-base" />
        ))}
    </div>
)

const ReviewCard = ({
    quote,
    author,
}) => (
    <Card className="bg-card p-6 flex flex-col">
        <CardContent className="p-0 flex flex-col flex-grow">
            <StarRating />
            <p className="text-foreground/90 text-base italic mb-4 flex-grow">
                "{quote}"
            </p>
            <p className="font-semibold text-sm">- {author}</p>
        </CardContent>
    </Card>
)

const CustomerReviews = () => (
    <AnimatedSection className="py-16 md:py-24">
        <h2 className="text-foreground text-3xl md:text-4xl font-medium font-sans leading-tight tracking-tight px-4 pb-8 text-center">
            Loved by Design Enthusiasts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-serif">
            <ReviewCard
                quote="The quality is exceptional. It's the perfect centerpiece for our dining room."
                author="Sarah L."
            />
            <ReviewCard
                quote="Absolutely stunning piece of furniture. It arrived perfectly and was even more beautiful in person."
                author="Mark C."
            />
            <ReviewCard
                quote="A timeless design that elevates our entire space. Worth every penny."
                author="Emily R."
            />
        </div>
    </AnimatedSection>
)

const RelatedProductCard = ({
    imgUrl,
    title,
    price,
}) => (
    <div className="flex flex-col gap-4">
        <AspectRatio ratio={1 / 1}>
            <div
                className="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg"
                style={{ backgroundImage: `url(${imgUrl})` }}
            ></div>
        </AspectRatio>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-foreground/80">{price}</p>
    </div>
)

const CompleteTheLook = () => (
    <AnimatedSection className="text-center">
        <h2 className="text-foreground text-3xl font-sans md:text-4xlfont-medium leading-tight tracking-tight px-4 pb-8">
            Complete the Look
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RelatedProductCard
                imgUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDkp4_IsAkLPlQQ1Eh-hBKquJedLRzKu1T1weWJPJKsgCQ-oL4pBtWvgphcY1iEn0NA7erVK25l2jagq7l_OpYsmlTQj5HriCWwxvqaRToq8eqRsznHpwhRDoKxV40YmzrevxCLGQvg6L90R3KCPm9_TfT15Mo1mKAvDRxIbdtiVAOiIhDx3Mi0Je-Bn5S49pguBFUjccnm96WQxNnxkvP7vR29jkEdX1JCHx1m9-xk6CtjeQ4XEYjgalyS6Ayn0x-VjRKW92k9_FO0"
                title="Oslo Lounge Chair"
                price="$899"
            />
            <RelatedProductCard
                imgUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAl_WHHkeG1_yxMGRhmU_VTu7JKDOFusER2Dv__3yjyLvZRjc8WqYCK7v_uaHn_fy5PgYHnZw9HlnnwHZRiyGhH_DOpISOFDZzwbnz6-2VdmWJOoCIHRSG2d1Y7UgLYmNct022_Z6xrLCS07rsy1hPh63poJWJMF_wMII_6u3_GiX_Z_ikEsXtJKhOSylt8HkY66aWfYXgkYamWwU2ka3VvNFvqbK2ui7cXYptWt_i_t282N39feDBGp7sB4MyXCju5hO1exvU70OGY"
                title="Kyoto Coffee Table"
                price="$649"
            />
        </div>
    </AnimatedSection>
)

const StickyPurchaseBar = () => (
    <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 w-full z-10 p-2 md:p-4 bg-background/80 backdrop-blur-sm border-t border-border"
    >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            {/* Product Info */}
            <div className="flex items-center gap-3 md:gap-4 flex-1">
                <img
                    alt="Sienna Sideboard Thumbnail"
                    className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_joR60CvsCYc70TXkH3ffVHHW1yope0fKfXpPQJ0sIWxTuqVOBJzfvI4fkP0PIpmDPwByrdyHt4wYL6yL-J3SmoO4ov_8Nba99_RAiBeu20psmlxDNbdpROucSOZXqLIwetBK9lEXcWBsD1LBv5OuGSZHcVRBRmjs3FeTi1pld0fR5bzweKR77vKlSWSylLdfYLjqI3WhUMQ8_Im-8EBs_FosK_zfz_f6ae5yhN-PcSyWYEWCEeg0-kfd5zPgQZAtJckGaYFUumwh"
                />
                <div className="hidden md:block">
                    <h3 className="font-bold text-foreground text-base">
                        Sienna Sideboard
                    </h3>
                    <p className="text-sm text-foreground/80">$1,899</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4 justify-end">
                {/* Colors */}
                <div className="flex items-center gap-1 md:gap-2">
                    <button
                        aria-label="Select Natural Oak color"
                        className="w-6 h-6 rounded-full border-2 border-white ring-2 ring-primary"
                        style={{ backgroundColor: "#d3c5b5" }}
                    ></button>
                    <button
                        aria-label="Select Walnut color"
                        className="w-6 h-6 rounded-full border-2 border-white/50"
                        style={{ backgroundColor: "#5a4e46" }}
                    ></button>
                </div>

                {/* Quantity */}
                <div className="flex items-center border border-border rounded-full">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Decrease quantity"
                        className="w-8 h-8 rounded-full"
                    >
                        <FaMinus className="text-foreground/50 text-xs" />
                    </Button>
                    <span className="px-2 text-foreground text-sm">1</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Increase quantity"
                        className="w-8 h-8 rounded-full"
                    >
                        <FaPlus className="text-foreground/50 text-xs" />
                    </Button>
                </div>

                {/* Wishlist */}
                <Button
                    variant="outline"
                    size="icon"
                    className="hidden md:inline-flex rounded-full"
                    aria-label="Add to wishlist"
                >
                    <FaRegHeart className="text-xl" />
                </Button>

                {/* Add to Cart */}
                <Button className="rounded-full font-serif bg-secondary py-2 md:py-3 px-4 md:px-6 whitespace-nowrap">
                    Add to Cart
                </Button>
            </div>
        </div>
    </motion.div>
)

// --- Component Chính ---

export default function ProductPage() {
    return (
        <div className="-mt-14 relative flex h-auto min-h-screen w-full flex-col bg-background text-foreground font-display overflow-x-hidden">
            <main className="flex-1 pb-40">
                <HeroSection />

                <div className="px-4 md:px-10 lg:px-20">
                    <div className="flex flex-col max-w-4xl mx-auto">
                        <ProductIntro />
                        <ImageGrid />
                        <FeatureCallout />
                        <Specifications />
                        <CustomerReviews />
                        <CompleteTheLook />
                    </div>
                </div>
            </main>
            <StickyPurchaseBar />
        </div>
    )
}