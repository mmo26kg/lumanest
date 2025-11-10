"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

const DURATION = 5000 // ms
const BAR_WIDTH = 50
const CIRCLE_SIZE = 12

export default function Testimonials() {
    const t = useTranslations("Testimonials")
    const [index, setIndex] = useState(0)
    const timeoutRef = useRef(null)

    // only metadata (avatars) kept in code; text comes from translations
    const testimonialsMeta = [
        { avatar: "/lumanest-logo-dark.png" },
        { avatar: "/lumanest-logo-dark.png" },
        { avatar: "/lumanest-logo-dark.png" },
        { avatar: "/lumanest-logo-dark.png" },
    ]

    useEffect(() => {
        const intervalRef = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonialsMeta.length)
        }, DURATION)

        return () => {
            clearInterval(intervalRef)
        }
    }, []) // Dependency array rỗng OK với setInterval

    return (
        <section className="section-padding-y bg-background relative flex flex-col items-center">
            <div className="flex w-full max-w-5xl flex-col items-center justify-center px-4">
                <div className="min-h-[120px] w-full">
                    <AnimatePresence mode="wait">
                        <motion.blockquote
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="text-foreground mb-8 text-center text-2xl leading-tight font-semibold md:text-4xl"
                        >
                            “{t(`testimonials.${index}.quote`)}”
                        </motion.blockquote>
                    </AnimatePresence>
                </div>

                <div className="flex w-full max-w-lg font-serif items-center justify-center gap-8 pt-8">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, filter: "blur(8px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(8px)" }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="flex items-center gap-4"
                        >
                            <Image
                                src={testimonialsMeta[index].avatar}
                                alt={t(`testimonials.${index}.avatarAlt`)}
                                width={48}
                                height={48}
                                className="bg-foreground/10 h-12 w-12 rounded-full border object-cover"
                            />
                            <div className="border-muted-foreground/30 mx-4 h-8 border-l" />
                            <div className="text-left">
                                <div className="text-secondary text-xl font-bold ">
                                    {t(`testimonials.${index}.name`)}
                                </div>
                                <div className="text-muted-foreground text-base">
                                    {t(`testimonials.${index}.role`)}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Bar & Circles Indicator */}
                <div className="mx-auto mt-8 flex w-full max-w-lg justify-center gap-3">
                    {testimonialsMeta.map((_, i) => {
                        const isActive = i === index
                        return (
                            <motion.span
                                key={`testimonial-${i}`}
                                layout
                                initial={false}
                                animate={{
                                    width: isActive ? BAR_WIDTH : CIRCLE_SIZE,
                                    height: CIRCLE_SIZE,
                                    borderRadius: isActive ? 8 : 999,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    duration: 0.4,
                                }}
                                className="bg-foreground/10 relative block overflow-hidden"
                                style={{
                                    minWidth: CIRCLE_SIZE,
                                    maxWidth: BAR_WIDTH,
                                    border: "none",
                                }}
                            >
                                {isActive && (
                                    <motion.div
                                        key={i}
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        exit={{ width: 0 }}
                                        transition={{ duration: DURATION / 1000, ease: "linear" }}
                                        className="bg-primary absolute top-0 left-0 h-full rounded-lg"
                                    />
                                )}
                            </motion.span>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}