"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    FaSearch,
    FaUser,
    FaShoppingCart,
    FaStarOfLife, // Thay thế cho logo
    FaShieldAlt, // Thay thế cho 'verified'
    FaTree, // Thay thế cho 'forest'
    FaLightbulb, // Thay thế cho 'emoji_objects'
} from "react-icons/fa"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

// --- Tách biệt Data ---

/** @type {{ href: string, text: string, active?: boolean }[]} */
const navLinksData = [
    { href: "#", text: "Home" },
    { href: "#", text: "Shop" },
    { href: "#", text: "About Us", active: true },
    { href: "#", text: "Contact" },
]

/** @type {{ icon: import('react-icons').IconType, title: string, description: string }[]} */
const coreValuesData = [
    {
        icon: FaShieldAlt,
        title: "Uncompromising Quality",
        description:
            "We use only the finest materials and time-honored techniques to ensure every piece is a masterpiece of durability and design.",
    },
    {
        icon: FaTree,
        title: "Sustainable by Design",
        description:
            "Our commitment to the planet is reflected in our responsibly sourced materials and eco-friendly production processes.",
    },
    {
        icon: FaLightbulb,
        title: "Timeless Innovation",
        description:
            "We blend classic aesthetics with modern functionality, creating furniture that is both beautiful and perfectly suited for contemporary life.",
    },
]

/** @type {{ image: string, alt: string, title: string, description: string, order: 1 | 2 }[]} */
const craftsmanshipData = [
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn3tz7nUc2npV7h5MotIfVVl6GULOoS4kMN7P0HFzAU9c4rpsHYsGnKcmYUbRQnMxCRJbibcwTN8HCXFpiXFIS3VNujWIEreWqYg_tg6JVsgYcYpds5WhK4l9zRr-Q8fMOaQyh_tuFEVBWTHdmM1NY5nO485qJWUYlrTOQkE2aXsijTvBNbde4hucADbhp1-B4CnvEDg0LctnDcB5SIsM1SKIIzi0PrQU9zhGo_BnXezZUzVelHDE6wlna6mcd6d3XXBL0jWWL-tX_",
        alt: "Close-up of solid oak wood planks",
        title: "Sourcing the Finest Materials",
        description:
            "Our journey begins with responsibly harvested solid wood. We hand-select each plank for its unique grain, character, and structural integrity, ensuring a foundation of unparalleled quality.",
        order: 1,
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAVPF0u7KX1qGq5Yy3MR8BoSxu9Hljyaf_iE5I6BMrsRDbJPENx43koFRLF78wciw6FqYf4ov8EfdLXh71iPwhpHzbmchJwVVYgNLgBHQ0JmU9u7so0LEwJvpdsg1vUUyaMUqyXt_frMYnzSzO06WHE1QtMRoWvLolTTwaG0zjCKfPE9tIKmoNkoBeIotXtrXfj2nXxpks7fY4OkfN2tBLJvhHQFYU7tDA77erDYq5b-BTjrDhaXD9OGfYxOHbED0ZkejKR60TCbBs",
        alt: "Artisan sanding a wooden chair",
        title: "Meticulous Hand-Finishing",
        description:
            "Skilled artisans bring the design to life. Each joint is perfected, each surface is sanded to a flawless finish, and every detail is scrutinized to meet our exacting standards of excellence.",
        order: 2,
    },
]

