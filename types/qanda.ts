export interface Qanda {
  id: string;
  title: string;
  content: string;
  view_count: number;
  vote_count: number;
  created_at: string;
  updated_at: string;
}

export interface QandaResponse {
  message: string;
  statusCode: number;
  reasonStatus: string;
  metadata: Qanda[];
}

export interface DetailQandaResponse {
  message: string;
  statusCode: number;
  reasonStatus: string;
  metadata: Qanda;
}
