import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    get token(): string {
        return localStorage.getItem('authToken');
    }
    
    public setToken(token: string): void {
        localStorage.setItem('authToken', token);
    }
}