/** @type {{ image: string, alt: string, name: string, role: string }[]} */
const teamData = [
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxxtSVYDodAijV8-8kIjBw63HefcOp4x0Yk9vm3VxJjQtNV4jh5LCqiPmypki2664pFgOYDIB5vE5awtYJzJOuMJV-XU6kYqN_BuZB_0LlROMziTOMEJRE7_-tY55vpTrbgmQb6YkGvJNAZ6dK5bXG5bj6O1LXv_Gz18gKfOQf9iw89W-TIZIuGudlma1eFO9aNw58RZSda5u-9qLIV3DlgkK2rVizjeQ3v376fjG32i_8EjPk7drDjcNAMx_JQJk_ydnyfBF0cYZz",
        alt: "Headshot of James Alistair",
        name: "James Alistair",
        role: "Founder & CEO",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP5-UyLftUDWHlXzpbLsOd1K49t4RSlzv5wMrtMNeufb615ltOyR4JM_zdIuNxuZ1yMjVdM_SNZ3bS8FFAmRP6uxISXpFSJiMKUUzgT5HAZ1RakeKuwg2-gQk3jQwB6XTG3cqi6757crqarZSgN09uHtqIRRvNYJrvpvcHZUp7u181MtJmRS_x_Gufnui-gSz8HffoalNf7SlRutvVq5Wo2Mk-0WiYXjjWQOUCLWU4I3o1SKtjVM1_2Yjax843fZtcrgdWgSmj3ksz",
        alt: "Headshot of Eleanor Vance",
        name: "Eleanor Vance",
        role: "Lead Designer",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfevki0uFmH4_V-rJ85mBumcUaYG7CDtUnfU6qwAtTeZNEhF1qyyDgtX4QDzdLo07lQMCAY6tTK63jql5TDnfCDGJPoaGCwT5kqDbGhzAu6rsuos6EUs2k--AFdSvCkjlF70nV0mDu3Lvuq_X42J3ahOY9joB0XXsrMj9GMq65Tg0hb2SmK5SfGoZI4MC0K9-PSUtj-YvDYv9y9d3oZP19AW-vQ9OsAsOXE3DoKUb6i3IE9oGnPfrTxBy4nWP7YP22VbMk8ZuOgSsH",
        alt: "Headshot of Marcus Cole",
        name: "Marcus Cole",
        role: "Head of Craftsmanship",
    },
]

/** @type {{ image: string, alt: string, className: string }[]} */
const pressData = [
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsFhOrsL4oFBZoFuhguB_5sZ8hFgHCg3x0HkjHtaUkzI0N231gLuVA0YYVTXkUBKJgTtqizszxyuv_GJA_eL5yR9ABB-A3kRNzZiferUp_cEVBHTVijTG-kvbDOkpZbM_2zjkPMJxpy58rm_L3jpwQrhsb1If6MEjIgmyb3hynkrrVGOu4uGqO4VqUzjOKWXJQIbjkpqxl3Q-ZmIzDvQmVkOJgfy4CkflcS5RjrBFKXFsHwNTtS1uQwojqEhYiQTMYwQYL7MeLze4-",
        alt: "Architectural Digest logo",
        className: "h-48",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB10BRvJ9qY69gfpOw21WfXiUnLcTPErYsMFPWSTYuATRertk8hQsVG1_-bKb9jxFJ3JJN5JuTetpujwbYmhCiPHPL0GV4SLHV7KtHqoLuLTKSnTqJUzUQPLncIAaxUgwTHtRAzXtel_xCiFpQM33dd1LjFHQqL0o-kvbTt7Kr5rfUhZd-AYvL5bNM809HekQdq7eBKCaxhdG06g7Z6y6LeBLVXWKK_HGM3bWCS0V-zn5TZt_ewP4n2ChL1a10WzIyRvjjLCzYkzrYj",
        alt: "Elle Decor logo",
        className: "h-48",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOSy2ALDGcsyW2PHbidNsAh8IqQTEX5id4NQGKylnhTwGo8BdFO6_yMCSypwflRNh3sLk91UyUCIipWgsiTqy8r8ESzsWZ5UAAmb0C4BXYxAbNN6Js36BPKp9tgNcK1nJaH7FsJdOrMDE1WaEU0o5o5ebbcyN7hFpVqZr-baotOzUT42HBrE3sozEMIBJJjStiRUgS_GvkKOXHUOh5z5XcklOmacU0IfCx0J9PL4J2o6F3nmKNQbWSTfOsMFSFjjgiCVJ6o65TDmFk",
        alt: "The New York Times logo",
        className: "h-48",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8hFohUe92nXSAiAAP8uKSc3wuv9_s23OWXTI4aJ2Zjvw9r3_ssViIG7y5bsijgUhktqawvTMDcscnamWz66XcbC9v3Uh7FFQFtouluhiEDeR_xLsxctqZ2eNpgbprfgwlSAeFFRqJDCs_SqFD8q06-Ai4zx8ShvMlU8H7oRDUty0zG7XB1Ua5JjpfjrxOK3EgPqMCTtCx6tVLI2G8S1Im1LIQaoyZYDfnCVQKZVsFAbdro-O_9tRkDlhk1BIK6qM3ubh09bvJIVNo",
        alt: "Vogue logo",
        className: "h-48",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwDYt5BTQkTZF9MjvXSNLs0gHjcpMgLmUlrfkNPUDpPTPjjIuT8c_gxzIzoxXZU8rqCtO44Q-7XJY00peATHHHZ7ySnlmLhlwoFT47gJpILdsWyRt-bFrvK9RI93wF1azOxOqPmxFtPvCF8HUo9aSpBa2VqyEaHMqRLT7dQpmTTHu0QNOfsNf_A6bdphR_iRnZZiE3h7BiUmPcef4mo2BuKLrL3DzgaxUY75nsVkYp70S6IDpF1KwyaQ53TcUlUhSkmVhYOtNQUqJN",
        alt: "Wallpaper Magazine logo",
        className: "h-48",
    },
]

