'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export default function AuthErrorPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const t = useTranslations('Auth')

    // Lấy error message từ URL params (nếu có)
    const errorMessage = searchParams.get('error') ||
        searchParams.get('error_description') ||
        t('error.defaultMessage')

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 font-serif">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card>
                    <CardHeader className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="mx-auto mb-4"
                        >
                            <FaExclamationTriangle className="text-destructive text-6xl" />
                        </motion.div>
                        <CardTitle className="text-2xl font-sans">
                            {t('error.title')}
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                            {t('error.subtitle')}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                            <p className="text-sm text-destructive font-medium">
                                {errorMessage}
                            </p>
                        </div>

                        <div className="text-sm text-muted-foreground space-y-2">
                            <p className="font-semibold">{t('error.possibleReasons')}</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>{t('error.reasons.invalidCredentials')}</li>
                                <li>{t('error.reasons.emailNotVerified')}</li>
                                <li>{t('error.reasons.accountBlocked')}</li>
                                <li>{t('error.reasons.networkIssue')}</li>
                            </ul>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button
                            onClick={() => router.push('/login')}
                            className="w-full gap-2"
                        >
                            <FaArrowLeft />
                            {t('error.tryAgain')}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/')}
                            className="w-full gap-2"
                        >
                            <FaHome />
                            {t('error.backHome')}
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}