import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
    {
        path: 'search',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule),
        canActivate: [authGuard]
    },
    {
        path: 'reservations',
        loadChildren: () => import('./pages/reservations/reservations.module').then(m => m.ReservationsModule),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [authGuard]
    },
    {
        path: 'not-found',
        loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
    },
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
    },
    {
        path: '**',
        redirectTo: 'not-found',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