/** @type {{ image: string, alt: string, location: string, address: string, hours: string }[]} */
const locationsData = [
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoARohXPijWDInMlROYa-0dYeZN7G739sxHpODkZqKNTTioENxLOAPaV3hcu2k8EnRgyIoH-CeouGMpe6OTTFP2v-bkcEVfAkraC-eVylL6QMxTX_aNXtS9jjOeU9AfQMfM2BpHHPY_wlAr7FuzsAUQBeDoYRMWmOn6kBmdc6_aq9bqUpU8IbKD9XUnkOZZ8ibyE771pqsDDklsEWi2MqOw4riNoZP-AAaunMLvxuMIM5madamKDiSvU9i9fv_-jLPY_J5un07jUkS",
        alt: "Map of New York store",
        location: "New York",
        address: "123 Design Avenue, SoHo",
        hours: "Mon - Sat: 10am - 7pm",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFge8I1FxMr6DzMXWwASgGMfLtA7hO5bUdwraJrMH6g1giOHjMQLZg9FRv1m_-1UgamF7iANyraWFUmk7Tc7VOhbCiC95iQjO5FaIwCdVReB5zOLJ7KbltpYYh0Pfg1JiRWQobFjebh3GnyPYCPNSaxgjTIH-oThqDUREanBcJEXB2P4Jf83wQ4kjsdPTSyYuyUwhRcTtkUv7e6EiX3aHFAuvJicrW7twM-EipXF9Pzi25frlnRWARKfHmb-wJYp46xywzX2tdYeYF",
        alt: "Map of London store",
        location: "London",
        address: "456 Craftsmanship Rd, Shoreditch",
        hours: "Mon - Sat: 10am - 7pm",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdK0ashzTe7lsR2NEjcXw_Saz84MKE0WI0XMpC07OnMmnBodhr3YOAmboXuse7ZQVxjQPc1Y-zow99UW6CBXmHE4uWcvsBKvbAk4SPpV8KTgfOlrOhop1zxTTUFW4_ncQ59wlhkorDznitaeCaoqFb1CKpDeqJxDBLzFfX6Opw1jsc3HkwvQ6aVFpxmWea4Q2KdcGu8QNmlFHBfbVD_40M5YLIzentc3JEniArnX83Zoa6UWkiK2tCQI-NrW_PbhxxCfXd9h8fSMfB",
        alt: "Map of Paris store",
        location: "Paris",
        address: "789 Élégance St, Le Marais",
        hours: "Mon - Sat: 10am - 7pm",
    },
]

// --- Tiện ích Animation ---

