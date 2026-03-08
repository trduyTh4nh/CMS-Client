export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived"
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  convert_url: string | null;
  status: PostStatus;
  view_count: number;
  vote_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface PostResponse {
  message: string;
  statusCode: number;
  reasonStatus: string;
  metadata: Post[];
}
