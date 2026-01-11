export enum CommentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface Comment {
  id: string;
  content: string;
  status: CommentStatus;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CommentResponse {
  message: string;
  statusCode: number;
  reasonStatus: string;
  metadata: Comment[];
}
