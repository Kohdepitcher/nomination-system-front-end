import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatTable, DateAdapter  } from '@angular/material';
import { HttpClient } from '@angular/common/http'

import { NominationDatabaseService, trainerAndCount } from '../../../services/nominate-db.service';

@Component({
  selector: 'app-trainers-list',
  templateUrl: './trainers-list.component.html',
  styleUrls: ['./trainers-list.component.scss']
})
export class TrainersListComponent implements OnInit {

  //column names
  displayedColumns = [ 'name', 'count'];

  //table datasource
  dataSource: MatTableDataSource<trainerAndCount>;

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild('meetingTable',{static:true}) table: MatTable<any>;

  constructor(private databaseService: NominationDatabaseService) { }

  ngOnInit() {

    this.databaseService.getTrainersAnNominationCount(1).subscribe(result => {
      console.log(result)

      this.dataSource = new MatTableDataSource(result);
    })


  }

}


