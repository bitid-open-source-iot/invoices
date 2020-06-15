/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* --- SERVICES --- */
import { AuthManager } from './services/account/account.manager';

const routes: Routes = [
    {
        'path':         'invoices',
        'canActivate':  [AuthManager],
        'loadChildren': () => import('./pages/invoices/invoices.module').then(m => m.InvoicesModule)
    },
    {
        'path':         'signin',
        'loadChildren': () => import('./pages/signin/signin.module').then(m => m.SigninModule)
    },
    {
        'path':         '**',
        'redirectTo':   'invoices'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}