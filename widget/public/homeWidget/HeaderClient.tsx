'use client';

import { useEffect, useState } from "react";
import Logo from "./Logo";
import HeaderNavClient from "./HeaderNavClient";

export default function HeaderClient({ topics, user, headerType }: any) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 300);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between 
                transition-all duration-300 
                ${scrolled ? "bg-white/70 backdrop-blur-md border-b-2 border-black" : "bg-transparent"
                }`}
        >
            <Logo />
            <HeaderNavClient
                scrolled={scrolled}
                topics={topics}
                isAdmin={headerType === "admin"}
                isAuthenticated={!!user}
            />
        </header>
    );
}