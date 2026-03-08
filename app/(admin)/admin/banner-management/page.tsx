
"use client";
import { useState } from "react";

const BannerPage = () => {
    const [formData, setFormData] = useState({
        post_id: "",
        url: ""
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Handle form submission logic here
        const res = await fetch("/api/banner", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            // Reset form or show success message
            setFormData({ post_id: "", url: "" });
        }
    };
    return (
        <div className="p-4">
            <h1>Add Banner</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={formData.post_id}
                    onChange={(e) =>
                        setFormData({ ...formData, post_id: e.target.value })
                    }
                    placeholder="Post Id"
                    className="border p-2 w-full mb-4"
                />

                <input
                    type="text"
                    value={formData.url}
                    onChange={(e) =>
                        setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="Banner URL"
                    className="border p-2 w-full mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Banner</button>
            </form>
        </div>)
};

export default BannerPage;