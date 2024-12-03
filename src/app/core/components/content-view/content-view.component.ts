import {
  Component,
  ElementRef,
  inject,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { MarkedService } from '../../services/marked.service';

@Component({
  selector: 'v-content-view',
  imports: [],
  templateUrl: './content-view.component.html',
  styleUrl: './content-view.component.scss',
})
export class ContentViewComponent implements OnChanges {
  private readonly markedService = inject(MarkedService);

  content = input('');
  container = viewChild<ElementRef<HTMLDivElement>>('container');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this.markedService.parse(
        this.container()!,
        changes['content'].currentValue
      );
    }
  }
}
