import { LocalStorageService } from './../../services/localStorage/localStorage.service';
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiService } from "src/app/services/api/api.service";

@Injectable()
export class LoginService {

    public provider;

    constructor(
        protected readonly api: ApiService,
        protected readonly localStorageService: LocalStorageService
    ) { }

    public getMessage() {
        return this.api.login
            .message()
            .pipe(
                map(result => result.data)
            );
    }

    public login(address: string, signedMessage: string) {
        return this.api.login
            .login(address, signedMessage)
            .pipe(
                map(({ data }) => this.localStorageService.setToken(data.access_token))
            );
    }
    public requestWalletToSignMessage(message: string) {
        return new Observable<any>(observer => {
            this.provider.send({
                method: 'personal_sign',
                params: [message, this.provider.selectedAddress],
                from: this.provider.selectedAddress,
            },
                (err: any, result: any) => {
                    if (err) {
                        return observer.error(err);
                    }
                    return observer.next(result);
                });
        });
    }
}