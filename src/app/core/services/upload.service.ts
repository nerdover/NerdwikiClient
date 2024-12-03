import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly http = inject(HttpClient);

  upload(file: File) {
    let formData = new FormData();
    formData.append('image', file);
    return this.http.post<string>('api/upload', formData);
  }
}
