import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UnknownPageComponent} from './unknown-page/unknown-page.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: 'view',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'edit',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: '**',
    component: UnknownPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
