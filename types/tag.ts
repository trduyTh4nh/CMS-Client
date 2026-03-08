
export interface Tag {
    id: string;
    slug: string;
}

export interface TagResponse {
  message: string;
  statusCode: number;
  reasonStatus: string;
  metadata: Tag[];
}
