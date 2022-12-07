import { HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";

export default class TokenInterceptor {
    
    constructor() {
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const userToken = localStorage.getItem('authToken');

        if(!userToken) return next.handle(request);

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${userToken}`,
            }
        });

        return next.handle(request);
    }
}


export const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
};