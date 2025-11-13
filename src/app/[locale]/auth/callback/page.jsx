'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Loading } from '@/components/ui/loading'

export default function AuthCallbackPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()
    const [status, setStatus] = useState('processing')

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const code = searchParams.get('code')
                const error = searchParams.get('error')
                const errorDescription = searchParams.get('error_description')

                // Check for OAuth errors
                if (error) {
                    console.error('❌ OAuth error:', error, errorDescription)
                    router.push(`/auth/error?error=${encodeURIComponent(errorDescription || error)}`)
                    return
                }

                // Check if user is already authenticated
                const { data: { session } } = await supabase.auth.getSession()

                if (session) {
                    console.log('✅ Already authenticated, redirecting...')
                    setStatus('success')
                    router.push('/')
                    return
                }

                // Exchange code if available
                if (code) {
                    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

                    if (exchangeError) {
                        console.error('❌ Exchange error:', exchangeError)
                        router.push(`/auth/error?error=${encodeURIComponent(exchangeError.message)}`)
                        return
                    }

                    console.log('✅ Authentication successful')
                    setStatus('success')
                    router.push('/')
                    return
                }

                // No code and no session - redirect to home
                console.warn('⚠️ No code or session, redirecting to home')
                router.push('/')

            } catch (err) {
                console.error('❌ Callback error:', err)
                setStatus('error')
                router.push(`/auth/error?error=${encodeURIComponent(err.message)}`)
            }
        }

        handleCallback()
    }, [searchParams, supabase, router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-serif">
            <Loading variant="wave" size="lg" />
            <p className="text-muted-foreground">
                {status === 'processing' && 'Đang xử lý đăng nhập...'}
                {status === 'success' && '✅ Đăng nhập thành công! Đang chuyển hướng...'}
                {status === 'error' && '❌ Có lỗi xảy ra...'}
            </p>
        </div>
    )
}