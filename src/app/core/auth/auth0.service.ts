import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from 'app/core/user/user.service';

@Injectable({ providedIn: 'root' })
export class Auth0AuthService {
    private _authenticated: boolean = false;

    constructor(
        private auth0: Auth0Service,
        private _userService: UserService
    ) {
        // Subscribe to the authentication state changes
        this.auth0.isAuthenticated$.subscribe((isAuthenticated) => {
            this._authenticated = isAuthenticated;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in using Auth0
     */
    signIn(): Observable<any> {
        return from(this.auth0.loginWithRedirect());
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        return from(this.auth0.logout());
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        return this.auth0.isAuthenticated$;
    }

    /**
     * Get the user profile
     */
    getUserProfile(): Observable<any> {
        return this.auth0.user$.pipe(
            tap((user) => {
                if (user) {
                    // Store the user on the user service
                    this._userService.user = {
                        id: user.sub,
                        name: user.name,
                        email: user.email,
                        avatar: user.picture,
                        status: 'online'
                    };
                }
            })
        );
    }
}
