import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { fuseAnimations } from '@fuse/animations';
// import { FuseAlertComponent } from '@fuse/components/alert';
import { MatButtonModule } from '@angular/material/button';
// import { RouterLink } from '@angular/router';

@Component({
    selector: 'auth-sign-in',
    standalone: true,
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        // RouterLink,
        // FuseAlertComponent,
        MatButtonModule,
    ],
})
export class AuthSignInComponent {
    constructor(
        public auth: AuthService,
        private activatedRoute: ActivatedRoute
    ) {}

    signInWithAuth0(): void {
        const target = this.activatedRoute.snapshot.queryParamMap.get('redirectURL') ?? '/demandes';
        this.auth.loginWithRedirect({
            appState: { target }
        });
    }
}
