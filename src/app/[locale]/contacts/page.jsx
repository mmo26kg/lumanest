"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
    FaFeatherAlt,
    FaHeart,
    FaShoppingCart,
    FaBars,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaChevronDown,
    FaFacebookF,
    FaInstagram,
    FaPinterestP,
    FaClock,
} from "react-icons/fa"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"

// --- Tiện ích Animation ---

/**
 * Component bọc các section để tạo hiệu ứng fade-in-up khi cuộn tới
 * @param {{ children: React.ReactNode, className?: string }} props
 */
const AnimatedSection = ({ children, className }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
)

// Variants cho animation của grid
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
}

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

// --- Components Con ---

const Logo = () => (
    <div className="flex items-center gap-4 text-foreground">
        <FaFeatherAlt className="size-6 text-foreground" />
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
            FurnitureBrand
        </h2>
    </div>
)


const HeroSection = ({ t }) => (
    <AnimatedSection className="w-full mb-16 sm:mb-20 lg:mb-24">
        <div
            className="relative flex min-h-[360px] md:min-h-[480px] flex-col gap-6 items-center justify-center p-4 text-center bg-cover bg-center bg-no-repeat rounded-xl"
            style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgbRddTMIyQ2M5pHZk0KTUaJi6BTo8LXYVlz82-rP8wqVw1vy9FH0fnZonXWXNzFXOGjGXSuiI4bZzi-XVZVjkHRmhaAMXyKuddrXaR4PK4-SR3Vrx0381uiFwR6i-ks9Osqv1nLXd2I3Tr7FfYlwyfirKmQOjmYIHbMDH1q2Dx1EM1BSu4zStdGPQ_c0Fl45wf25HbYfTdNGf1LUoUBDQWCqEvgdIya-du_R9kEzYmG8DyRi1r5-VhYXAlvCIQYkvlUQozNPwprON')`,
            }}
        >
            {/* Lớp phủ thay thế gradient */}
            <div className="absolute inset-0 bg-black/40 rounded-xl" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="relative z-10"
            >
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl lg:text-6xl">
                    {t("contacts.hero.title")}
                </h1>
                <p className="text-white/90 text-sm font-normal leading-normal sm:text-base max-w-lg mt-4">
                    {t("contacts.hero.subtitle")}
                </p>
            </motion.div>
        </div>
    </AnimatedSection>
)

/**
 * @param {{ icon: import('react-icons').IconType, title: string, text: string }} props
 */
const ContactInfoCard = ({ icon: Icon, title, info, t }) => (
    <motion.div
        variants={staggerItem}
        className="bg-card p-6 rounded-xl border shadow-sm text-center"
    >
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon className="text-primary text-xl" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{t(title)}</h3>
        <p className="text-muted-foreground">{t(info)}</p>
    </motion.div>
)

const ContactForm = ({ t }) => (
    <motion.div
        variants={staggerItem}
        className="lg:col-span-3 bg-card p-6 sm:p-8 rounded-xl border shadow-sm"
    >
        <form className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                        {t("contacts.form.fields.name.label")}
                    </Label>
                    <Input
                        id="name"
                        placeholder={t("contacts.form.fields.name.placeholder")}
                        className="h-12 px-4"
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                        {t("contacts.form.fields.email.label")}
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder={t("contacts.form.fields.email.placeholder")}
                        className="h-12 px-4"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject" className="text-base font-medium">
                    {t("contacts.form.fields.subject.label")}
                </Label>
                <Input
                    id="subject"
                    placeholder={t("contacts.form.fields.subject.placeholder")}
                    className="h-12 px-4"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-medium">
                    {t("contacts.form.fields.message.label")}
                </Label>
                <Textarea
                    id="message"
                    placeholder={t("contacts.form.fields.message.placeholder")}
                    className="min-h-32 p-4"
                />
            </div>
            <Button
                type="submit"
                size="lg"
                className="h-12 px-6 text-base font-bold w-full sm:w-auto"
            >
                {t("contacts.form.submitButton")}
            </Button>
        </form>
    </motion.div>
)

/**
 * @param {{ image: string, alt: string, title: string, address: string, hours: string }} props
 */
const StoreLocationCard = ({ image, alt, title, address, hours, t }) => (
    <motion.div variants={staggerItem}>
        <Card className="flex flex-col h-full shadow-sm overflow-hidden">
            <AspectRatio ratio={16 / 9}>
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-label={t(alt)}
                />
            </AspectRatio>
            <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground">{t(title)}</h3>
                <p className="text-muted-foreground mt-2">{t(address)}</p>
                <p className="text-sm text-muted-foreground/80 mt-2">{t(hours)}</p>
            </CardContent>
        </Card>
    </motion.div>
)

/**
 * @param {{ items: { id: string, question: string, answer: string }[] }} props
 */
