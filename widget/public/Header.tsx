import { RolesConstant } from "@/consts/UI.constant";
import Link from "next/link";


export default function Header({ user, headerType }: { user: any, headerType?: string }) {
    console.log("Header user:", user);
    var isAuthenticated = user != null;
    return (
        headerType != null && headerType !== "admin" ? (
            <header className="flex justify-between p-4 border-b">
                <div>DevForge</div>
                {user ? (
                    <div className="flex gap-4">
                        <Link href="/">Home</Link>
                        <Link href="/post">Post</Link>
                        <Link href="/qanda">Q&A</Link>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link href="/login">Login</Link>
                        <Link href="/register">Signup</Link>
                    </div>
                )}
            </header>
        ) : (
            <header className="flex justify-between p-4 border-b">
                <div>DevForge Admin</div>
                {user ? (
                    <div className="flex gap-4">
                        <Link href="/">Home</Link>
                        <Link href="/post">Post</Link>
                        <Link href="/qanda">Q&A</Link>
                        <Link href="/admin/banner-management">Banner</Link>
                        <Link href="/admin/post-management">Post</Link>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link href="/login">Login</Link>
                        <Link href="/register">Signup</Link>
                    </div>
                )}
            </header>
        )

    );
}
