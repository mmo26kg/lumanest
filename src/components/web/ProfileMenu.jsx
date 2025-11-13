'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaUser,
    FaBox,
    FaHeart,
    FaSignOutAlt,
    FaChevronDown
} from "react-icons/fa";
import { useAuth } from '@/provider/AuthProvider';

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Profile');
    const router = useRouter();
    const { user, logout } = useAuth();

    // Lấy chữ cái đầu tiên từ tên hoặc email
    const getInitial = () => {
        if (user?.user_metadata?.full_name) {
            return user.user_metadata.full_name.charAt(0).toUpperCase();
        }
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    // Lấy avatar URL hoặc null
    const avatarUrl = user?.user_metadata?.avatar_url;

    // Menu items - Chỉ dùng primary và secondary
    const menuItems = [
        {
            icon: FaBox,
            label: t('orders'),
            href: '/orders',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            hoverColor: 'hover:border-primary'
        },
        {
            icon: FaUser,
            label: t('profile'),
            href: '/profile',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            hoverColor: 'hover:border-primary'
        },
        {
            icon: FaHeart,
            label: t('wishlist'),
            href: '/wishlist',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            hoverColor: 'hover:border-primary'
        }
    ];

    const handleNavigation = (href) => {
        setIsOpen(false);
        router.push(href);
    };

    const handleLogout = async () => {
        setIsOpen(false);
        await logout();
    };

    return (
        <div className="relative inline-block text-left">
            {/* Avatar Button */}
            <button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-primary/10 transition-all duration-300"
                aria-label="User Profile"
            >
                {/* Avatar Container */}
                <div className="relative">
                    {avatarUrl ? (
                        <img
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                            src={avatarUrl}
                            alt={user?.user_metadata?.full_name || 'User'}
                            className="w-9 h-9 rounded-full object-cover border-2 border-primary/20"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center border-2 border-primary/20">
                            <span className="text-sm font-bold text-primary-foreground font-sans">
                                {getInitial()}
                            </span>
                        </div>
                    )}

                    {/* Online Indicator */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-background rounded-full" />
                </div>

                {/* Dropdown Arrow */}
                <FaChevronDown
                    className={`w-3 h-3 text-muted-foreground transition-transform duration-300 hidden md:block ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden"
                        style={{ zIndex: 50 }}
                    >
                        {/* User Info Header */}
                        <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-bold text-foreground font-sans truncate">
                                {user?.user_metadata?.full_name || t('guest')}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {user?.email}
                            </p>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            {menuItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleNavigation(item.href)}
                                        className={`flex items-center w-full px-3 py-2.5 mb-1 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-transparent rounded-lg ${item.hoverColor} hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group`}
                                    >
                                        <div className={`flex items-center justify-center w-8 h-8 ${item.bgColor} dark:bg-gray-700 rounded-lg mr-3 group-hover:scale-110 transition-transform`}>
                                            <Icon className={`w-4 h-4 ${item.color}`} />
                                        </div>
                                        <span className="flex-1 text-left font-serif">{item.label}</span>
                                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 dark:border-gray-700 mx-2" />

                        {/* Logout Button */}
                        <div className="p-2">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-500 bg-white dark:bg-gray-800 border-2 border-transparent rounded-lg hover:bg-red-50 dark:hover:bg-red-100 hover:border-red-500 transition-all duration-200 group"
                            >
                                <div className="flex items-center justify-center w-8 h-8 bg-red-50 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                                    <FaSignOutAlt className="w-4 h-4 text-red-500" />
                                </div>
                                <span className="flex-1 text-left font-serif">{t('logout')}</span>
                                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                                </svg>
                            </button>
                        </div>

                        {/* Footer Note */}
                        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-400 text-center font-serif">
                                {t('secureAccount') || 'Tài khoản được bảo mật'}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileMenu;