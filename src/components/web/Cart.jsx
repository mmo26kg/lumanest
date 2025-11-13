"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    FaShoppingBag,
    FaTimes,
    FaTrash,
    FaPlus,
    FaMinus,
} from "react-icons/fa"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "@/lib/utils"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useCart } from "@/provider/CartProvider";
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

// --- Tách biệt Data ---

/**
 * @typedef {Object} CartItemData
 * @property {string} id
 * @property {string} nameKey - Translation key for product name
 * @property {number} price
 * @property {number} quantity
 * @property {string} imageUrl
 * @property {string} altTextKey - Translation key for alt text
 */

/** @type {CartItemData[]} */
const getInitialCartData = () => [
    {
        id: "1",
        nameKey: "products.boucleSofa.name",
        price: 12500000,
        quantity: 1,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHabazBTkDbEgUiJwHciYWa7CwH0imGgXIwteFIo-Qdx7tJsIhG3EMfpexYD9x0tqZf7WFSTUYDMy-w6Z8vIeXgIYlJPsYn6WlZynmpsc5KVFtu5Mx2v3yFIq94xnPTKpxfPv6pFHH7T7jGwy0-1OjTR-uf31kNvSmfrbdL6U0kI8U_QkfBaeBnqfPeO2vOeGWHc8FvI1_YeGVJOTUpdfRjSukU1tqDWKivvetbtFBxEsfhRET8Rx8kq5YOcuxJUpVIJ_3PLaV318x",
        altTextKey: "products.boucleSofa.alt",
    },
    {
        id: "2",
        nameKey: "products.oakCoffeeTable.name",
        price: 4200000,
        quantity: 2,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgRCtSGIj067SHKGt8I8lF94QcbSVJBO2P7fkJDol7eNO6Z5mqjL5D8eCReyl7Xkf9nfCnbRgOmK3ggnGM9lZzN7XBSM5l3UpK8owIBT_8R4slx234WivTuF68-AfdUkBj8fcIJpWQ0A1TrAjQ-L7zzrcfFa5xlAbefNEHF1jaLi3Oe4mU1k9jPuZO9d5UxhGKvSyggg8d3-sdguQAMTuEHxoM6lrGnkimXMR1vGQg927LvCPfpeCh-lxnvIxHUsCuKMR9VhsIn7Uw",
        altTextKey: "products.oakCoffeeTable.alt",
    },
    {
        id: "3",
        nameKey: "products.archedFloorLamp.name",
        price: 3150000,
        quantity: 1,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtgWAYQiEg0661J8KjTbqcaLxwmPinjMm37QnqDKgi6l44Ty_QBVzfRr1VLH4vef0pUvBvGX_sCHFQWKys188P6ckP7IzCG4zI_2H03znFT2LqDrl-mumqkhis624-244cuMJZtf9xesbUT0uHF1WwOlVElVruuFfnUgFbDRWvK8e0odbbzReyXOrUJkVYjqk0Y2M5neAvGfjhKC5ET2678WXu-2PutT9ZRB1_Fy8vbMMXcdSF9TzxPCzxqkzE1PoeEEjCFEo0BWe9",
        altTextKey: "products.archedFloorLamp.alt",
    },
    {
        id: "4",
        nameKey: "products.boucleSofa.name",
        price: 12500000,
        quantity: 1,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHabazBTkDbEgUiJwHciYWa7CwH0imGgXIwteFIo-Qdx7tJsIhG3EMfpexYD9x0tqZf7WFSTUYDMy-w6Z8vIeXgIYlJPsYn6WlZynmpsc5KVFtu5Mx2v3yFIq94xnPTKpxfPv6pFHH7T7jGwy0-1OjTR-uf31kNvSmfrbdL6U0kI8U_QkfBaeBnqfPeO2vOeGWHc8FvI1_YeGVJOTUpdfRjSukU1tqDWKivvetbtFBxEsfhRET8Rx8kq5YOcuxJUpVIJ_3PLaV318x",
        altTextKey: "products.boucleSofa.alt",
    },
    {
        id: "5",
        nameKey: "products.oakCoffeeTable.name",
        price: 4200000,
        quantity: 2,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgRCtSGIj067SHKGt8I8lF94QcbSVJBO2P7fkJDol7eNO6Z5mqjL5D8eCReyl7Xkf9nfCnbRgOmK3ggnGM9lZzN7XBSM5l3UpK8owIBT_8R4slx234WivTuF68-AfdUkBj8fcIJpWQ0A1TrAjQ-L7zzrcfFa5xlAbefNEHF1jaLi3Oe4mU1k9jPuZO9d5UxhGKvSyggg8d3-sdguQAMTuEHxoM6lrGnkimXMR1vGQg927LvCPfpeCh-lxnvIxHUsCuKMR9VhsIn7Uw",
        altTextKey: "products.oakCoffeeTable.alt",
    },
    {
        id: "6",
        nameKey: "products.archedFloorLamp.name",
        price: 3150000,
        quantity: 1,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtgWAYQiEg0661J8KjTbqcaLxwmPinjMm37QnqDKgi6l44Ty_QBVzfRr1VLH4vef0pUvBvGX_sCHFQWKys188P6ckP7IzCG4zI_2H03znFT2LqDrl-mumqkhis624-244cuMJZtf9xesbUT0uHF1WwOlVElVruuFfnUgFbDRWvK8e0odbbzReyXOrUJkVYjqk0Y2M5neAvGfjhKC5ET2678WXu-2PutT9ZRB1_Fy8vbMMXcdSF9TzxPCzxqkzE1PoeEEjCFEo0BWe9",
        altTextKey: "products.archedFloorLamp.alt",
    },
]

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

