"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  content: string;
};

export default function Toc({ content }: Props) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const container = document.createElement("div");
    container.innerHTML = content;

    const elements = Array.from(
      container.querySelectorAll("h2, h3")
    );

    const parsed = elements.map((el, index) => {
      const text = el.textContent || "";
      const level = Number(el.tagName.replace("H", ""));
      const id =
        el.id ||
        text
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") +
        "-" +
        index;

      return { id, text, level };
    });

    setHeadings(parsed);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc">
      <p className="toc-title">On this page</p>
      <ul>
        {headings.map((h) => (
          <li
            key={h.id}
            className={`toc-item level-${h.level}`}
          >
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
