"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
    FaTruck,
    FaRocket,
    FaMoneyBillWave,
    FaRegCreditCard,
    FaLandmark,
    FaShieldAlt,
} from "react-icons/fa"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

// --- Dữ liệu (Tách riêng) ---

/**
 * @typedef {Object} OrderItemData
 * @property {string} id
 * @property {string} nameKey
 * @property {number} quantity
 * @property {number} price
 * @property {string} imageUrl
 * @property {string} altTextKey
 */

/** @type {OrderItemData[]} */
const orderItemsData = [
    {
        id: "1",
        nameKey: "customer.items.boucleSofa.name",
        quantity: 1,
        price: 2500000,
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBSc15T86lQs1y9zqfL3UVfwlmy5eEUhhOeVkvWF1GI1rIeHrC3Q__uZCCZbgyrtG1e5ZY7QcZD-g0ac2ML7Gt9WCRGkksDNpH1RrpcN-5Zj9sOQcuGi6LY92Sp1M_R9dyyGw27PxooBvioZ2yKKKssDaIPgJfwl4AjXx1u9YvQkW2S2ed2FeHoxkJTSGvxJKjccb1VsZd6_1xo5Z_1OtrDNcFXQqOBXVE0WXvUe7QlObcfP8ecH7dz9qj2mBBrcL47hQhhbn5qDjcb",
        altTextKey: "customer.items.boucleSofa.alt",
    },
    {
        id: "2",
        nameKey: "customer.items.floorLamp.name",
        quantity: 1,
        price: 1200000,
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuByDKfSV6ID5kn4XNEE5mCqn1_jl7l6N6cv7dtzRPJlvBTou0H72sf0a83i9SzdW1Xc0GuvHneljDDmREliU8OeEcrBzUUfGz9xlOWiRyF80yworuxHMJW4yObXYfJRB-EaeGHPBlk7Kcd7sRj8u5E3g_jHDIcalr_jKFhakXW7JuvAP9ndKi4hIGYspyJC5-5pa4hhzMD0qFxUPt1YLB7dAqhWhu3ydze4Xcm7ucG0Aeqv22iQT8KkFe9gLvr7BjjwMrhlbmCOjWJf",
        altTextKey: "customer.items.floorLamp.alt",
    },
]

/**
 * @typedef {Object} ShippingMethod
 * @property {string} id
 * @property {number} price
 * @property {import('react-icons').IconType} icon
 */

/** @type {ShippingMethod[]} */
const shippingMethodsData = [
    { id: "standard", price: 30000, icon: FaTruck },
    { id: "express", price: 50000, icon: FaRocket },
]

/**
 * @typedef {Object} PaymentMethod
 * @property {string} id
 * @property {import('react-icons').IconType} icon
 */

/** @type {PaymentMethod[]} */
const paymentMethodsData = [
    { id: "cod", icon: FaMoneyBillWave },
    { id: "card", icon: FaRegCreditCard },
    { id: "bank", icon: FaLandmark },
]

const checkoutSteps = ["cart", "info", "payment", "confirm"]
const currentStepId = "info"

// --- Tiện ích ---

/**
 * Định dạng số thành tiền tệ
 * @param {number} amount
 * @returns {string}
 */
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount)
}

// --- Components Con ---

const LogoIcon = (props) => (
    <svg
        fill="none"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#clip0_6_330)">
            <path
                clipRule="evenodd"
                d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                fill="currentColor"
                fillRule="evenodd"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_6_330">
                <rect fill="white" height="48" width="48"></rect>
            </clipPath>
        </defs>
    </svg>
)


/**
 * @param {{ labelKey: string, id: string, type?: string, placeholderKey?: string }} props
 */
const FormInput = ({ labelKey, id, placeholderKey, ...props }) => {
    const t = useTranslations("Checkout")
    return (
        <div className="flex flex-col w-full">
            <Label htmlFor={id} className="text-base font-medium leading-normal pb-2">
                {t(labelKey)}
            </Label>
            <Input
                id={id}
                placeholder={placeholderKey ? t(placeholderKey) : undefined}
                className="h-14 p-[15px] text-base"
                {...props}
            />
        </div>
    )
}

const CheckoutProgress = () => {
    const t = useTranslations("Checkout")
    const currentStepIndex = checkoutSteps.findIndex((step) => step === currentStepId)
    const progressValue = ((currentStepIndex + 1) / checkoutSteps.length) * 100

    return (
        <div className="flex flex-col gap-3 p-4">
            <div className="flex gap-1 justify-between text-sm md:text-base font-medium leading-normal text-muted-foreground">
                {checkoutSteps.map((step, index) => (
                    <span
                        key={step}
                        className={cn(
                            index > 0 && "before:content-['→'] before:mx-1",
                            step === currentStepId && "text-primary font-bold"
                        )}
                    >
                        {t(`steps.${step}`)}
                    </span>
                ))}
            </div>
            <Progress value={progressValue} className="h-2" />
            <p className="text-sm font-normal leading-normal text-muted-foreground">
                {t("progress", {
                    current: currentStepIndex + 1,
                    total: checkoutSteps.length,
                    name: t(`steps.${checkoutSteps[currentStepIndex]}`),
                })}
            </p>
        </div>
    )
}

