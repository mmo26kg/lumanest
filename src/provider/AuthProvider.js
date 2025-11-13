'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const AuthContext = createContext(undefined)

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {Object} user_metadata
 * @property {string} [user_metadata.full_name]
 * @property {string} [user_metadata.avatar_url]
 */

/**
 * @typedef {Object} AuthContextValue
 * @property {User | null} user
 * @property {boolean} loading
 * @property {boolean} isAuthenticated
 * @property {(email: string, password: string, fullName?: string) => Promise<{success: boolean, error?: string}>} register
 * @property {(email: string, password: string) => Promise<{success: boolean, error?: string}>} login
 * @property {() => Promise<{success: boolean, error?: string}>} loginWithGoogle
 * @property {() => Promise<{success: boolean, error?: string}>} logout
 */

export function AuthProvider({ children }) {
    const supabase = createClient()
    const router = useRouter()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Computed value
    const isAuthenticated = !!user

    /**
     * Lấy thông tin user hiện tại
     */
    const fetchUser = async () => {
        try {
            const { data: { user: currentUser }, error } = await supabase.auth.getUser()

            if (error) throw error

            setUser(currentUser)
        } catch (error) {
            console.error('❌ Error fetching user:', error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    /**
     * Đăng ký tài khoản mới
     * @param {string} email
     * @param {string} password
     * @param {string} [fullName]
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    const register = async (email, password, fullName = '') => {
        try {
            setLoading(true)

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                }
            })

            if (error) throw error

            console.log('✅ Registration successful:', data)

            // Supabase sẽ gửi email xác nhận
            // User cần xác nhận email trước khi đăng nhập
            return {
                success: true,
                message: 'Vui lòng kiểm tra email để xác nhận tài khoản'
            }

        } catch (error) {
            console.error('❌ Registration error:', error)
            return {
                success: false,
                error: error.message
            }
        } finally {
            setLoading(false)
        }
    }

    /**
     * Đăng nhập bằng email/password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    const login = async (email, password) => {
        try {
            setLoading(true)

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            setUser(data.user)
            console.log('✅ Login successful:', data.user)

            return {
                success: true
            }

        } catch (error) {
            console.error('❌ Login error:', error)
            return {
                success: false,
                error: error.message
            }
        } finally {
            setLoading(false)
        }
    }

    /**
     * Đăng nhập bằng Google OAuth
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    const loginWithGoogle = async () => {
        try {
            setLoading(true)

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    }
                }
            })

            if (error) throw error

            console.log('✅ Google OAuth initiated:', data)

            return {
                success: true
            }

        } catch (error) {
            console.error('❌ Google login error:', error)
            return {
                success: false,
                error: error.message
            }
        } finally {
            setLoading(false)
        }
    }

    /**
     * Đăng xuất
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    const logout = async () => {
        try {
            setLoading(true)

            const { error } = await supabase.auth.signOut()

            if (error) throw error

            setUser(null)
            console.log('✅ Logout successful')

            // Redirect về trang chủ
            router.push('/')

            return {
                success: true
            }

        } catch (error) {
            console.error('❌ Logout error:', error)
            return {
                success: false,
                error: error.message
            }
        } finally {
            setLoading(false)
        }
    }

    // Lắng nghe thay đổi auth state
    useEffect(() => {
        // Fetch user khi mount
        fetchUser()

        // Subscribe to auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('🔄 Auth state changed:', event)

                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    setUser(session?.user ?? null)
                } else if (event === 'SIGNED_OUT') {
                    setUser(null)
                }

                setLoading(false)
            }
        )

        // Cleanup subscription
        return () => {
            subscription.unsubscribe()
        }
    }, [supabase])

    const value = {
        user,
        loading,
        isAuthenticated,
        register,
        login,
        loginWithGoogle,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

/**
 * Hook để sử dụng AuthContext
 * @returns {AuthContextValue}
 */
export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}