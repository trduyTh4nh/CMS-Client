import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { getUser } from "@/lib/auth";
import AdminGuard from "@/widget/admin/AdminGuard";
import Header from "@/widget/public/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Administration panel",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getUser();

    return (
        <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50`}>
            <AdminGuard user={user}>
                <div className="flex">
                    <div className="flex-1 flex flex-col">
                        <Header headerType="admin" user={user} />
                        <main className="flex-1 container mx-auto px-4 py-8">
                            {children}
                        </main>
                    </div>
                </div>
            </AdminGuard>
        </div>
    );
};

export default AdminLayout;