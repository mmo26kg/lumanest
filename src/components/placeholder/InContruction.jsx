"use client";
import { motion } from 'framer-motion';
import { FaHardHat, FaTools, FaCog, FaWrench } from 'react-icons/fa';
import { MdConstruction } from 'react-icons/md';
import { useTranslations } from 'next-intl';

export default function InConstruction() {
    const t = useTranslations('InConstruction');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const iconVariants = {
        animate: {
            rotate: [0, 10, -10, 10, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
            }
        }
    };

    const floatingVariants = {
        animate: (custom) => ({
            y: [0, -15, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                delay: custom * 0.3
            }
        })
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden">
            {/* Floating background icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    custom={0}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-20 left-20 text-foreground/20 opacity-30"
                >
                    <FaTools size={40} />
                </motion.div>
                <motion.div
                    custom={1}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-40 right-32 text-foreground/20 opacity-30"
                >
                    <FaCog size={50} />
                </motion.div>
                <motion.div
                    custom={2}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-32 left-40 text-foreground/20 opacity-30"
                >
                    <FaWrench size={35} />
                </motion.div>
                <motion.div
                    custom={0.5}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-20 right-20 text-foreground/20 opacity-30"
                >
                    <MdConstruction size={45} />
                </motion.div>
            </div>

            {/* Language selector */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 right-6 z-10"
            >
            </motion.div>

            {/* Main content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center justify-center max-w-2xl mx-auto px-6"
            >
                {/* Main icon with animation */}
                <motion.div
                    variants={iconVariants}
                    animate="animate"
                    className="mb-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full"></div>
                        <div className="relative bg-background p-8 rounded-2xl shadow-xl border border-border">
                            <FaHardHat className="text-primary" size={80} />
                        </div>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-center"
                >
                    {t('title')}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-foreground/80 mb-3 text-center max-w-lg"
                >
                    {t('subtitle')}
                </motion.p>

                {/* Stay tuned message */}
                <motion.p
                    variants={itemVariants}
                    className="text-base text-foreground/70 mb-8 text-center"
                >
                    {t('stayTuned')}
                </motion.p>

                {/* Progress indicator */}
                <motion.div
                    variants={itemVariants}
                    className="w-full max-w-md"
                >
                    <div className="bg-muted rounded-full shadow-inner p-1">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                            className="bg-primary h-3 rounded-full relative overflow-hidden"
                        >
                            <motion.div
                                animate={{
                                    x: ['0%', '100%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }}
                                className="absolute inset-0 w-1/3 bg-white/30"
                            />
                        </motion.div>
                    </div>
                    <motion.p
                        variants={itemVariants}
                        className="text-sm text-muted-foreground mt-3 text-center"
                    >
                        {t('progress')}
                    </motion.p>
                </motion.div>

                {/* Decorative tools icons */}
                <motion.div
                    variants={itemVariants}
                    className="flex gap-6 mt-12"
                >
                    {[FaTools, MdConstruction, FaCog, FaWrench].map((Icon, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                        >
                            <Icon size={28} />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}