import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router} from '@angular/router';
import {AuthService} from '../../Service/Auth.Service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                const currentUrl = this.router.url;
                if (currentUrl.indexOf('/login') !== 0) {
                    setTimeout(() => {
                        location.reload(true);
                    }, 3000);


                }
            }
            const error = err.error.title || err.statusText;
            return throwError(error);
        }));
    }
}