const CustomerInfoForm = () => {
    return (
        <section>
            <h2 className="text-foreground  font-sans text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                <CustomerInfoFormTitle />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-4 py-3">
                <FormInput id="full-name" labelKey="customer.fullName" placeholderKey="customer.fullNamePlaceholder" />
                <FormInput id="phone" labelKey="customer.phone" placeholderKey="customer.phonePlaceholder" />
                <div className="md:col-span-2">
                    <FormInput id="email" labelKey="customer.email" type="email" placeholderKey="customer.emailPlaceholder" />
                </div>
            </div>
        </section>
    )
}
const CustomerInfoFormTitle = () => {
    const t = useTranslations("Checkout")
    return t("customer.title")
}

const ShippingAddressForm = () => {
    const t = useTranslations("Checkout")
    return (
        <section>
            <div className="flex items-center justify-between px-4 pb-3 pt-5">
                <h2 className="text-foreground  font-sans text-[22px] font-bold leading-tight tracking-[-0.015em]">
                    {t("address.title")}
                </h2>
                <div className="flex items-center gap-2">
                    <Checkbox id="same-address" />
                    <Label htmlFor="same-address" className="text-sm font-medium text-muted-foreground">
                        {t("address.sameAsCustomer")}
                    </Label>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-4 py-3">
                <div className="md:col-span-2">
                    <FormInput id="address" labelKey="address.line" placeholderKey="address.linePlaceholder" />
                </div>
                <FormInput id="city" labelKey="address.city" placeholderKey="address.cityPlaceholder" />
                <FormInput id="district" labelKey="address.district" placeholderKey="address.districtPlaceholder" />
            </div>
        </section>
    )
}

/**
 * @param {{ 
 * methods: ShippingMethod[], 
 * selectedId: string, 
 * onSelect: (id: string) => void 
 * }} props
 */
