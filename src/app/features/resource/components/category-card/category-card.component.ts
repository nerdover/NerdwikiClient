import { Component, input } from '@angular/core';
import { Category } from '../../../../core/models/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'v-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  category = input.required<Category>();
}
