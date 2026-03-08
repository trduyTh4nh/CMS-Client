// app/layout.tsx - ROOT LAYOUT (mới)
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const sharpGrotesk = localFont({
    src: [
        {
            path: "./fonts/SharpGrotesk-Thin20.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "./fonts/SharpGrotesk-Light20.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/SharpGrotesk-Medium20.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "./fonts/SharpGrotesk-SemiBold20.otf",
            weight: "600",
            style: "normal",
        },
        {
            path: "./fonts/SharpGrotesk-Bold20.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-grotesk",
    display: "swap",
});

export const metadata: Metadata = {
    title: "CMS System",
    description: "Modern Content Management System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            suppressHydrationWarning
            lang="en"
        >
            <body
                className={sharpGrotesk.className}
            >
                {children}
            </body>
        </html>
    );
}