const ShippingMethodSection = ({ methods, selectedId, onSelect }) => {
    const t = useTranslations("Checkout")
    return (
        <section>
            <h2 className="text-foreground text-[22px] font-sans font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                {t("shipping.title")}
            </h2>
            <RadioGroup value={selectedId} onValueChange={onSelect} className="space-y-4 px-4 py-3">
                {methods.map((method) => {
                    const isSelected = selectedId === method.id

                    return (
                        <Label
                            key={method.id}
                            htmlFor={method.id}
                            className={cn(
                                "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all",
                                isSelected ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-border hover:border-primary/50"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <RadioGroupItem value={method.id} id={method.id} />
                                <method.icon className="text-primary text-2xl" />
                                <div>
                                    <p className="font-bold text-foreground">{t(`shipping.methods.${method.id}.name`)}</p>
                                    <p className="text-sm text-muted-foreground">{t(`shipping.methods.${method.id}.description`)}</p>
                                </div>
                            </div>
                            <p className="font-bold text-foreground">{formatCurrency(method.price)}</p>
                        </Label>
                    )
                })}
            </RadioGroup>
        </section>
    )
}

/**
 * @param {{ 
 * methods: PaymentMethod[], 
 * selectedId: string, 
 * onSelect: (id: string) => void 
 * }} props
 */
const PaymentMethodSection = ({ methods, selectedId, onSelect }) => {
    const t = useTranslations("Checkout")
    return (
        <section>
            <h2 className="text-foreground font-sans text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                {t("payment.title")}
            </h2>
            <RadioGroup value={selectedId} onValueChange={onSelect} className="space-y-4 px-4 py-3">
                {methods.map((method) => {
                    const isSelected = selectedId === method.id

                    return (
                        <Label
                            key={method.id}
                            htmlFor={method.id}
                            className={cn(
                                "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all",
                                isSelected ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-border hover:border-primary/50"
                            )}
                        >
                            <RadioGroupItem value={method.id} id={method.id} />
                            <method.icon className="text-primary text-2xl" />
                            <p className="font-bold text-foreground flex-1">{t(`payment.methods.${method.id}.name`)}</p>
                        </Label>
                    )
                })}
            </RadioGroup>
        </section>
    )
}

/**
 * @param {{ item: OrderItemData }} props
 */
const OrderSummaryItem = ({ item }) => {
    const t = useTranslations("Checkout")
    return (
        <div className="flex items-center gap-4">
            <img className="w-20 h-20 object-cover rounded-lg" src={item.imageUrl} alt={t(item.altTextKey)} />
            <div className="flex-1">
                <p className="font-semibold  font-sans text-foreground">{t(item.nameKey)}</p>
                <p className="text-sm text-muted-foreground">{t("summary.quantity")}: {item.quantity}</p>
            </div>
            <p className="font-semibold text-foreground">{formatCurrency(item.price)}</p>
        </div>
    )
}

/**
 * @param {{ 
 * items: OrderItemData[], 
 * shippingCost: number, 
 * discount: number, 
 * subtotal: number,
 * total: number
 * }} props
 */
const OrderSummary = ({ items, shippingCost, discount, subtotal, total }) => {
    const t = useTranslations("Checkout")
    return (
        <Card className="lg:sticky lg:top-10 h-max">
            <CardHeader>
                <CardTitle className="text-xl  font-sans font-bold">{t("summary.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {items.map((item) => (
                        <OrderSummaryItem key={item.id} item={item} />
                    ))}
                </div>
                <Separator />
                <div className="flex gap-2">
                    <Input placeholder={t("summary.couponPlaceholder")} className="h-12" />
                    <Button variant="secondary" className="h-12 px-4 text-sm font-bold">{t("summary.applyCoupon")}</Button>
                </div>
                <Separator />
                <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                        <p>{t("summary.subtotal")}</p>
                        <p className="text-foreground">{formatCurrency(subtotal)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>{t("summary.shipping")}</p>
                        <p className="text-foreground">{formatCurrency(shippingCost)}</p>
                    </div>
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                        <p>{t("summary.discount")}</p>
                        <p>- {formatCurrency(discount)}</p>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg text-foreground">
                    <p>{t("summary.total")}</p>
                    <p>{formatCurrency(total)}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full h-14 text-base font-bold">{t("summary.placeOrder")}</Button>
            </CardFooter>
        </Card>
    )
}

const CheckoutFooter = () => {
    const t = useTranslations("Checkout")
    return (
        <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-10 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <FaShieldAlt className="text-green-600 text-xl" />
                    <p className="text-sm text-muted-foreground">{t("footer.securePayment")}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <a className="hover:text-primary" href="#">{t("footer.support")}</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a className="hover:text-primary" href="#">{t("footer.privacy")}</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a className="hover:text-primary" href="#">{t("footer.terms")}</a>
                </div>
            </div>
        </footer>
    )
}

// --- Component Trang Chính ---

export default function CheckoutPage() {
    const t = useTranslations("Checkout")
    const [items] = useState(orderItemsData)
    const [selectedShipping, setSelectedShipping] = useState(shippingMethodsData[0].id)
    const [selectedPayment, setSelectedPayment] = useState(paymentMethodsData[0].id)

    // Tính toán hóa đơn
    const subtotal = useMemo(() => items.reduce((acc, item) => acc + item.price * item.quantity, 0), [items])
    const shippingCost = useMemo(
        () => shippingMethodsData.find((m) => m.id === selectedShipping)?.price || 0,
        [selectedShipping]
    )
    const discount = 0 // Logic mã giảm giá có thể thêm ở đây
    const total = subtotal + shippingCost - discount

    // Định nghĩa variants cho Framer Motion
    const mainContentVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }

    const summaryVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1, ease: "easeOut" } },
    }

    return (
        <div className="relative font-serif flex h-auto min-h-screen w-full flex-col bg-background text-foreground font-display overflow-x-hidden">
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cột trái: Nội dung chính */}
                    <motion.div className="w-full lg:w-3/5" variants={mainContentVariants} initial="hidden" animate="visible">
                        <Card>
                            <div className="flex flex-wrap justify-between gap-3 p-4">
                                <div className="flex min-w-72 flex-col gap-3">
                                    <h1 className="text-foreground text-4xl font-black font-sans leading-tight tracking-[-0.033em]">{t("page.title")}</h1>
                                    <p className="text-muted-foreground text-base font-normal leading-normal">{t("page.description")}</p>
                                </div>
                            </div>

                            {/* <CheckoutProgress /> */}

                            <div className="space-y-10 ">
                                <CustomerInfoForm />
                                <ShippingAddressForm />
                                <ShippingMethodSection methods={shippingMethodsData} selectedId={selectedShipping} onSelect={setSelectedShipping} />
                                <PaymentMethodSection methods={paymentMethodsData} selectedId={selectedPayment} onSelect={setSelectedPayment} />
                            </div>
                        </Card>
                    </motion.div>

                    {/* Cột phải: Tóm tắt đơn hàng */}
                    <motion.div className="w-full lg:w-2/5" variants={summaryVariants} initial="hidden" animate="visible">
                        <OrderSummary items={items} shippingCost={shippingCost} discount={discount} subtotal={subtotal} total={total} />
                    </motion.div>
                </div>
            </main>

            <CheckoutFooter />
        </div>
    )
}