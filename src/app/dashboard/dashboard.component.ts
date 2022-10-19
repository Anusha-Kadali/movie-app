import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'services/dashboard.service';
import { MovieService } from 'services/movie.service';

const COLUMNS_SCHEMA = [
  {
    key: 'moviename',
    type: 'text',
    label: 'Movie Name',
  },
  {
    key: 'username',
    type: 'text',
    label: 'User Name',
  },
  {
    key: 'show',
    type: 'text',
    label: 'Show Time',
  },
  {
    key: 'ticket',
    type: 'number',
    label: 'Tickets',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: 'Action',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  entry: any;
  filteredData: any;
  rem: any;
  fd: any;
  st: any;

  constructor(
    private httpservice: DashboardService,
    private router: Router,
    private httpservice1: MovieService
  ) {}

  dataSource: any = [];

  ngOnInit(): void {
    this.httpservice.getData().subscribe((response: any) => {
      console.log(response);
      this.dataSource = response;
    });
    this.httpservice1.getData().subscribe((response) => {
      this.fd = response;
    });
  }
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA;

  EditingDone(element: any) {
    let body1 = {
      username: element.username,
      moviename: element.moviename,
      ticket: element.ticket,
      show: element.show,
      id: element.id,
    };
    this.filteredData = this.fd.filter(
      (movie: any) => movie.name === element.moviename
    );
    this.filteredData = this.filteredData[0];
    console.log(this.filteredData);
    this.st = localStorage.setItem('show', element.show);
    if (element.show === 'morning') console.log(this.filteredData);
    {
      if (this.filteredData.morning < element.ticket) {
        this.router.navigate(['app-noticket/' + this.filteredData.id]);
      } else {
        this.rem = this.filteredData.morning - element.ticket;
        let body = {
          name: this.filteredData.name,
          morning: this.rem,
          evening: this.filteredData.evening,
          night: this.filteredData.night,
          id: parseInt(this.filteredData.id),
        };
        this.httpservice1.updateData(body).subscribe((response) => {
          console.log(response);
          this.router.navigate(['app-home']);
        });
        this.httpservice.updateData(body1).subscribe((response) => {
          console.log(response);
        });
      }
    }
    if (element.show == 'evening') {
      if (this.filteredData.evening < element.ticket) {
        this.router.navigate(['app-noticket/' + this.filteredData.id]);
      } else {
        this.rem = this.filteredData.evening - element.ticket;
        let body = {
          name: this.filteredData.name,
          morning: this.filteredData.morning,
          evening: this.rem,
          night: this.filteredData.night,
          id: parseInt(this.filteredData.id),
        };
        this.httpservice1.updateData(body).subscribe((response) => {
          console.log(response);
          this.router.navigate(['app-home']);
        });
        this.httpservice.updateData(body1).subscribe((response) => {
          console.log(response);
        });
      }
    }
    if (element.show === 'night') {
      if (this.filteredData.night < element.ticket) {
        this.router.navigate(['app-noticket/' + this.filteredData.id]);
      } else {
        this.rem = this.filteredData.night - element.ticket;
        let body = {
          name: this.filteredData.name,
          morning: this.filteredData.morning,
          evening: this.filteredData.evening,
          night: this.rem,
          id: parseInt(this.filteredData.id),
        };
        this.httpservice1.updateData(body).subscribe((response) => {
          console.log(response);
          this.router.navigate(['app-home']);
        });
        this.httpservice.updateData(body1).subscribe((response) => {
          console.log(response);
        });
      }
    }
  }
}
