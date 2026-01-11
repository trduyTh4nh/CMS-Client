"use client";

import { string } from "zod";

import "./comment.css"
import { Comment } from "@/types/comment";



type Props = {
    comments: Comment[];
}

export default function CommentList({ comments }: Props) {

    return (<div className="comment-list">
        <h3>Comments ({comments.length})</h3>

        {comments.map((c) => (
            <div key={c.id} className="comment-item">
                <p className="comment-author">{c.user.name}</p>
                <p className="comment-content">{c.content}</p>
                <span className="comment-date">
                    {new Date(c.created_at).toLocaleString()}
                </span>
            </div>
        ))}
    </div>)
}