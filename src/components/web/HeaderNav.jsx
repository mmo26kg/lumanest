'use client';
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const HeaderNav = () => {
    return (
        <div className="flex items-center gap-4">
            <DesktopNav />
            <MobileNav />
        </div>
    );
};

export default HeaderNav;
