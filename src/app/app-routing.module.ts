import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NameResolverComponent} from './name-resolver/name-resolver.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/auth.guard';

const routes: Routes = [
  {
    path: 'view',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'edit',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: '**',
    component: NameResolverComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
