import { Category } from "./category";
import { Topic } from "./topic";

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
  category?: Category;
  topic?: Topic;
}
