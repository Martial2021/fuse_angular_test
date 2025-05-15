import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'app/core/user/user.types';
import { filter, map, Observable, ReplaySubject, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _httpClient = inject(HttpClient);
    private _auth = inject(AuthService);
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    constructor() {
        // Initialize user data when authenticated
        this._auth.isAuthenticated$.pipe(
            filter(isAuthenticated => isAuthenticated === true),
            switchMap(() => this.get())
        ).subscribe();
    }

    /**
     * Getter for user
     */
    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._httpClient.get<User>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }
}