/**
 * @param {{ 
 * item: CartItemData, 
 * onQuantityChange: (id: string, quantity: number) => void, 
 * onRemove: (id: string) => void 
 * }} props
 */
const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const t = useTranslations("Cart")
    const locale = useLocale();
    const nameField = locale === 'vi' ? 'name_vi' : 'name_en';
    const itemTotal = item.price * item.quantity

    const handleQtyChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10)
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            onQuantityChange(item.id, newQuantity)
        }
    }

    const handleIncrease = () => {
        onQuantityChange(item.id, item.quantity + 1)
    }

    const handleDecrease = () => {
        if (item.quantity > 0) {
            onQuantityChange(item.id, item.quantity - 1)
        }
    }


    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
            className="flex gap-4 p-6 mb-2"
        >
            <div className="shrink-0 w-24 h-24">
                {/* Image */}
                <AspectRatio ratio={3 / 4} className="rounded-lg overflow-hidden">
                    <img
                        src={item.imageUrl}
                        alt={item[nameField]}
                        className="object-cover w-full h-full"
                    />
                </AspectRatio>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                    <p className="font-medium leading-normal font-sans text-foreground">
                        {item[nameField]}
                    </p>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-red-500"
                        onClick={() => onRemove(item.id)}
                        aria-label={t("actions.removeProduct")}
                    >
                        <FaTrash className="text-xl" />
                    </Button>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                    <p className="text-sm font-normal leading-normal text-muted-foreground">
                        {formatCurrency(item.price)}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                        {/* Quantity Control */}
                        <div className="flex items-center gap-2 text-foreground">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-full"
                                onClick={handleDecrease}
                                aria-label={t("actions.decreaseQuantity")}
                            >
                                <FaMinus />
                            </Button>
                            <Input
                                type="number"
                                className="h-7 w-8 border-none bg-transparent p-0 text-center text-base font-medium focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                value={item.quantity}
                                onChange={handleQtyChange}
                                aria-label={t("actions.quantity")}
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-full"
                                onClick={handleIncrease}
                                aria-label={t("actions.increaseQuantity")}
                            >
                                <FaPlus />
                            </Button>
                        </div>
                        {/* Item Total Price */}
                        <p className="text-right text-base font-medium text-foreground">
                            {formatCurrency(itemTotal)}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

/**
 * @param {{ itemCount: number }} props
 */
