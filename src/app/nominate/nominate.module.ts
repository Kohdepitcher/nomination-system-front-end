import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { NominateRoutingModule } from './nominate-routing.module';
import { NominationPageComponent } from './nomination-page/nomination-page.component';
import { NominationFormComponent } from './nomination-form/nomination-form.component';

import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule, MatCard} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule} from '@angular/material/progress-bar';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';

// import { CountdownModule } from "ng2-date-countdown";

import { HttpClientModule } from '@angular/common/http'

import { SubmitNominationsComponent } from '../shared/dialogs/submit-nominations.component';



@NgModule({
  declarations: [NominationPageComponent, NominationFormComponent, SubmitNominationsComponent],
  imports: [
    CommonModule,
    NominateRoutingModule,
    SharedModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    
    HttpClientModule,
    MatProgressBarModule
  ],
  entryComponents: [SubmitNominationsComponent]
})
export class NominateModule { }
