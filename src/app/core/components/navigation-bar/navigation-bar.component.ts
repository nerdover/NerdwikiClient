import { Component, inject } from '@angular/core';
import { Switch } from '../../../shared/utils/switch';
import { fade } from '../../../shared/animations/fade';
import { leftSlideWithPixel } from '../../../shared/animations/slide';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../auth/enums/role';

const leftSlide256 = leftSlideWithPixel(256);

@Component({
  selector: 'v-navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  animations: [fade, leftSlide256],
})
export class NavigationBarComponent {
  readonly auth = inject(AuthService);

  get Role() {
    return Role
  }
  
  menuPanel = new Switch();

  openMenuAndLockBody() {
    this.menuPanel.open();
    document.body.classList.add('overflow-hidden');
  }

  closeMenuAndUnlockBody() {
    this.menuPanel.close();
    document.body.classList.remove('overflow-hidden');
  }
}
