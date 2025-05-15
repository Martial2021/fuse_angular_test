import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
    private auth = inject(AuthService);
    private router = inject(Router);

    ngOnInit(): void {
        this.auth.isAuthenticated$.subscribe((isAuth) => {
            console.log('[AUTH] isAuthenticated:', isAuth);

            if (isAuth) {
                this.auth.appState$.subscribe((appState: any) => {
                    console.log('[AUTH] appState:', appState);

                    const target = appState?.target || '/demandes';

                    if (this.router.url.includes('/sign-in')) {
                        console.log('[AUTH] redirecting to:', target);
                        this.router.navigateByUrl(target);
                    }
                });

                setTimeout(() => {
                    if (this.router.url.includes('/sign-in')) {
                        console.log('[AUTH] Fallback: force redirect to /demandes');
                        this.router.navigateByUrl('/demandes');
                    }
                }, 500); 
            }
        });
    }
}
