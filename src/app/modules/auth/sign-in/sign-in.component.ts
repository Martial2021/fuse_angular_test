// version 2
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { fuseAnimations } from '@fuse/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'auth-sign-in',
    standalone: true,
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        MatButtonModule,
        MatIconModule,
    ],
})
export class AuthSignInComponent {
    currentYear = new Date().getFullYear();

    constructor(
        public auth: AuthService,
        private activatedRoute: ActivatedRoute
    ) {}

    /**
     * Connexion standard via Auth0
     */
    signInWithAuth0(): void {
        const target = this.activatedRoute.snapshot.queryParamMap.get('redirectURL') ?? '/demandes';
        this.auth.loginWithRedirect({
            appState: { target }
        });
    }

    /**
     * Création de compte (redirection vers le formulaire signup de Auth0)
     */
    signUpWithAuth0(): void {
        this.auth.loginWithRedirect({
            appState: {
                target: this.activatedRoute.snapshot.queryParamMap.get('redirectURL') ?? '/demandes'
            },
            ...({
                screen_hint: 'signup'
            } as any)
        });
    }
}

/* Version 1 - Legacy Authentication Code
// import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import {
//     FormsModule,
//     NgForm,
//     ReactiveFormsModule,
//     UntypedFormBuilder,
//     UntypedFormGroup,
//     Validators,
// } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { fuseAnimations } from '@fuse/animations';
// import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
// import { AuthService } from 'app/core/auth/auth.service';

// @Component({
//     selector: 'auth-sign-in',
//     templateUrl: './sign-in.component.html',
//     encapsulation: ViewEncapsulation.None,
//     animations: fuseAnimations,
//     imports: [
//         RouterLink,
//         FuseAlertComponent,
//         FormsModule,
//         ReactiveFormsModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatButtonModule,
//         MatIconModule,
//         MatCheckboxModule,
//         MatProgressSpinnerModule,
//     ],
// })
// export class AuthSignInComponent implements OnInit {
//     @ViewChild('signInNgForm') signInNgForm: NgForm;

//     alert: { type: FuseAlertType; message: string } = {
//         type: 'success',
//         message: '',
//     };
//     signInForm: UntypedFormGroup;
//     showAlert: boolean = false;

//     /**
//      * Constructor
//      */
//     constructor(
//         private _activatedRoute: ActivatedRoute,
//         private _authService: AuthService,
//         private _formBuilder: UntypedFormBuilder,
//         private _router: Router
//     ) {}

//     // -----------------------------------------------------------------------------------------------------
//     // @ Lifecycle hooks
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * On init
//      */
//     ngOnInit(): void {
//         // Create the form
//         this.signInForm = this._formBuilder.group({
//             email: [
//                 'hughes.brian@company.com',
//                 [Validators.required, Validators.email],
//             ],
//             password: ['admin', Validators.required],
//             rememberMe: [''],
//         });
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Sign in
//      */
//     signIn(): void {
//         // Return if the form is invalid
//         if (this.signInForm.invalid) {
//             return;
//         }

//         // Disable the form
//         this.signInForm.disable();

//         // Hide the alert
//         this.showAlert = false;

//         // Sign in
//         this._authService.signIn(this.signInForm.value).subscribe(
//             () => {
//                 // Set the redirect url.
//                 // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
//                 // to the correct page after a successful sign in. This way, that url can be set via
//                 // routing file and we don't have to touch here.
//                 const redirectURL =
//                     this._activatedRoute.snapshot.queryParamMap.get(
//                         'redirectURL'
//                     ) || '/signed-in-redirect';

//                 // Navigate to the redirect url
//                 this._router.navigateByUrl(redirectURL);
//             },
//             (response) => {
//                 // Re-enable the form
//                 this.signInForm.enable();

//                 // Reset the form
//                 this.signInNgForm.resetForm();

//                 // Set the alert
//                 this.alert = {
//                     type: 'error',
//                     message: 'Wrong email or password',
//                 };

//                 // Show the alert
//                 this.showAlert = true;
//             }
//         );
//     }
// }