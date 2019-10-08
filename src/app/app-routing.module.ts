import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NameResolverComponent} from './name-resolver/name-resolver.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/auth.guard';

const routes: Routes = [
  {
    path: 'view',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'edit',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: './admin/admin.module#AdminModule'
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
