import { ApiService } from 'src/app/services/api/api.service';
import { BaseRoute } from '../baseRoute';
import { ApiService as Api } from "src/app/game/services/api.service";
import { HttpHeaders } from '@angular/common/http';

export class TroopRoute extends BaseRoute {


  public basePath = 'troops';

  constructor(
    public apiService: ApiService,
    private api?: Api
  ) {
    super(apiService);
  }

  getTroops() {
    const userToken = localStorage.getItem('authToken')
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    let http = this.apiService.http;
    let get = http.get<Array<any>>(`${this.apiService.getApiUrl()}${this.basePath}`, { headers: httpHeaders });
    return get;
  }

  createTroop(id: string) {
    const userToken = localStorage.getItem('authToken')
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    let http = this.apiService.http;
    let get = http.post(`${this.apiService.getApiUrl()}${this.basePath}/create/${id}`, { headers: httpHeaders });
    return get;
  }

}
