import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'v-sign-in',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';

  isAuthFailed = false;

  signIn() {
    this.auth
      .signIn({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.isAuthFailed = true;
        },
      });
  }
}
