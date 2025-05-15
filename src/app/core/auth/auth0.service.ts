import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Injectable({ providedIn: 'root' })
export class Auth0AuthService {
    private _authenticated: boolean = false;

    constructor(
        private _auth: Auth0Service,
        private _userService: UserService,
        private _router: Router
    ) {
        // Subscribe to the authentication state changes
        this._auth.isAuthenticated$.subscribe((isAuthenticated) => {
            this._authenticated = isAuthenticated;
            if (isAuthenticated) {
                this.getUserProfile().subscribe();
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): Observable<void> {
        this._auth.loginWithRedirect();
        return of(void 0);
    }

    /**
     * Sign out
     */
    signOut(): Observable<void> {
        this._auth.logout({ logoutParams: { returnTo: window.location.origin + '/sign-in' } });
        return of(void 0);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        return this._auth.isAuthenticated$;
    }

    /**
     * Get the user info
     */
    getUserInfo(): Observable<User> {
        return this._auth.user$.pipe(
            filter(user => !!user),
            map((user: any) => ({
                id: user.sub,
                name: user.name,
                email: user.email,
                avatar: user.picture,
                status: 'online'
            })),
            catchError((error) => throwError(() => error))
        );
    }

    /**
     * Get the user profile
     */
    getUserProfile(): Observable<User> {
        return this.getUserInfo().pipe(
            tap((user) => {
                if (user) {
                    this._userService.user = user;
                }
            })
        );
    }
}
