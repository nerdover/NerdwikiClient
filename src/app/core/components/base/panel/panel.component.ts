import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  template: '',
})
export abstract class Panel<T> {
  action = input.required<T>();
  closed = output();

  close() {
    this.closed.emit();
  }
}