const CartHeader = ({ itemCount }) => {
    const t = useTranslations("Cart")

    return (
        <SheetHeader className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FaShoppingBag className="text-foreground text-2xl" />
                    <SheetTitle className="text-[24px] font-bold font-sans leading-tight tracking-tight text-foreground">
                        {t("title", { count: itemCount })}
                    </SheetTitle>
                </div>
                <SheetClose asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        aria-label={t("actions.closeCart")}
                    >
                        <FaTimes className="text-xl" />
                    </Button>
                </SheetClose>
            </div>
        </SheetHeader>
    )
}

/**
 * @param {{ subtotal: number }} props
 */
const CartFooter = ({ subtotal }) => {
    const t = useTranslations("Cart")

    return (
        <SheetFooter className="px-6 py-4">
            <div className="w-full space-y-4">
                <div className="flex justify-between gap-x-6">
                    <p className="text-base font-medium leading-normal text-muted-foreground">
                        {t("subtotal")}
                    </p>
                    <p className="text-right text-lg font-bold leading-normal text-foreground">
                        {formatCurrency(subtotal)}
                    </p>
                </div>
                <SheetClose asChild>
                    <Link href="/checkout">
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            {t("checkout")}
                        </Button>
                    </Link>
                </SheetClose>
            </div>
        </SheetFooter>
    )
}

/**
 * Empty Cart View Component
 */
const EmptyCartView = () => {
    const t = useTranslations("Cart")

    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="mb-6"
            >
                <FaShoppingBag className="text-muted-foreground text-6xl" />
            </motion.div>
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold font-sans text-foreground mb-2"
            >
                {t("emptyCart.title")}
            </motion.h3>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground mb-6 font-serif"
            >
                {t("emptyCart.description")}
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <SheetClose asChild>
                    <Link href="/products">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            {t("emptyCart.continueShopping")}
                        </Button>
                    </Link>
                </SheetClose>
            </motion.div>
        </div>
    )
}

// --- Component Chính (Sheet Content) ---

/**
 * @param {{ 
 * cartItems: CartItemData[], 
 * onQuantityChange: (id: string, quantity: number) => void, 
 * onRemove: (id: string) => void, 
 * subtotal: number 
 * }} props
 */
const CartContent = ({
    cartItems,
    onQuantityChange,
    onRemove,
    subtotal,
}) => {
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <SheetContent className="flex w-full max-w-md flex-col p-0 font-serif">
            <CartHeader itemCount={itemCount} />
            <Separator />

            {cartItems.length === 0 ? (
                <EmptyCartView />
            ) : (
                <>
                    <ScrollArea className="flex-1 max-h-[calc(100vh-280px)]">
                        <div className="flex flex-col divide-border">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onQuantityChange={onQuantityChange}
                                        onRemove={onRemove}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </ScrollArea>

                    <Separator />
                    <CartFooter subtotal={subtotal} />
                </>
            )}
        </SheetContent>
    )
}

// --- Component Page (Wrapper) ---
// Đây là component bạn sẽ import vào page của Next.js

// ...existing code...

export default function ShoppingCartButton() {
    const t = useTranslations("Cart")
    const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart()

    const handleQuantityChange = (id, quantity) => {
        updateQuantity(id, quantity)
    }

    const handleRemoveItem = (id) => {
        removeFromCart(id)
    }

    return (
        <div className="relative">
            {/* Nút để mở giỏ hàng */}
            <Sheet>
                <SheetTrigger asChild>
                    <motion.button
                        className="relative p-2 text-foreground hover:bg-primary/10 rounded-full transition-colors"
                        aria-label={t("buttonLabel")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaShoppingBag className="w-4 h-4 md:w-5 md:h-5" />

                        {/* Badge số lượng */}
                        {totalItems > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-background font-serif border-primary border-2 text-xs font-bold"
                            >
                                {totalItems > 99 ? '99+' : totalItems}
                            </motion.span>
                        )}
                    </motion.button>
                </SheetTrigger>

                {/* Nội dung giỏ hàng */}
                <CartContent
                    cartItems={cart}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    subtotal={totalPrice}
                />
            </Sheet>
        </div>
    )
}