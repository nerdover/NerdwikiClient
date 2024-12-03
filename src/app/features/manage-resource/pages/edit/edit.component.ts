import {
  Component,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Lesson } from '../../../../core/models/lesson';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { Switch } from '../../../../shared/utils/switch';
import { ContentService } from '../../../../core/services/content.service';
import { Router } from '@angular/router';
import { ContentViewComponent } from '../../../../core/components/content-view/content-view.component';
import { UploadService } from '../../../../core/services/upload.service';

@Component({
  selector: 'v-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    OverlayComponent,
    ContentViewComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  readonly contentService = inject(ContentService);
  private readonly router = inject(Router);
  private readonly uploadService = inject(UploadService);

  failured = false;
  err = '';

  lesson = input<Lesson>();
  closed = output();

  textInput = viewChild<ElementRef<HTMLTextAreaElement>>('input');

  content = new FormControl('');

  confirmPanel = new Switch();

  ngOnInit() {
    this.content.setValue(this.lesson()?.content ?? '');
  }

  update() {
    this.contentService
      .updateContent(this.lesson()!.id, {
        id: this.lesson()?.id,
        content: this.content.value ?? '',
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/', 'manage-resource']);
        },
        error: (e) => {
          this.failured = true;
          this.err = e.error;
        },
      });
  }

  add(
    snippet: string,
    snippetIndex: number,
    snippetRange: number,
    isBlock: boolean
  ) {
    const editor = this.textInput()!.nativeElement;
    const startPos = editor.selectionStart;
    const endPos = editor.selectionEnd;

    let newLine = '';
    if (
      isBlock &&
      this.content.value!.charAt(startPos) != '\n' &&
      startPos != 0
    ) {
      newLine = '\n';
    }

    this.content.setValue(
      this.content.value!.substring(0, startPos) +
        newLine +
        snippet +
        this.content.value!.substring(endPos)
    );

    editor.focus();
    editor.setSelectionRange(
      startPos + snippetIndex + newLine.length,
      startPos + snippetIndex + newLine.length + snippetRange
    );
  }

  uploadImage(e: Event) {
    const input = e.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.uploadService.upload(input.files[0]).subscribe({
        next: (image) => {
          this.add(`![alt](api/uploads/${image})`, 2, 3, true);
        },
        complete: () => {
          input.value = '';
        },
      });
    }
  }
}
