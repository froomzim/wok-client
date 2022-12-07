import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiService: ApiService = {} as ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  getUser() {
    return this.apiService.getHttp().get(this.apiService.getApiUrl() + "user");
  }

  getProfile(): Observable<any> {
    const userToken = this.apiService.getAuthorizationToken();
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    let http = this.apiService.getHttp();
    let get = http.get<string[]>(`${this.apiService.getApiUrl()}/user/getUserProfileByToken`, { headers: httpHeaders });
    return get;
  }

  upgradeUserLevel(): Observable<any> {
    const userToken = this.apiService.getAuthorizationToken();
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    let http = this.apiService.getHttp();
    let get = http.get<string[]>(`${this.apiService.getApiUrl()}/user/upgradeUserLevel`, { headers: httpHeaders });
    return get;
  }

  downgradeUserLevel(): Observable<any> {
    const userToken = this.apiService.getAuthorizationToken();
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    let http = this.apiService.getHttp();
    let get = http.get<string[]>(`${this.apiService.getApiUrl()}/user/downgradeUserLevel`, { headers: httpHeaders });
    return get;
  }
}
