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

  private readonly categoryUrl = '/api/categories';
  private readonly topicUrl = '/api/topics';
  private readonly lessonUrl = '/api/lessons';

  categories = signal<Category[] | undefined>(undefined);
  topics = signal<Topic[] | undefined>(undefined);
  lessons = signal<Lesson[] | undefined>(undefined);

  getCategories = () => this.http.get<Category[]>(this.categoryUrl);
  getTopics = () => this.http.get<Topic[]>(this.topicUrl);
  getLessons = () => this.http.get<Lesson[]>(this.lessonUrl);

  getCategoryById = (id: string) =>
    this.http.get<Category>(`${this.categoryUrl}/${id}`);
  getTopicById = (id: string) => this.http.get<Topic>(`${this.topicUrl}/${id}`);
  getLessonById = (id: string) =>
    this.http.get<Lesson>(`${this.lessonUrl}/${id}`);

  createCategory = (dto: Partial<Category>) =>
    this.http
      .post(this.categoryUrl, dto)
      .pipe(tap(() => this.loadCategories()));
  createTopic = (dto: Partial<Topic>) =>
    this.http.post(this.topicUrl, dto).pipe(tap(() => this.loadTopics()));
  createLesson = (dto: Partial<Lesson>) =>
    this.http.post(this.lessonUrl, dto).pipe(tap(() => this.loadLessons()));

  updateCategory = (id: string, dto: Partial<Category>) =>
    this.http
      .put(`${this.categoryUrl}/${id}`, dto)
      .pipe(tap(() => this.loadCategories()));
  updateTopic = (id: string, dto: Partial<Topic>) =>
    this.http
      .put(`${this.topicUrl}/${id}`, dto)
      .pipe(tap(() => this.loadTopics()));
  updateLesson = (id: string, dto: Partial<Lesson>) =>
    this.http
      .put(`${this.lessonUrl}/${id}`, dto)
      .pipe(tap(() => this.loadLessons()));
  updateContent = (id: string, dto: Partial<Lesson>) =>
    this.http
      .patch(`${this.lessonUrl}/${id}/content`, dto)
      .pipe(tap(() => this.loadLessons()));

  deleteCategory = (id: string) =>
    this.http
      .delete(`${this.categoryUrl}/${id}`)
      .pipe(tap(() => this.loadCategories()));
  deleteTopic = (id: string) =>
    this.http
      .delete(`${this.topicUrl}/${id}`)
      .pipe(tap(() => this.loadTopics()));
  deleteLesson = (id: string) =>
    this.http
      .delete(`${this.lessonUrl}/${id}`)
      .pipe(tap(() => this.loadLessons()));

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
