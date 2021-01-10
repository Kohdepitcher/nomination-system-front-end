import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NominationPageComponent} from './nomination-page/nomination-page.component'


const routes: Routes = [

  //root page path
  { path: '', component: NominationPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NominateRoutingModule { }
