import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import { inject } from '@angular/core';
import { finalize, of, tap } from 'rxjs';
import { ContentService } from '../services/content.service';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  if (req.method !== 'GET') {
    const contentService = inject(ContentService);
    cacheService.clearSessionCaches();

    return next(req).pipe(
      finalize(() => {
        if (req.url.startsWith(contentService.categoryUrl)) {
          contentService.loadCategories();
        } else if (req.url.startsWith(contentService.topicUrl)) {
          contentService.loadTopics();
        } else if (req.url.startsWith(contentService.lessonUrl)) {
          contentService.loadLessons();
        }
      })
    );
  }

  const cachedResponse = cacheService.getSessionCacheByKey(req.urlWithParams);

  if (cachedResponse) {
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        cacheService.setSessionCacheByKey(req.urlWithParams, event);
      }
    })
  );
};
