import { BaseRoute } from '../baseRoute';
import { ApiService } from '../../api.service';
import { iResponse } from '../../interfaces/response';
import { iLogin } from './login';

export class LoginRoute extends BaseRoute {

    public basePath = 'auth';

    constructor(public apiService: ApiService) {
        super(apiService);
    }

    message() {
        return this.apiService.http.get<iResponse<string>>(this.getPath() + '/message', { withCredentials: true });
    }

    login(address: string, signature: string) {
        return this.apiService.http.post<iResponse<iLogin>>(this.getPath() + '/login', { address, signature }, {
            withCredentials: true,
        });
    }
}