export interface Lesson {
  id: string;
  title: string;
  content: string;
  categoryId?: string;
  topicId?: string;
  description?: string;
  cover?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