/**
 * Component bọc các section để tạo hiệu ứng fade-in-up khi cuộn tới
 * @param {{ children: React.ReactNode, className?: string }} props
 */
const AnimatedSection = ({ children, className }) => (
    <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.section>
)

// Variants cho animation của grid
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, ease: "easeOut" },
    },
}

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

// --- Components Con ---

const Logo = () => (
    <div className="flex items-center gap-4 text-foreground">
        <FaStarOfLife className="size-5 text-primary" />
        <h2 className="text-lg font-bold tracking-tight">Lumanest Furniture</h2>
    </div>
)



const HeroSection = () => (
    <section
        className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center"
        style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
        }}
    >
        {/* Lớp phủ thay thế cho gradient */}
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 text-center text-white"
        >
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Lumanest Furniture
            </h1>
            <p className="mt-2 text-lg md:text-xl">Crafting Homes, Building Futures.</p>
        </motion.div>
    </section>
)

const BrandStory = () => (
    <AnimatedSection className="text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Story</h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Founded on the principles of timeless design and impeccable craftsmanship,
            Lumanest Furniture began with a simple idea: to create beautiful, lasting
            pieces that turn a house into a home. Our journey started in a small
            workshop, driven by a passion for woodworking and a commitment to
            sustainable practices. Today, we continue to honor that legacy, blending
            traditional techniques with modern aesthetics to bring you furniture that
            is not only stylish but also built to be part of your family's story for
            generations.
        </p>
    </AnimatedSection>
)

const MissionVision = () => (
    <AnimatedSection>
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
        >
            <motion.div
                variants={staggerItem}
                className="flex flex-col gap-2 border-t-2 border-primary pt-4"
            >
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                    To design and craft high-quality, sustainable furniture that enhances
                    the beauty and comfort of everyday living.
                </p>
            </motion.div>
            <motion.div
                variants={staggerItem}
                className="flex flex-col gap-2 border-t-2 border-primary pt-4"
            >
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                    To be a global leader in innovative and eco-conscious home
                    furnishings, inspiring a more thoughtful way of life.
                </p>
            </motion.div>
        </motion.div>
    </AnimatedSection>
)

/**
 * @param {{ icon: import('react-icons').IconType, title: string, description: string }} props
 */
const CoreValueCard = ({ icon: Icon, title, description }) => (
    <motion.div variants={staggerItem} className="h-full">
        <Card className=" text-center h-full">
            <CardContent className="flex flex-col items-center gap-4 p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Icon className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    </motion.div>
)

/**
 * @param {{ values: { icon: import('react-icons').IconType, title: string, description: string }[] }} props
 */
const CoreValues = ({ values }) => (
    <AnimatedSection>
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                The principles that guide every cut, stitch, and decision we make.
            </p>
        </div>
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
            {values.map((value) => (
                <CoreValueCard key={value.title} {...value} />
            ))}
        </motion.div>
    </AnimatedSection>
)

/**
 * @param {{ image: string, alt: string, title: string, description: string, order: 1 | 2 }} props
 */
const CraftsmanshipStep = ({ image, alt, title, description, order }) => (
    <AnimatedSection>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className={cn(order === 2 && "md:order-2")}>
                <AspectRatio ratio={1 / 1}>
                    <img
                        className="w-full h-full rounded-xl object-cover"
                        src={image}
                        alt={alt}
                    />
                </AspectRatio>
            </div>
            <div className={cn(order === 2 && "md:order-1")}>
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    </AnimatedSection>
)

/**
 * @param {{ steps: { image: string, alt: string, title: string, description: string, order: 1 | 2 }[] }} props
 */
const Craftsmanship = ({ steps }) => (
    <section>
        <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Our Craftsmanship
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                From raw material to the heart of your home, every piece tells a story of
                dedication.
            </p>
        </AnimatedSection>
        <div className="mt-12 space-y-16">
            {steps.map((step) => (
                <CraftsmanshipStep key={step.title} {...step} />
            ))}
        </div>
    </section>
)

