export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: string;
  created_by: string;
  updated_by: string;
}

export interface TopicResponse {
  message: string;
  statusCode: number;
  reasonStatus: string;
  metadata: Topic[];
}
