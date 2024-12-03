import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Lesson } from '../models/lesson';
import { Category } from '../models/category';
import { Topic } from '../models/topic';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly http = inject(HttpClient);

  readonly categoryUrl = '/api/categories';
  readonly topicUrl = '/api/topics';
  readonly lessonUrl = '/api/lessons';

  categories = signal<Category[] | undefined>(undefined);
  topics = signal<Topic[] | undefined>(undefined);
  lessons = signal<Lesson[] | undefined>(undefined);

  getCategories = () => this.http.get<Category[]>(this.categoryUrl);
  getTopics = () => this.http.get<Topic[]>(this.topicUrl);
  getLessons = (categoryId?: string) => {
    let params = {};
    if (categoryId) {
      params = { categoryId };
    }
    return this.http.get<Lesson[]>(this.lessonUrl, {
      params,
    });
  };

  getCategoryById = (id: string) =>
    this.http.get<Category>(`${this.categoryUrl}/${id}`);
  getTopicById = (id: string) => this.http.get<Topic>(`${this.topicUrl}/${id}`);
  getLessonById = (id: string) =>
    this.http.get<Lesson>(`${this.lessonUrl}/${id}`);

  createCategory = (dto: Partial<Category>) =>
    this.http.post(this.categoryUrl, dto);
  createTopic = (dto: Partial<Topic>) => this.http.post(this.topicUrl, dto);
  createLesson = (dto: Partial<Lesson>) => this.http.post(this.lessonUrl, dto);

  updateCategory = (id: string, dto: Partial<Category>) =>
    this.http.put(`${this.categoryUrl}/${id}`, dto);
  updateTopic = (id: string, dto: Partial<Topic>) =>
    this.http.put(`${this.topicUrl}/${id}`, dto);

  updateLesson = (id: string, dto: Partial<Lesson>) =>
    this.http.put(`${this.lessonUrl}/${id}`, dto);

  updateContent = (id: string, dto: Partial<Lesson>) =>
    this.http.patch(`${this.lessonUrl}/${id}/content`, dto);

  deleteCategory = (id: string) =>
    this.http.delete(`${this.categoryUrl}/${id}`);

  deleteTopic = (id: string) => this.http.delete(`${this.topicUrl}/${id}`);

  deleteLesson = (id: string) => this.http.delete(`${this.lessonUrl}/${id}`);

  loadCategories() {
    this.getCategories().subscribe((categories) => {
      this.categories.set(categories);
    });
  }

  loadTopics() {
    this.getTopics().subscribe((topics) => {
      this.topics.set(topics);
    });
  }

  loadLessons() {
    this.getLessons().subscribe((lessons) => {
      this.lessons.set(lessons);
    });
  }
}
