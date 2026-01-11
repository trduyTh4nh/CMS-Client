"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(form),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (res.ok) window.location.href = "/";
    };

    return (
        // <form onSubmit={handleSubmit} className="p-4">
        //     <input
        //         placeholder="Email"
        //         onChange={(e) => setForm({ ...form, email: e.target.value })}
        //     />
        //     <input
        //         placeholder="Password"
        //         type="password"
        //         onChange={(e) => setForm({ ...form, password: e.target.value })}
        //     />
        //     <button type="submit">Login</button>
        // </form>
        <div className="login-page w-full h-[90vh] flex justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>

        </div>
    );
}
