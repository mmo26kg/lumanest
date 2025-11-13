'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FaGoogle, FaFacebook, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useAuth } from '@/provider/AuthProvider';

const Login = () => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Header');
    const { loginWithGoogle } = useAuth();
    const handleGoogleLogin = async () => {
        const result = await loginWithGoogle();
        if (!result.success) {
            alert(result.error || 'Đăng nhập thất bại');
        }
    }

    // const handleFacebookLogin = () => {
    //     // Implement Facebook login
    //     console.log('Facebook login clicked');
    // };

    return (
        <div className="relative inline-block text-left">
            {/* Main Login Button */}
            <button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="flex items-center gap-2 font-semibold py-2.5 px-5 rounded-lg  transition-all duration-300 transform hover:scale-105"
                aria-label="Login"
            >
                <FaUserCircle className="w-5 h-5" />
                {/* <span>{t('login')}</span> */}
                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className={`absolute right-0 font-serif mt-2 w-81 bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 transform origin-top ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                    }`}
                style={{ zIndex: 50 }}
            >
                <div className="p-3">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3 px-2">
                        {t('chooseLoginMethod') || 'Chọn phương thức đăng nhập'}
                    </p>

                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center w-full px-4 py-3 mb-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-red-500 hover:text-red-500 transition-all duration-200 group"
                        aria-label="Login with Google"
                    >
                        <div className="flex items-center justify-center w-8 h-8 bg-red-50 rounded-lg mr-3 group-hover:bg-red-100 transition-colors">
                            <FaGoogle className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="flex-1 text-left">{t('loginWithGoogle')}</span>
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Facebook Login Button */}
                    <button
                        // onClick={handleFacebookLogin}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 group"
                        aria-label="Login with Facebook"
                    >
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg mr-3 group-hover:bg-blue-100 transition-colors">
                            <FaFacebook className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="flex-1 text-left">{t('loginWithFacebook')}</span>
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Divider */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-white text-gray-400">
                                {t('secureLogin') || 'Đăng nhập an toàn'}
                            </span>
                        </div>
                    </div>

                    {/* Privacy Note */}
                    <p className="text-xs text-gray-400 text-center px-2">
                        {t('privacyNote') || 'Thông tin của bạn được bảo mật'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;