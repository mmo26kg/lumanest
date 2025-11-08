"use client";
import { Link } from "@/i18n/navigation";
import HeaderNav from "./HeaderNav";
import HeaderActions from "./HeaderActions";
import { useState } from "react";
import { useTheme } from "next-themes";

const Header = () => {
    const [isHomeHeader, setIsHomeHeader] = useState(false);
    const { theme, setTheme } = useTheme();


    return (
        <header className={`sticky top-0 z-50 
            ${!isHomeHeader
                ? "bg-linear-to-b from-background/20 to-background/0   backdrop-blur-xs bg-transparent lg:px-0 "
                : ""}`}>
            <div className="max-w-6xl mx-auto ">
                <div className="flex items-center px-4 lg:px-0 py-2">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex order-1 lg:mr-auto items-center gap-2 text-xl md:text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
                    >
                        {
                            theme === 'dark' ? (
                                <img
                                    src="/lumanest-logo-dark.png"
                                    alt="Lumanest Logo"
                                    className="h-7 md:h-8 w-auto"
                                />
                            ) : <img
                                src="/lumanest-logo-light.png"
                                alt="Lumanest Logo"
                                className="h-7 md:h-8 w-auto"
                            />

                        }

                        <span className="hidden sm:inline tracking-tighter  font-medium text-foreground">Lumanest</span>
                    </Link>

                    {/* Navigation - Desktop */}
                    <div className="order-4 lg:mx-auto lg:order-2">
                        <HeaderNav />

                    </div>

                    {/* Action Buttons */}
                    <div className="order-3 mx-auto lg:ml-auto lg:mx-0 ">
                        <HeaderActions />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;