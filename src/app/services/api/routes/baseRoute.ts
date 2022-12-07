import { iRoute } from './../interfaces/route';
import { ApiService } from "../api.service";

export class BaseRoute implements iRoute {
    public basePath = '';

    constructor(public apiService: ApiService) {
    }

    protected getPath() {
        return this.apiService.getApiUrl() + this.basePath;
    }


    protected get<T>(path: string) {
        return this.apiService.http.get<T>(this.getPath() + path);
    }

    protected post<T>(path: string, data: any) {
        return this.apiService.http.post<T>(this.getPath() + path, data);
    }
}
