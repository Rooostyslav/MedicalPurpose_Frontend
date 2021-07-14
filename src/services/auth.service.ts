import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MEDICAL_PURPOSE_API, MEDICAL_PURPOSE_AUTH_API } from 'src/app/app-injection-tokens';
import { Login } from 'src/models/login';
import { User } from 'src/models/user';

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApiUrl: string = this.baseAuthApiUrl + '/api/auth/login'; 

  constructor(
    private http: HttpClient,
    @Inject(MEDICAL_PURPOSE_API) private baseApiUrl: string,
    @Inject(MEDICAL_PURPOSE_AUTH_API) private baseAuthApiUrl: string,
    private router: Router
  ) { }

  get isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getAuthUser(): Observable<User> {
    return this.http.get<User>(this.baseApiUrl + '/api/my/info');
  }

  login(login: Login) {
    return this.http.post<any>(this.authApiUrl, login)
      .pipe(
        tap(token => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
        })
      );
  }

  logout() {
    const removeToken = localStorage.removeItem(ACCESS_TOKEN_KEY);
    if (removeToken == null) {
      this.router.navigate(['sign-in']);
    }
  }
}
