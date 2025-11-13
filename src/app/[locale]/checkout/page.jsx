"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import {
    FaTruck,
    FaRocket,
    FaMoneyBillWave,
    FaRegCreditCard,
    FaLandmark,
    FaShieldAlt,
    FaCheckCircle,
} from "react-icons/fa"
import { useTranslations } from "next-intl"
import { useCart } from "@/provider/CartProvider"
import { useCheckout } from "@/hooks/useCheckout"
import { useAuth } from "@/provider/AuthProvider"
import { useRouter } from "next/navigation"

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
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

// --- Dữ liệu (Tách riêng) ---

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

/**
 * @param {{
 * customerInfo: any,
 * onCustomerInfoChange: (field: string, value: string) => void,
 * isAuthenticated: boolean
 * }} props
 */
const CustomerInfoForm = ({ customerInfo, onCustomerInfoChange, isAuthenticated }) => {
    const t = useTranslations("Checkout")

    return (
        <section>
            <div className="flex items-center justify-between px-4 pb-3 pt-5">
                <h2 className="text-foreground font-sans text-[22px] font-bold leading-tight tracking-[-0.015em]">
                    {t("customer.title")}
                </h2>
                {isAuthenticated && (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <FaCheckCircle />
                        <span className="font-medium">{t("customer.autoFilled")}</span>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-4 py-3">
                <FormInput
                    id="full-name"
                    labelKey="customer.fullName"
                    placeholderKey="customer.fullNamePlaceholder"
                    value={customerInfo.name}
                    onChange={(e) => onCustomerInfoChange('name', e.target.value)}
                    required
                />
                <FormInput
                    id="phone"
                    labelKey="customer.phone"
                    placeholderKey="customer.phonePlaceholder"
                    value={customerInfo.phone}
                    onChange={(e) => onCustomerInfoChange('phone', e.target.value)}
                    required
                />
                <div className="md:col-span-2">
                    <FormInput
                        id="email"
                        labelKey="customer.email"
                        type="email"
                        placeholderKey="customer.emailPlaceholder"
                        value={customerInfo.email}
                        onChange={(e) => onCustomerInfoChange('email', e.target.value)}
                        required
                        disabled={isAuthenticated}
                    />
                </div>
            </div>
        </section>
    )
}

/**
 * @param {{
 * shippingAddress: any,
 * onShippingAddressChange: (field: string, value: string) => void
 * }} props
 */
const ShippingAddressForm = ({ shippingAddress, onShippingAddressChange }) => {
    const t = useTranslations("Checkout")
    const [sameAsCustomer, setSameAsCustomer] = useState(false)

    return (
        <section>
            <div className="flex items-center justify-between px-4 pb-3 pt-5">
                <h2 className="text-foreground font-sans text-[22px] font-bold leading-tight tracking-[-0.015em]">
                    {t("address.title")}
                </h2>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="same-address"
                        checked={sameAsCustomer}
                        onCheckedChange={setSameAsCustomer}
                    />
                    <Label htmlFor="same-address" className="text-sm font-medium text-muted-foreground">
                        {t("address.sameAsCustomer")}
                    </Label>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-4 py-3">
                <div className="md:col-span-2">
                    <FormInput
                        id="address"
                        labelKey="address.line"
                        placeholderKey="address.linePlaceholder"
                        value={shippingAddress.address}
                        onChange={(e) => onShippingAddressChange('address', e.target.value)}
                        required
                    />
                </div>
                <FormInput
                    id="city"
                    labelKey="address.city"
                    placeholderKey="address.cityPlaceholder"
                    value={shippingAddress.city}
                    onChange={(e) => onShippingAddressChange('city', e.target.value)}
                />
                <FormInput
                    id="district"
                    labelKey="address.district"
                    placeholderKey="address.districtPlaceholder"
                    value={shippingAddress.district}
                    onChange={(e) => onShippingAddressChange('district', e.target.value)}
                />
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
 * @param {{ item: any }} props
 */
const OrderSummaryItem = ({ item }) => {
    const t = useTranslations("Checkout")
    const locale = useTranslations().locale || 'vi'

    return (
        <div className="flex items-center gap-4">
            <img
                className="w-20 h-20 object-cover rounded-lg"
                src={item.imageUrl || 'https://placehold.co/80x80/ef4444/ffffff?text=No+Image'}
                alt={locale === 'vi' ? item.name_vi : item.name_en}
            />
            <div className="flex-1">
                <p className="font-semibold font-sans text-foreground">
                    {locale === 'vi' ? item.name_vi : item.name_en}
                </p>
                <p className="text-sm text-muted-foreground">
                    {t("summary.quantity")}: {item.quantity}
                </p>
            </div>
            <p className="font-semibold text-foreground">
                {formatCurrency((item.sale_price || item.price) * item.quantity)}
            </p>
        </div>
    )
}

/**
 * @param {{ 
 * shippingCost: number, 
 * discount: number,
 * onPlaceOrder: () => void,
 * isSubmitting: boolean
 * }} props
 */
const OrderSummary = ({ shippingCost, discount, onPlaceOrder, isSubmitting }) => {
    const t = useTranslations("Checkout")
    const { cart, totalPrice } = useCart()

    const total = totalPrice + shippingCost - discount

    return (
        <Card className="lg:sticky lg:top-10 h-max">
            <CardHeader>
                <CardTitle className="text-xl font-sans font-bold">{t("summary.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {cart.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>{t("summary.emptyCart")}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <OrderSummaryItem key={item.id} item={item} />
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <>
                        <Separator />

                        {/* Coupon Input */}
                        <div className="flex gap-2">
                            <Input placeholder={t("summary.couponPlaceholder")} className="h-12" />
                            <Button variant="secondary" className="h-12 px-4 text-sm font-bold">
                                {t("summary.applyCoupon")}
                            </Button>
                        </div>

                        <Separator />

                        {/* Price Breakdown */}
                        <div className="space-y-2 text-muted-foreground">
                            <div className="flex justify-between">
                                <p>{t("summary.subtotal")}</p>
                                <p className="text-foreground">{formatCurrency(totalPrice)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>{t("summary.shipping")}</p>
                                <p className="text-foreground">{formatCurrency(shippingCost)}</p>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600 dark:text-green-400">
                                    <p>{t("summary.discount")}</p>
                                    <p>- {formatCurrency(discount)}</p>
                                </div>
                            )}
                        </div>

                        <Separator />

                        {/* Total */}
                        <div className="flex justify-between font-bold text-lg text-foreground">
                            <p>{t("summary.total")}</p>
                            <p>{formatCurrency(total)}</p>
                        </div>
                    </>
                )}
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full h-14 text-base font-bold"
                    disabled={cart.length === 0 || isSubmitting}
                    onClick={onPlaceOrder}
                >
                    {isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>{t("summary.processing")}</span>
                        </div>
                    ) : (
                        t("summary.placeOrder")
                    )}
                </Button>
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
    const router = useRouter()
    const { cart, isLoaded } = useCart()
    const { user, isAuthenticated } = useAuth()
    const { createOrder, isSubmitting, error: checkoutError } = useCheckout()

    // Form states - Sẽ được auto-fill từ user
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        district: ''
    })

    const [selectedShipping, setSelectedShipping] = useState(shippingMethodsData[0].id)
    const [selectedPayment, setSelectedPayment] = useState(paymentMethodsData[0].id)
    const [discount] = useState(0)
    const [notes, setNotes] = useState('')

    // Success state
    const [orderSuccess, setOrderSuccess] = useState(false)
    const [createdOrder, setCreatedOrder] = useState(null)

    // Auto-fill user info khi component mount hoặc user thay đổi
    useEffect(() => {
        if (isAuthenticated && user) {
            console.log('🔄 Auto-filling user data:', user)

            setCustomerInfo({
                name: user.user_metadata?.full_name || user.user_metadata?.name || '',
                email: user.email || '',
                phone: user.user_metadata?.phone || user.phone || ''
            })

            // Có thể auto-fill shipping address nếu user đã lưu
            if (user.user_metadata?.address) {
                setShippingAddress({
                    address: user.user_metadata.address || '',
                    city: user.user_metadata.city || '',
                    district: user.user_metadata.district || ''
                })
            }
        }
    }, [isAuthenticated, user])

    // Handlers
    const handleCustomerInfoChange = (field, value) => {
        setCustomerInfo(prev => ({ ...prev, [field]: value }))
    }

    const handleShippingAddressChange = (field, value) => {
        setShippingAddress(prev => ({ ...prev, [field]: value }))
    }

    // Tính shipping cost
    const shippingCost = useMemo(
        () => shippingMethodsData.find((m) => m.id === selectedShipping)?.price || 0,
        [selectedShipping]
    )

    // Handle place order
    const handlePlaceOrder = async () => {
        const checkoutData = {
            customer: customerInfo,
            shipping: shippingAddress,
            shippingMethod: selectedShipping,
            shippingCost: shippingCost,
            paymentMethod: selectedPayment,
            discountAmount: discount,
            notes: notes
        }

        const result = await createOrder(checkoutData)

        if (result.success) {
            setOrderSuccess(true)
            setCreatedOrder(result.order)

            // Redirect to success page sau 200ms
            setTimeout(() => {
                router.push(`checkout/order-success/${result.order.id}`)
            }, 200)
        }
    }

    // Framer Motion variants
    const mainContentVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }

    const summaryVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1, ease: "easeOut" } },
    }

    // Loading state
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="relative font-serif flex h-auto min-h-screen w-full flex-col bg-background text-foreground font-display overflow-x-hidden">
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Error Alert */}
                {checkoutError && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertTitle>{t("error.title")}</AlertTitle>
                        <AlertDescription>{checkoutError}</AlertDescription>
                    </Alert>
                )}

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cột trái */}
                    <motion.div className="w-full lg:w-3/5" variants={mainContentVariants} initial="hidden" animate="visible">
                        <Card>
                            <div className="flex flex-wrap justify-between gap-3 p-4">
                                <div className="flex min-w-72 flex-col gap-3">
                                    <h1 className="text-foreground text-4xl font-black font-sans leading-tight tracking-[-0.033em]">
                                        {t("page.title")}
                                    </h1>
                                    <p className="text-muted-foreground text-base font-normal leading-normal">
                                        {t("page.description")}
                                    </p>
                                </div>
                            </div>

                            <CheckoutProgress />

                            <div className="space-y-10">
                                <CustomerInfoForm
                                    customerInfo={customerInfo}
                                    onCustomerInfoChange={handleCustomerInfoChange}
                                    isAuthenticated={isAuthenticated}
                                />
                                <ShippingAddressForm
                                    shippingAddress={shippingAddress}
                                    onShippingAddressChange={handleShippingAddressChange}
                                />
                                <ShippingMethodSection
                                    methods={shippingMethodsData}
                                    selectedId={selectedShipping}
                                    onSelect={setSelectedShipping}
                                />
                                <PaymentMethodSection
                                    methods={paymentMethodsData}
                                    selectedId={selectedPayment}
                                    onSelect={setSelectedPayment}
                                />
                            </div>
                        </Card>
                    </motion.div>

                    {/* Cột phải */}
                    <motion.div className="w-full lg:w-2/5" variants={summaryVariants} initial="hidden" animate="visible">
                        <OrderSummary
                            shippingCost={shippingCost}
                            discount={discount}
                            onPlaceOrder={handlePlaceOrder}
                            isSubmitting={isSubmitting}
                        />
                    </motion.div>
                </div>
            </main>

            <CheckoutFooter />
        </div>
    )
}