"use client";
import { useEffect } from "react";

type Props = {
    content: string;
};

export default function PostContent({ content }: Props) {
    useEffect(() => {
        const headings = document.querySelectorAll(
            ".post-content h2, .post-content h3"
        );

        headings.forEach((el, index) => {
            if (!el.id) {
                el.id =
                    el.textContent
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]/g, "") +
                    "-" +
                    index;
            }
        });
    }, []);

    return (
        <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
