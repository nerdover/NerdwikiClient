import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { SignUpDto } from './models/sign-up.dto';
import { SignInDto } from './models/sign-in.dto';
import { AccessToken } from './models/access-token';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _auth_url = '/api/auth';

  isSigningIn = signal<boolean | undefined>(undefined);
  currentAccessToken = signal<string | null>(null);
  currentAccessTokenObject = computed(() =>
    this.extractToken(this.currentAccessToken())
  );
  currentRoles = computed(() => this.getRoles(this.currentAccessTokenObject()));
  isRefreshing = false;
  noticeBefore = 120;

  getStatus = () =>
    this.http.get<boolean>(this._auth_url).pipe(
      tap((status) => {
        this.isSigningIn.set(status);
        this.currentAccessToken.set(status ? this.getAccessToken() : null);
      })
    );
  signUp = (signUpdto: SignUpDto) =>
    this.http.post<string>(`${this._auth_url}/signup`, signUpdto);

  signIn = (signIndto: SignInDto) =>
    this.http.post<string>(`${this._auth_url}/signin`, signIndto).pipe(
      tap((token) => {
        this.setAccessToken(token);
        this.currentAccessToken.set(token);
        this.isSigningIn.set(true);
      })
    );

  signOut = () =>
    this.http.post(`${this._auth_url}/signout`, {}).pipe(
      tap(() => {
        this.removeAccessToken();
        this.isSigningIn.set(false);
        this.currentAccessToken.set(null);
        this.router.navigate(['/sign-in']);
      })
    );

  refresh = () =>
    this.http.post<string>(`${this._auth_url}/refresh`, {}).pipe(
      tap({
        next: (token) => {
          this.setAccessToken(token);
          this.currentAccessToken.set(token);
          this.isRefreshing = false;
        },
        error: () => {
          this.isRefreshing = false;
          this.isSigningIn.set(false);
          this.currentAccessToken.set(null);
          this.removeAccessToken();
          this.router.navigate(['/signin']);
        },
      })
    );

  setAccessToken = (token: string) =>
    localStorage.setItem('access_token', token);
  getAccessToken = () => localStorage.getItem('access_token');
  removeAccessToken = () => localStorage.removeItem('access_token');

  extractToken = (token: string | null) => {
    if (!token) {
      return null;
    }
    const tokenBodyB64 = token.split('.')[1] ?? null;
    if (!tokenBodyB64) {
      return null;
    }
    const tokenBody = atob(tokenBodyB64);

    try {
      return JSON.parse(tokenBody) as AccessToken;
    } catch {
      return null;
    }
  };

  getRoles = (token: AccessToken | null) => {
    if (!token) {
      return null;
    }

    return token[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];
  };

  getExpiresTime = () => {
    const token = this.currentAccessTokenObject();
    if (!token?.exp) {
      return null;
    }
    return new Date(token!.exp * 1000);
  };

  isAboutExpired = () => {
    const expiresTime = this.getExpiresTime();
    if (!expiresTime) {
      return false;
    }
    const currentTime = new Date();
    return (
      expiresTime.getTime() - currentTime.getTime() < this.noticeBefore * 1000
    );
  };
}
