import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { HttpClient } from '@angular/common/http'

import { NominationDatabaseService, trainerAndCount } from '../../../services/nominate-db.service';

@Component({
  selector: 'app-trainers-list',
  templateUrl: './trainers-list.component.html',
  styleUrls: ['./trainers-list.component.scss']
})
export class TrainersListComponent implements OnInit {

  //set by a parent component
  @Input('jumpoutID') jumpoutID: number;

  //column names
  displayedColumns = [ 'name', 'count'];

  //table datasource
  dataSource: MatTableDataSource<trainerAndCount>;

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild('meetingTable',{static:true}) table: MatTable<any>;

  constructor(private databaseService: NominationDatabaseService) { }

  ngOnInit() {

    this.databaseService.getTrainersAnNominationCount(this.jumpoutID).subscribe(result => {
      console.log(result)

      this.dataSource = new MatTableDataSource(result);
    })


  }

}


