import { animate, style, transition, trigger } from '@angular/animations';

export const fade = trigger(`fade`, [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      '200ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({
        opacity: 1,
      })
    ),
  ]),
  transition(':leave', [
    style({
      opacity: 1,
    }),
    animate(
      '200ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({
        opacity: 0,
      })
    ),
  ]),
]);
