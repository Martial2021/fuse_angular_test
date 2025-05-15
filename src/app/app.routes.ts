import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const appRoutes: Route[] = [

    // Redirection de la racine vers /demandes
    { path: '', pathMatch: 'full', redirectTo: 'demandes' },

    // Redirection post-authentification vers /demandes
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'demandes' },

    // Routes accessibles aux utilisateurs non authentifiés (layout vide)
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes') },
            { path: 'forgot-password',        loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes') },
            { path: 'reset-password',         loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes') },
            { path: 'sign-in',                loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
            { path: 'sign-up',                loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') }
        ]
    },

    // Routes accessibles après authentification mais sans données (layout vide)
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out',        loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') },
            { path: 'unlock-session',  loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes') }
        ]
    },

    // Routes publiques (landing page)
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes') }
        ]
    },

    // Routes principales authentifiées avec layout classique
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'classy'  
        },
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            { path: 'demandes', loadChildren: () => import('app/modules/admin/demandes/demandes.routes') },
        ]
    }
    
];
