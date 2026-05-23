"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavigationMenuContent, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { ChevronUp } from "lucide-react"
import DarkModeToggle from "./DarkModeToggle";
import { Topic } from "@/types/topic";

type Props = {
    isAdmin: boolean;
    isAuthenticated: boolean;
    topics: Topic[];
    scrolled: boolean;
}


export default function HeaderNavClient({
    isAdmin,
    isAuthenticated,
    topics,
    scrolled
}: Props) {

    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const linkColor = isHomePage ? (scrolled ? "text-black" : "text-white") : "text-black";

    return (
        <NavigationMenu >
            <NavigationMenuList >
                {!isAdmin && isAuthenticated && (
                    <>
                        <NavItem >
                            <DarkModeToggle />
                        </NavItem>
                        <NavItem className={linkColor} href="/">Home</NavItem>
                        <NavItemSelected className={linkColor} topics={topics} href="/topics">Topics</NavItemSelected>
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

function NavItemSelected({ href, children, className, topics }: { href: string; children: React.ReactNode; className?: string, topics: Topic[] }) {
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
                    {topics.map((topic: Topic) => (
                        <ListItem
                            key={topic.id}
                            title={topic.name}
                            href={`/topic/${topic.slug}`}
                        >
                            {topic.description}
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
