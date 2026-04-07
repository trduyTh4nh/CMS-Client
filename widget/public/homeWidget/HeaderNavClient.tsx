"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavigationMenuContent, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { ChevronUp } from "lucide-react"
import { set } from "zod";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toggleDarkMode } from "@/lib/store/slices/uiSlice";
import DarkModeToggle from "./DarkModeToggle";


const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]


export default function HeaderNavClient({
    isAdmin,
    isAuthenticated,
}: {
    isAdmin: boolean;
    isAuthenticated: boolean;
}) {

    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const linkColor = isHomePage ? "text-white" : "text-black";
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {!isAdmin && isAuthenticated && (
                    <>
                        <NavItem>
                            <DarkModeToggle />
                        </NavItem>
                        <NavItem className={linkColor} href="/">Home</NavItem>
                        <NavItemSelected className={linkColor} href="/topics">Topics</NavItemSelected>
                        <NavItem className={linkColor} href="/post">Post</NavItem>
                        <NavItem className={linkColor} href="/qanda">Q&A</NavItem>
                    </>
                )}

                {isAdmin && isAuthenticated && (
                    <>
                        <NavItem className={linkColor} href="/admin/banner-management">Banner</NavItem>
                        <NavItem className={linkColor} href="/admin/post-management">Post</NavItem>
                    </>
                )}

                {!isAuthenticated && (
                    <>
                        <NavItem className={linkColor} href="/login">Login</NavItem>
                        <NavItem className={linkColor} href="/register">Signup</NavItem>
                    </>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function NavItem({ href, children, className }: { href?: string; children: React.ReactNode; className?: string }) {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink
                asChild
                className={`font-medium cursor-pointer ${className || ""}`}
            >
                <Link href={href || "#"}>{children}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}

function NavItemSelected({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
    const [isUp, setIsUp] = useState(false);
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger
                onMouseLeave={() => {
                    setIsUp(false);
                }}
                onMouseOver={() => {
                    setIsUp(true);
                }} className={`font-medium cursor-pointer ${className || ""}`}>
                <div className="flex items-center gap-1">
                    {children}
                    <ChevronUp className={`size-4 transition-transform duration-300 ${isUp ? 'rotate-0' : 'rotate-180'}`} />
                </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                        <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                        >
                            {component.description}
                        </ListItem>
                    ))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
}


function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{title}</div>
                        <div className="text-muted-foreground line-clamp-2">{children}</div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
