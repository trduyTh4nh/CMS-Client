import { RolesConstant } from "@/consts/UI.constant";
import Link from "next/link";


export default function Header({ user }: { user: any }) {
    console.log("Header user:", user);
    var isAuthenticated = user != null;



    return (
        <header className="flex justify-between p-4 border-b">
            <div>DevForge</div>

            {user ? (
                <div className="flex gap-4">
                    <Link href="/">Home</Link>
                    <Link href="/post">Post</Link>
                    <Link href="/qanda">Q&A</Link>
                    {isAuthenticated && user.role === RolesConstant.ADMIN && (
                        <Link href="/banner">Banner</Link>
                    )}
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link href="/login">Login</Link>
                    <Link href="/register">Signup</Link>
                </div>
            )}
        </header>
    );
}
