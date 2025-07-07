import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DefaultResponse, LoginResponse } from '../../models/http.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public CONTACT_URI: string = `${environment.URL_API}/auth/login`;
  public CONTACT_URI_LOGOUT: string = `${environment.URL_API}/auth/logout`;

  constructor(private http: HttpClient) { }

  async login(mail: string, password: string) {
    try {
      const response = await lastValueFrom(
        this.http.post<LoginResponse>(this.CONTACT_URI, { mail, password })
      );

      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  logout(): void {
    try{
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
    localStorage.removeItem('user');
        lastValueFrom(this.http.post<DefaultResponse>(this.CONTACT_URI_LOGOUT, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        }));
      }
    }catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
