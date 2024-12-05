import { inject, Pipe, PipeTransform } from '@angular/core';
import { RelativeTimeService } from '../services/relative-time.service';

@Pipe({
  name: 'relativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {
  private readonly relativeTime = inject(RelativeTimeService);

  transform(date: Date): string {
    return this.relativeTime.formatRelativeTime(date);
  }
}
