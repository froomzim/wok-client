import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getHttp() {
    return this.http;
  }

  getApiUrl() {
    return API_URL;
  }

  getAuthorizationToken() {
    const userToken = localStorage.getItem('authToken');
    return userToken;
  }
}
