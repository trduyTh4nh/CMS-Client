// app/(public)/layout.tsx - PUBLIC LAYOUT (sửa lại)
import type { Metadata } from "next";
import { getUser } from "@/lib/auth";
import Header from "@/widget/public/homeWidget/Header";

export const metadata: Metadata = {
  title: "Devforge",
  description: "Public website",
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Header headerType="user" user={user} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}