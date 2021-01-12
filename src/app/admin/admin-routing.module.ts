import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AllNominationsComponent } from './nominations/all-nominations-for-jumpout/all-nominations.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NominationsComponent } from "./nominations/nominations.component";

import { AdminGuard } from './../user/admin.guard';

const routes: Routes = [
  //root page path
  { path: '', component: AdminPageComponent},
  { path: 'all-nominations', component: AllNominationsComponent, canActivate:[AdminGuard], data: {roles: ['admin']} },
  { path: 'user-management', component: UserManagementComponent, canActivate:[AdminGuard], data: {roles: ['admin']} },
  { path: 'nominations', component: NominationsComponent, canActivate:[AdminGuard], data: {roles: ['admin']} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

