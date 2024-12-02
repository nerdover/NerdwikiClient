import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private readonly _sessionCaches = new Map<string, HttpResponse<unknown>>();

  getSessionCacheByKey(key: string) {
    return this._sessionCaches.get(key);
  }

  setSessionCacheByKey(key: string, response: HttpResponse<unknown>) {
    this._sessionCaches.set(key, response);
  }

  removeSessionCacheByKey(key: string) {
    this._sessionCaches.delete(key);
  }

  clearSessionCaches() {
    this._sessionCaches.clear();
  }
}
