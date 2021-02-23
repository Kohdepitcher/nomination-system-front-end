import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserAccountComponent } from './user-account/user-account.component'

//import the auth guard service
import {AuthGuard} from './user/auth.guard';
import { AdminGuard } from './user/admin.guard';


const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'user-account', component: UserAccountComponent, canActivate: [AdminGuard], data: {roles: ['admin', 'user']}},
  
  //lazy load the user module so that the app doesnt load the javascript until needed on that page
  { path: 'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  { path: 'trial_dates', loadChildren:() => import('./date-management/date-management.module').then(m => m.DateManagementModule), canActivate:[AdminGuard], data: {roles: ['admin', 'user']}},
  { path: 'nominate', loadChildren:() => import('./nominate/nominate.module').then(m => m.NominateModule)},
  { path: 'admin', loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)},
  //{ path: 'user-account', loadChildren:() => import('./user-account/').then(m => m.AdminModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
