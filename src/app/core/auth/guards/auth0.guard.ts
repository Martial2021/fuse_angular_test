import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { of, switchMap } from 'rxjs';

export const Auth0Guard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);
    const auth = inject(AuthService);

    return auth.isAuthenticated$.pipe(
        switchMap((authenticated) => {
            // If the user is not authenticated...
            if (!authenticated) {
                // Redirect to the sign-in page
                auth.loginWithRedirect({
                    appState: { target: state.url }
                });
                return of(false);
            }

            // Allow the access
            return of(true);
        })
    );
};
