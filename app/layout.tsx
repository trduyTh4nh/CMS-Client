// app/layout.tsx - ROOT LAYOUT (mới)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin", "vietnamese"],
    variable: "--font-inter",
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
            lang="en" className={inter.variable}>
            <body className="font-sans antialiased">
                {children}
            </body>
        </html>
    );
}