export interface Message {
  id: string;
  user: string;
  message: string;
  createdAt: Date;
}

export interface CreateMessageDto {
  user: string;
  message: string;
}

export interface MessageFilter {
  user?: string;
  message?: string;
  page?: number;
  limit?: number;
}
