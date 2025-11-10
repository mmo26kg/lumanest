"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    FaFeatherAlt, // Logo thay thế
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

// --- Tách biệt Data ---

/** @type {{ href: string, text: string, active?: boolean }[]} */
const navLinksData = [
    { href: "#", text: "Home" },
    { href: "#", text: "Products" },
    { href: "#", text: "About Us" },
    { href: "#", text: "Contact Us", active: true },
]

/** @type {{ icon: import('react-icons').IconType, title: string, text: string }[]} */
const contactInfoData = [
    {
        icon: FaEnvelope,
        title: "Email",
        text: "support@furniturebrand.com",
    },
    {
        icon: FaPhoneAlt,
        title: "Số điện thoại",
        text: "(+84) 123 456 789",
    },
    {
        icon: FaMapMarkerAlt,
        title: "Địa chỉ trụ sở",
        text: "123 Furniture St, District 1, HCMC",
    },
]

/** @type {{ image: string, alt: string, title: string, address: string, hours: string }[]} */
const storeLocationsData = [
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn5YZh8v8KzMyHslJ-9_4wMwGHhSCuwdBfcKgs3b5dXBA4TiT9XormDynE2lnT_ml9R15j8AvtmYnJHX8VuZKIGmoF0fs9sJZPiU-7SRevXUpJUI25q31ZA_qd1vWhupkB95BdT5-HjWoPi7bxsBwwVYvo-GQdY1kycCkL_ZHAfgMgW8OWFYnCLSkn-chWz1FbVFLxkFaJU9Xwho96_91Oad3UpuXDAL-pv6YgIMwBmVeW9B_1_eG1yqTDw9rlNxvUEa1yYCGY4Hk2",
        alt: "Abstract map view of Ho Chi Minh City",
        title: "Showroom TP. Hồ Chí Minh",
        address: "123 Lê Lợi, Phường Bến Nghé, Quận 1",
        hours: "Giờ mở cửa: 9:00 - 21:00 hàng ngày",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGi0oTTQ7WHkzA5_U2_06fGcDe12vubMyUbUZ5aZpPte_-7qWAtFDM8cLJNBMPpnylbErn7dmE4Q2RZcdtbfbjJPd3qWbV_-8BSSFjSlud3nvpc7VAYYKvS0_LSJNn_c_dsRg69isEojS3Siolu7kGnfRLH2BI-DwirV9oFn7WJ6fBeHCV0UBSmprwECRpQmUQvwVqnMo3v2HbDL6CeGhTZPLoDU-yGiP7fzfRnBFs6j694EZ_p5wr_fr5YeKuIACbXodi1eZkdgd4",
        alt: "Abstract map view of Hanoi",
        title: "Showroom Hà Nội",
        address: "456 Tràng Tiền, Quận Hoàn Kiếm",
        hours: "Giờ mở cửa: 9:00 - 21:00 hàng ngày",
    },
]

/** @type {{ id: string, question: string, answer: string }[]} */
const faqData = [
    {
        id: "faq-1",
        question: "Làm thế nào để đặt hàng?",
        answer:
            "Bạn có thể đặt hàng trực tiếp trên website của chúng tôi bằng cách thêm sản phẩm vào giỏ hàng và tiến hành thanh toán. Hoặc bạn có thể gọi điện đến hotline để được hỗ trợ.",
    },
    {
        id: "faq-2",
        question: "Chính sách vận chuyển và lắp đặt?",
        answer:
            "Chúng tôi miễn phí vận chuyển và lắp đặt cho các đơn hàng trong nội thành TP.HCM và Hà Nội. Đối với các khu vực khác, phí vận chuyển sẽ được tính dựa trên địa chỉ giao hàng.",
    },
    {
        id: "faq-3",
        question: "Chính sách bảo hành và đổi trả?",
        answer:
            "Sản phẩm được bảo hành 12 tháng cho lỗi của nhà sản xuất. Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm có lỗi hoặc không đúng như mô tả.",
    },
]

/** @type {{ name: string, icon: import('react-icons').IconType, href: string }[]} */
const socialLinksData = [
    { name: "Facebook", icon: FaFacebookF, href: "#" },
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "Pinterest", icon: FaPinterestP, href: "#" },
]

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


const HeroSection = () => (
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
                    Liên hệ
                </h1>
                <p className="text-white/90 text-sm font-normal leading-normal sm:text-base max-w-lg mt-4">
                    Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng
                    tôi qua các kênh dưới đây.
                </p>
            </motion.div>
        </div>
    </AnimatedSection>
)