const FaqSection = ({ items, t }) => (
    <AnimatedSection className="mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto">
        <div className="text-center mb-10">
            <h2 className="text-foreground text-3xl font-bold tracking-tight">
                {t("contacts.faq.title")}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                {t("contacts.faq.subtitle")}
            </p>
        </div>
        <Accordion
            type="single"
            collapsible
            defaultValue={items[0].id}
            className="w-full space-y-4"
        >
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="bg-card border shadow-sm rounded-lg"
                >
                    <AccordionTrigger className="p-6 text-base font-medium text-left">
                        {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-6 pt-0 text-base text-muted-foreground">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </AnimatedSection>
)

/**
 * @param {{ socials: { name: string, icon: import('react-icons').IconType, href: string }[] }} props
 */
const SocialCtaSection = ({ socials, t }) => (
    <AnimatedSection>
        <Card className="text-center shadow-sm">
            <CardContent className="p-8 sm:p-12">
                <h2 className="text-foreground text-2xl font-bold tracking-tight mb-2">
                    {t("contacts.social.title")}
                </h2>
                <div className="flex justify-center gap-4 mt-4">
                    {socials.map((social) => (
                        <Button
                            key={social.name}
                            variant="ghost"
                            size="icon"
                            asChild
                            aria-label={social.name}
                            className="text-muted-foreground hover:text-primary"
                        >
                            <a href={social.href}>
                                <social.icon className="h-6 w-6" />
                            </a>
                        </Button>
                    ))}
                </div>
                <Separator className="my-8" />
                <h3 className="text-foreground text-2xl font-bold tracking-tight mb-4">
                    {t("contacts.social.cta.title")}
                </h3>
                <Button size="lg" variant="secondary" className="h-12 px-6 text-base font-bold">
                    {t("contacts.social.cta.button")}
                </Button>
            </CardContent>
        </Card>
    </AnimatedSection>
)

// --- Component Trang Chính ---

export default function ContactPage() {
    const t = useTranslations()

    // Data functions using translations
    const getContactInfoData = () => [
        {
            icon: FaEnvelope,
            title: "contacts.info.email.title",
            info: "contacts.info.email.value",
        },
        {
            icon: FaPhoneAlt,
            title: "contacts.info.phone.title",
            info: "contacts.info.phone.value",
        },
        {
            icon: FaMapMarkerAlt,
            title: "contacts.info.address.title",
            info: "contacts.info.address.value",
        },
    ]

    const getStoreLocationsData = () => [
        {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgbRddTMIyQ2M5pHZk0KTUaJi6BTo8LXYVlz82-rP8wqVw1vy9FH0fnZonXWXNzFXOGjGXSuiI4bZzi-XVZVjkHRmhaAMXyKuddrXaR4PK4-SR3Vrx0381uiFwR6i-ks9Osqv1nLXd2I3Tr7FfYlwyfirKmQOjmYIHbMDH1q2Dx1EM1BSu4zStdGPQ_c0Fl45wf25HbYfTdNGf1LUoUBDQWCqEvgdIya-du_R9kEzYmG8DyRi1r5-VhYXAlvCIQYkvlUQozNPwprON",
            alt: "contacts.stores.store1.alt",
            title: "contacts.stores.store1.title",
            address: "contacts.stores.store1.address",
            hours: "contacts.stores.store1.hours",
        },
        {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgbRddTMIyQ2M5pHZk0KTUaJi6BTo8LXYVlz82-rP8wqVw1vy9FH0fnZonXWXNzFXOGjGXSuiI4bZzi-XVZVjkHRmhaAMXyKuddrXaR4PK4-SR3Vrx0381uiFwR6i-ks9Osqv1nLXd2I3Tr7FfYlwyfirKmQOjmYIHbMDH1q2Dx1EM1BSu4zStdGPQ_c0Fl45wf25HbYfTdNGf1LUoUBDQWCqEvgdIya-du_R9kEzYmG8DyRi1r5-VhYXAlvCIQYkvlUQozNPwprON",
            alt: "contacts.stores.store2.alt",
            title: "contacts.stores.store2.title",
            address: "contacts.stores.store2.address",
            hours: "contacts.stores.store2.hours",
        },
    ]

    const getFaqData = (t) => [
        {
            id: "shipping",
            question: t("contacts.faq.items.shipping.question"),
            answer: t("contacts.faq.items.shipping.answer"),
        },
        {
            id: "warranty",
            question: t("contacts.faq.items.warranty.question"),
            answer: t("contacts.faq.items.warranty.answer"),
        },
        {
            id: "returns",
            question: t("contacts.faq.items.returns.question"),
            answer: t("contacts.faq.items.returns.answer"),
        },
        {
            id: "customization",
            question: t("contacts.faq.items.customization.question"),
            answer: t("contacts.faq.items.customization.answer"),
        },
    ]

    const getSocialLinksData = () => [
        { name: "Facebook", icon: FaFacebookF, href: "#" },
        { name: "Instagram", icon: FaInstagram, href: "#" },
        { name: "Pinterest", icon: FaPinterestP, href: "#" },
    ]

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background text-foreground font-display overflow-x-hidden">
            <main className="flex flex-col items-center">
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
                    <HeroSection t={t} />

                    {/* Contact Info & Form */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-16 sm:mb-20 lg:mb-24"
                    >
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {getContactInfoData().map((info) => (
                                <ContactInfoCard
                                    key={info.title}
                                    icon={info.icon}
                                    title={info.title}
                                    info={info.info}
                                    t={t}
                                />
                            ))}
                        </div>
                        <ContactForm t={t} />
                    </motion.div>

                    {/* Store Locations */}
                    <AnimatedSection className="mb-16 sm:mb-20 lg:mb-24">
                        <div className="text-center mb-10">
                            <h2 className="text-foreground text-3xl font-bold tracking-tight">
                                {t("contacts.stores.title")}
                            </h2>
                            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                                {t("contacts.stores.subtitle")}
                            </p>
                        </div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {getStoreLocationsData().map((store) => (
                                <StoreLocationCard
                                    key={store.title}
                                    image={store.image}
                                    alt={store.alt}
                                    title={store.title}
                                    address={store.address}
                                    hours={store.hours}
                                    t={t}
                                />
                            ))}
                        </motion.div>
                    </AnimatedSection>

                    <FaqSection items={getFaqData(t)} t={t} />

                    <SocialCtaSection socials={getSocialLinksData()} t={t} />

                </div>
            </main>
        </div>
    )
}