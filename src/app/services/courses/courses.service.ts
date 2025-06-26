import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { DefaultResponse } from '../../models/http.model';
import { Course } from '../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
public CONTACT_URI: string = `${environment.URL_API}/cursos`;
constructor(
    private http: HttpClient
  ) { }

  async getCourses(){
    try {
      var response = await lastValueFrom(this.http.get<DefaultResponse>(this.CONTACT_URI));
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
