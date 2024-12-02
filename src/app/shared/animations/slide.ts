import { animate, style, transition, trigger } from '@angular/animations';

export const leftSlideWithPixel = (px: number) =>
  trigger(`leftSlide${px}`, [
    transition(':enter', [
      style({
        left: `-${px}px`,
      }),
      animate(
        '200ms cubic-bezier(0.4, 0, 0.2, 1)',
        style({
          left: 0,
        })
      ),
    ]),
    transition(':leave', [
      style({
        left: 0,
      }),
      animate(
        '200ms cubic-bezier(0.4, 0, 0.2, 1)',
        style({
          left: `-${px}px`,
        })
      ),
    ]),
  ]);

export const slide = trigger(`slide`, [
  transition(':enter', [
    style({
      left: '-256px',
    }),
    animate(
      '200ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({
        left: 0,
      })
    ),
  ]),
  transition(':leave', [
    style({
      left: 0,
    }),
    animate(
      '200ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({
        left: '-256px',
      })
    ),
  ]),
]);
