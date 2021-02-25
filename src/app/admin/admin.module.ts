import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPageComponent } from './admin-page/admin-page.component';

import {MatTableModule} from '@angular/material/table';
import {  MatSortModule } from "@angular/material/sort";
import {MatSelectModule} from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AllNominationsComponent } from './nominations/all-nominations-for-jumpout/all-nominations.component';
import { UserManagementComponent } from './user-management/user-management.component';

import { UserDialogComponent } from "./user-management/dialogs/user-dialog.component";
import { EditNominationDialogComponent } from "./nominations/all-nominations-for-jumpout/edit-nomination-dialog/edit-nomination-dialog.component";

import { NominationsComponent } from './nominations/nominations.component';
import { TrainersListComponent } from './nominations/trainers-list/trainers-list.component';



@NgModule({
  declarations: [AdminPageComponent, AllNominationsComponent, UserManagementComponent, UserDialogComponent, NominationsComponent, TrainersListComponent, EditNominationDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
  ],
  entryComponents: [UserDialogComponent, EditNominationDialogComponent]
})
export class AdminModule { }
