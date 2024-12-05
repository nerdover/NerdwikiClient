import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/th';

dayjs.extend(relativeTime);

dayjs.locale('th');

@Injectable({
  providedIn: 'root',
})
export class RelativeTimeService {
  formatRelativeTime(date: Date): string {
    return dayjs(date).fromNow();
  }
}
