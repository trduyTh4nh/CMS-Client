export interface Media {
  id: string;
  url: string;
}

export interface MediaResponse {
  message: string;
  statusCode: number;
  reasonStatus: string;
  metadata: Media[];
}
