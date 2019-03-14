import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NameResolverComponent} from './name-resolver/name-resolver.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  // {
  //   path: 'admin',
  //   loadChildren: './user/admin.module#AdminModule'
  // },
  // {
  //   path: 'login',
  //   loadChildren: './user/login.module#LoginModule'
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/user'
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
