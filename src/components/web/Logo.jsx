'use client';
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

const Logo = () => {
    const t = useTranslations("Header");
    const pathname = usePathname();

    const menuItems = [
        { href: "/", label: "home" },
        { href: "/products", label: "products" },
        { href: "/category", label: "category" },
        { href: "/about", label: "about" },
        { href: "/contacts", label: "contacts" }
    ];

    const isActive = (path) => pathname === path;

    return (
        <nav className="flex text-primary font-light space-x-8 text-lg">
            {menuItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors ${isActive(item.href)
                        ? 'font-bold text-primary border-b-2 border-primary'
                        : 'hover:text-primary/80'
                        }`}
                >
                    {t(item.label)}
                </Link>
            ))}
        </nav>
    );
};

export default Logo;