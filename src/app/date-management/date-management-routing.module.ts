import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateListComponent } from './date-list/date-list.component'


const routes: Routes = [
  { path: '', component: DateListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DateManagementRoutingModule { }
