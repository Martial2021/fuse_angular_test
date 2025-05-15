import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const auth = inject(AuthService);

    // Get the Auth0 token
    return auth.getAccessTokenSilently().pipe(
        mergeMap(token => {
            // Clone the request and add the authorization header
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });

            // Forward the request
            return next(authReq).pipe(
                catchError((error) => {
                    // Catch "401 Unauthorized" responses
                    if (error instanceof HttpErrorResponse && error.status === 401) {
                        // Sign out
                        auth.logout();
                    }

                    return throwError(() => error);
                })
            );
        })
    );
};
