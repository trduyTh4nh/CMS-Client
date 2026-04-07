// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import StoreProvider from "@/lib/store/StoreProvider";
import ThemeSync from "@/widget/components/ThemeSync";

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
            <head>
                {
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
                        }}
                    />
                }

            </head>
            <body
                className={sharpGrotesk.className}
            >
                <StoreProvider>
                    <ThemeSync />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}