/**
 * @param {{ image: string, alt: string, name: string, role: string }} props
 */
const TeamMember = ({ image, alt, name, role }) => (
    <motion.div variants={staggerItem} className="text-center">
        <img
            className="mx-auto h-40 w-40 rounded-full object-cover"
            src={image}
            alt={alt}
        />
        <h3 className="mt-4 text-lg font-bold">{name}</h3>
        <p className="text-sm text-primary">{role}</p>
    </motion.div>
)

/**
 * @param {{ members: { image: string, alt: string, name: string, role: string }[] }} props
 */
const TeamGallery = ({ members }) => (
    <AnimatedSection>
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Meet Our Makers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                The passionate individuals behind every piece of Lumanest furniture.
            </p>
        </div>
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3"
        >
            {members.map((member) => (
                <TeamMember key={member.name} {...member} />
            ))}
        </motion.div>
    </AnimatedSection>
)

/**
 * @param {{ logos: { image: string, alt: string, className: string }[] }} props
 */
const PressFeatures = ({ logos }) => (
    <AnimatedSection>
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Featured In
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                We're proud to be recognized by leaders in design and lifestyle.
            </p>
        </div>
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="mt-12 grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 md:grid-cols-5"
        >
            {logos.map((logo, index) => (
                <motion.div variants={staggerItem} key={index}>
                    <img
                        className={cn(" opacity-60 dark:invert", logo.className)}
                        src={logo.image}
                        alt={logo.alt}
                    />
                </motion.div>
            ))}
        </motion.div>
    </AnimatedSection>
)

/**
 * @param {{ image: string, alt: string, location: string, address: string, hours: string }} props
 */
const LocationCard = ({ image, alt, location, address, hours }) => (
    <motion.div variants={staggerItem} className="h-full">
        <Card className=" overflow-hidden h-full py-0 gap-0">
            <AspectRatio ratio={16 / 9} className="">
                <img src={image} alt={alt} className="w-full h-full object-cover" />
            </AspectRatio>
            <CardContent className="p-6">
                <h3 className="text-lg font-bold">{location}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    {address}
                    <br />
                    {hours}
                </p>
            </CardContent>
        </Card>
    </motion.div>
)

/**
 * @param {{ locations: { image: string, alt: string, location: string, address: string, hours: string }[] }} props
 */
const StoreLocations = ({ locations }) => (
    <AnimatedSection>
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Visit Our Stores
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                Experience the quality of Lumanest Furniture in person.
            </p>
        </div>
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
            {locations.map((loc) => (
                <LocationCard key={loc.location} {...loc} />
            ))}
        </motion.div>
    </AnimatedSection>
)

const CTASection = () => (
    <section
        className="relative flex min-h-[50vh] items-center justify-center bg-cover bg-center"
        style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80")`,
        }}
    >
        {/* Lớp phủ thay thế cho gradient */}
        <div className="absolute inset-0 bg-black/60" />
        <AnimatedSection className="relative z-10 text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Discover Your Perfect Piece
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/90">
                Browse our curated collections and find the furniture that speaks to you.
            </p>
            <Button
                size="lg"
                className="mt-8 h-12 px-6 text-base font-bold tracking-wide transition-transform hover:scale-105"
            >
                Explore Collections
            </Button>
        </AnimatedSection>
    </section>
)

// --- Component Trang Chính ---

export default function AboutPage() {
    return (
        <div className="-mt-16 relative flex min-h-screen w-full flex-col bg-background text-foreground font-display">
            <main className="flex-grow">
                <HeroSection />

                <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24 space-y-24 md:space-y-32">
                    <BrandStory />
                    <MissionVision />
                    <CoreValues values={coreValuesData} />
                    <Craftsmanship steps={craftsmanshipData} />
                    <TeamGallery members={teamData} />
                    <PressFeatures logos={pressData} />
                    <StoreLocations locations={locationsData} />
                </div>

                <CTASection />
            </main>
        </div>
    )
}