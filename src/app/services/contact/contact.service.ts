import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { DefaultResponse } from '../../models/http.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public CONTACT_URI: string = `${environment.URL_API}/contacts`;

  constructor(
    private http: HttpClient
  ) { }

  async sendContact(mailData: any) {
    try {
      let response = await lastValueFrom(this.http.post<DefaultResponse>(this.CONTACT_URI, { mailData, }));
      return response;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async getContact() {
  try {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const response = await lastValueFrom(
      this.http.get<DefaultResponse>(this.CONTACT_URI, { headers })
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
}
