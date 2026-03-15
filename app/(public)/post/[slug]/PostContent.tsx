"use client";
import { useEffect, useRef } from "react";
import "./post-content.css";
import { updateViewCount } from "@/services/post.service";

type Props = {
    content: string;
    postId: string;
};

export default function PostContent({ content, postId }: Props) {
    const contentRef = useRef<HTMLDivElement>(null);
    const hasTracked = useRef(false);

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

    useEffect(() => {
        const isShortContent = contentRef.current?.offsetHeight && window.innerHeight >= contentRef.current.offsetHeight;
        if (isShortContent) {
            if (!hasTracked.current) {
                hasTracked.current = true;
                handleViewed();
            }
        } else {
            const handleScroll = () => {
                if (hasTracked.current || !contentRef.current) return;

                const rect = contentRef.current.getBoundingClientRect();
                const isEndVisible = rect.bottom <= window.innerHeight + 100;

                if (isEndVisible) {
                    hasTracked.current = true;
                    handleViewed();
                }
            };
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const handleViewed = async () => {
        if (!postId) return;
        await updateViewCount(postId);
    }

    return (
        <div
            ref={contentRef}
            className="post-content"
            style={{ fontFamily: "system-ui" }}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}