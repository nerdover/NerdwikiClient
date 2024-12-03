import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'v-sign-in',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  isAuthFailed = false;

  signIn() {
    this.auth
      .signIn({
        username: this.username?.value!,
        password: this.password?.value!,
      })
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
