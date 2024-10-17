import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  
  private baseUrl = 'http://localhost:8082'; // Replace with your Node.js server URL

  constructor(private http: HttpClient) {}

  sendData(formData: any): Observable<any> {
    const url = `${this.baseUrl}/submit-industry`; // Replace with your server endpoint for handling form submission
    return this.http.post<any>(url, formData);
  }
}
