import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "@app/shared/features/register/register.component";
import {AuthComponent} from "@app/routes/authentification/auth/auth.component";
import {LoginComponent} from "@app/shared/features/login/login.component";

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [

      {path: '', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {path: 'not-found', loadChildren: () => import('@app/routes/not-found/not-found.module').then(m => m.NotFoundModule)},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule {
}
