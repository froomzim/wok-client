import { ApiService } from 'src/app/services/api/api.service';
import { BaseRoute } from '../baseRoute';
import { ApiService as Api } from "src/app/game/services/api.service";
import { HttpHeaders } from '@angular/common/http';

export class ResourceRoute extends BaseRoute {


  public basePath = 'profile-resources';

  constructor(
    public apiService: ApiService,
    private api?: Api
  ) {
    super(apiService);
  }

  getResource(id: string) {
    const userToken = localStorage.getItem('authToken')
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    let http = this.apiService.http;
    let get = http.get<string[]>(`${this.apiService.getApiUrl()}${this.basePath}${id}`, { headers: httpHeaders });
    return get;
  }
}
