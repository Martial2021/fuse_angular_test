import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (
    route,
    state
) => {
    const router: Router = inject(Router);
    const auth: AuthService = inject(AuthService);

    // Check the authentication status
    return auth.isAuthenticated$.pipe(
        map((isAuthenticated) => {
            // If the user is authenticated...
            if (isAuthenticated) {
                // Redirect to the root page
                return router.parseUrl('/demandes');
            }

            // Allow access to the sign-in page
            return true;
        })
    );
};
