"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { createClient } from "@/utils/supabase/client"
import {
    FaCheckCircle,
    FaTruck,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaBox,
    FaArrowLeft,
    FaHome,
} from "react-icons/fa"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Loading } from "@/components/ui/loading"

/**
 * Format currency
 */
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount)
}

/**
 * Format date
 */
const formatDate = (dateString, locale) => {
    return new Date(dateString).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

/**
 * Success Header Component
 */
const SuccessHeader = ({ orderId, orderDate, locale }) => {
    const t = useTranslations("OrderSuccess")

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center space-y-6 mb-12"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
                <FaCheckCircle className="text-green-600 text-7xl mx-auto mb-6" />
            </motion.div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground font-sans">
                    {t("title")}
                </h1>
                <p className="text-lg text-muted-foreground font-serif">
                    {t("subtitle")}
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground font-serif">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{t("orderId")}:</span>
                    <Badge variant="outline" className="text-base font-mono">
                        #{orderId}
                    </Badge>
                </div>
                <Separator orientation="vertical" className="h-6 hidden md:block" />
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{t("orderDate")}:</span>
                    <span>{formatDate(orderDate, locale)}</span>
                </div>
            </div>
        </motion.div>
    )
}

/**
 * Order Timeline Component
 */
const OrderTimeline = ({ status }) => {
    const t = useTranslations("OrderSuccess")

    const steps = [
        { id: "pending", icon: FaBox, label: t("timeline.pending") },
        { id: "processing", icon: FaTruck, label: t("timeline.processing") },
        { id: "shipped", icon: FaTruck, label: t("timeline.shipped") },
        { id: "completed", icon: FaCheckCircle, label: t("timeline.delivered") },
    ]

    const currentStepIndex = steps.findIndex((step) => step.id === status)

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-xl font-sans">{t("timeline.title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-6 left-0 right-0 h-1 bg-border">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-primary"
                        />
                    </div>

                    {/* Steps */}
                    <div className="relative flex justify-between">
                        {steps.map((step, index) => {
                            const isCompleted = index <= currentStepIndex
                            const isCurrent = index === currentStepIndex

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${isCompleted
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                            } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                                    >
                                        <step.icon className="text-xl" />
                                    </div>
                                    <span
                                        className={`text-xs md:text-sm font-medium text-center font-serif ${isCompleted ? "text-foreground" : "text-muted-foreground"
                                            }`}
                                    >
                                        {step.label}
                                    </span>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

/**
 * Customer Info Component
 */
const CustomerInfo = ({ order }) => {
    const t = useTranslations("OrderSuccess")

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-sans">{t("customer.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-serif">
                <div className="flex items-start gap-3">
                    <FaEnvelope className="text-primary mt-1" />
                    <div>
                        <p className="text-sm text-muted-foreground">{t("customer.email")}</p>
                        <p className="font-medium">{order.customer_email}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <FaPhone className="text-primary mt-1" />
                    <div>
                        <p className="text-sm text-muted-foreground">{t("customer.phone")}</p>
                        <p className="font-medium">{order.customer_phone}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-primary mt-1" />
                    <div>
                        <p className="text-sm text-muted-foreground">{t("customer.address")}</p>
                        <p className="font-medium">
                            {order.shipping_address}
                            {order.shipping_district && `, ${order.shipping_district}`}
                            {order.shipping_city && `, ${order.shipping_city}`}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

/**
 * Order Items Component
 */
const OrderItems = ({ items, locale }) => {
    const t = useTranslations("OrderSuccess")

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-sans">{t("items.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                        <img
                            src={item.product_image_url || "https://placehold.co/80x80"}
                            alt={locale === "vi" ? item.product_name_vi : item.product_name_en}
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <p className="font-semibold font-sans">
                                {locale === "vi" ? item.product_name_vi : item.product_name_en}
                            </p>
                            <p className="text-sm text-muted-foreground font-serif">
                                {t("items.quantity")}: {item.quantity}
                            </p>
                        </div>
                        <p className="font-semibold font-serif">
                            {formatCurrency(item.price * item.quantity)}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

/**
 * Order Summary Component
 */
const OrderSummaryCard = ({ order }) => {
    const t = useTranslations("OrderSuccess")

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-sans">{t("summary.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-serif">
                <div className="flex justify-between text-muted-foreground">
                    <span>{t("summary.subtotal")}</span>
                    <span className="text-foreground">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                    <span>{t("summary.shipping")}</span>
                    <span className="text-foreground">{formatCurrency(order.shipping_cost)}</span>
                </div>
                {order.discount_amount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>{t("summary.discount")}</span>
                        <span>- {formatCurrency(order.discount_amount)}</span>
                    </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>{t("summary.total")}</span>
                    <span className="text-primary">{formatCurrency(order.total_amount)}</span>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("summary.paymentMethod")}</span>
                        <Badge variant="outline" className="font-serif">
                            {t(`summary.methods.${order.payment_method}`)}
                        </Badge>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("summary.shippingMethod")}</span>
                        <Badge variant="outline" className="font-serif">
                            {t(`summary.shippingMethods.${order.shipping_method}`)}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

/**
 * Action Buttons Component
 */
const ActionButtons = () => {
    const t = useTranslations("OrderSuccess")
    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center mt-12"
        >
            <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/products")}
                className="gap-2 font-serif"
            >
                <FaArrowLeft />
                {t("actions.continueShopping")}
            </Button>
            <Button
                size="lg"
                onClick={() => router.push("/")}
                className="gap-2 font-serif"
            >
                <FaHome />
                {t("actions.backHome")}
            </Button>
        </motion.div>
    )
}

/**
 * Main Order Success Page
 */
export default function OrderSuccessPage() {
    const params = useParams()
    const { id, locale } = params
    const supabase = createClient()
    const t = useTranslations("OrderSuccess")

    const [order, setOrder] = useState(null)
    const [orderItems, setOrderItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchOrder() {
            try {
                setLoading(true)

                // Fetch order
                const { data: orderData, error: orderError } = await supabase
                    .schema("lumanest")
                    .from("order")
                    .select("*")
                    .eq("id", id)
                    .single()

                if (orderError) throw orderError

                // Fetch order items
                const { data: itemsData, error: itemsError } = await supabase
                    .schema("lumanest")
                    .from("order_item")
                    .select("*")
                    .eq("order_id", id)

                if (itemsError) throw itemsError

                setOrder(orderData)
                setOrderItems(itemsData)
            } catch (err) {
                console.error("❌ Error fetching order:", err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchOrder()
        }
    }, [id, supabase])

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading variant="wave" size="lg" />
            </div>
        )
    }

    // Error state
    if (error || !order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen font-serif">
                <h2 className="text-2xl font-bold text-destructive mb-4 font-sans">{t("error.title")}</h2>
                <p className="text-muted-foreground">{error || t("error.notFound")}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background font-serif">
            <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SuccessHeader orderId={order.id} orderDate={order.order_date} locale={locale} />

                <OrderTimeline status={order.status} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <CustomerInfo order={order} />
                    <OrderSummaryCard order={order} />
                </div>

                <OrderItems items={orderItems} locale={locale} />

                <ActionButtons />
            </main>
        </div>
    )
}