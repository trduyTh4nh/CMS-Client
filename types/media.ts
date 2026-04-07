export interface Media {
  id: string;
  url: string;
  post_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface MediaResponse {
  message: string;
  statusCode: number;
  reasonStatus: string;
  metadata: Media[];
}
