"use client";

import { usePathname } from "next/navigation";

interface LogoProps {
    className?: string;

}

const Logo = ({ className }: LogoProps) => {

    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const linkColor = isHomePage ? "text-white" : "text-black";

    return (<div className="font-bold">
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold italic shadow-[0_0_15px_rgba(37,99,235,0.4)]">DF</div>
            <span className={`text-xl font-black tracking-tighter ${linkColor}`}>DEV<span className="text-blue-500">FORGE</span></span>
        </div>
    </div>)
}

export default Logo;