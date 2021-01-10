import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateManagementRoutingModule } from './date-management-routing.module';
import { DateListComponent } from './date-list/date-list.component';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

//extra angular material components
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DateMessageDialogComponent } from './dialogs/date-message-dialog.component';

import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';


//custom dialods
import { DateDialogComponent } from './dialogs/date-dialog.component';


import {MatChipsModule} from '@angular/material/chips'
import {MatPaginatorModule} from '@angular/material/paginator';

import { HttpClientModule } from '@angular/common/http'

import { Router } from '@angular/router';



@NgModule({
  declarations: [DateListComponent, DateDialogComponent, DateMessageDialogComponent],
  imports: [
    CommonModule,
    DateManagementRoutingModule,
    SharedModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    HttpClientModule,
    MatChipsModule,
    MatPaginatorModule
  ],
  entryComponents: [DateDialogComponent, DateMessageDialogComponent]
})
export class DateManagementModule { }