/**
 * @param {{ icon: import('react-icons').IconType, title: string, text: string }} props
 */
const ContactInfoCard = ({ icon: Icon, title, text }) => (
    <motion.div variants={staggerItem}>
        <Card className="flex flex-col flex-1 h-full shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
                <Icon className="text-3xl text-primary" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold leading-tight text-foreground">
                        {title}
                    </h2>
                    <p className="text-base font-normal leading-normal text-muted-foreground">
                        {text}
                    </p>
                </div>
            </CardContent>
        </Card>
    </motion.div>
)

const ContactForm = () => (
    <motion.div
        variants={staggerItem}
        className="lg:col-span-3 bg-card p-6 sm:p-8 rounded-xl border shadow-sm"
    >
        <form className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                        Họ và Tên
                    </Label>
                    <Input
                        id="name"
                        placeholder="Nhập họ và tên của bạn"
                        className="h-12 px-4"
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="h-12 px-4"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject" className="text-base font-medium">
                    Chủ đề
                </Label>
                <Input
                    id="subject"
                    placeholder="Nhập chủ đề tin nhắn"
                    className="h-12 px-4"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-medium">
                    Tin nhắn
                </Label>
                <Textarea
                    id="message"
                    placeholder="Nội dung tin nhắn của bạn..."
                    className="min-h-32 p-4"
                />
            </div>
            <Button
                type="submit"
                size="lg"
                className="h-12 px-6 text-base font-bold w-full sm:w-auto"
            >
                Gửi tin nhắn
            </Button>
        </form>
    </motion.div>
)

/**
 * @param {{ image: string, alt: string, title: string, address: string, hours: string }} props
 */
const StoreLocationCard = ({ image, alt, title, address, hours }) => (
    <motion.div variants={staggerItem}>
        <Card className="flex flex-col h-full shadow-sm overflow-hidden">
            <AspectRatio ratio={16 / 9}>
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-label={alt}
                />
            </AspectRatio>
            <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="text-muted-foreground mt-2">{address}</p>
                <p className="text-sm text-muted-foreground/80 mt-2">{hours}</p>
            </CardContent>
        </Card>
    </motion.div>
)

/**
 * @param {{ items: { id: string, question: string, answer: string }[] }} props
 */
const FaqSection = ({ items }) => (
    <AnimatedSection className="mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto">
        <div className="text-center mb-10">
            <h2 className="text-foreground text-3xl font-bold tracking-tight">
                Câu hỏi thường gặp
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Tìm câu trả lời nhanh cho các câu hỏi phổ biến.
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
const SocialCtaSection = ({ socials }) => (
    <AnimatedSection>
        <Card className="text-center shadow-sm">
            <CardContent className="p-8 sm:p-12">
                <h2 className="text-foreground text-2xl font-bold tracking-tight mb-2">
                    Kết nối với chúng tôi
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
                    Sẵn sàng làm mới không gian của bạn?
                </h3>
                <Button size="lg" variant="secondary" className="h-12 px-6 text-base font-bold">
                    Khám phá bộ sưu tập mới nhất
                </Button>
            </CardContent>
        </Card>
    </AnimatedSection>
)

// --- Component Trang Chính ---

export default function ContactPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background text-foreground font-display overflow-x-hidden">
            <main className="flex flex-col items-center">
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
                    <HeroSection />

                    {/* Contact Info & Form */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-16 sm:mb-20 lg:mb-24"
                    >
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {contactInfoData.map((info) => (
                                <ContactInfoCard
                                    key={info.title}
                                    icon={info.icon}
                                    title={info.title}
                                    text={info.text}
                                />
                            ))}
                        </div>
                        <ContactForm />
                    </motion.div>

                    {/* Store Locations */}
                    <AnimatedSection className="mb-16 sm:mb-20 lg:mb-24">
                        <div className="text-center mb-10">
                            <h2 className="text-foreground text-3xl font-bold tracking-tight">
                                Hệ thống cửa hàng
                            </h2>
                            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                                Ghé thăm showroom của chúng tôi để trải nghiệm sản phẩm trực tiếp.
                            </p>
                        </div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {storeLocationsData.map((store) => (
                                <StoreLocationCard
                                    key={store.title}
                                    image={store.image}
                                    alt={store.alt}
                                    title={store.title}
                                    address={store.address}
                                    hours={store.hours}
                                />
                            ))}
                        </motion.div>
                    </AnimatedSection>

                    <FaqSection items={faqData} />

                    <SocialCtaSection socials={socialLinksData} />

                </div>
            </main>
        </div>
    )
}