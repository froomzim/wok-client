import { ProfileRoute } from './routes/profile/profile.route';
import { LoginRoute } from './routes/login/login.route';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ResourceRoute } from './routes/resources/resource.route';
import { TroopRoute } from './routes/troops/troop.route';

@Injectable({ providedIn: 'root' })
export class ApiService {

  public readonly login: LoginRoute;
  public readonly profile: ProfileRoute;
  public readonly resource: ResourceRoute;
  public readonly troop: TroopRoute;



  constructor(private httpClient: HttpClient) {
    this.login = new LoginRoute(this);
    this.profile = new ProfileRoute(this);
    this.resource = new ResourceRoute(this);
    this.troop = new TroopRoute(this);
  }

  get http() {
    return this.httpClient;
  }

  getApiUrl() {
    return environment.apiUrl;
  }
}
