"use client";

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
        <form onSubmit={handleSubmit} className="p-4">
            <input
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">Login</button>
        </form>
    );
}
