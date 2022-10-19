import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'services/movie.service';
import { Router } from '@angular/router';
import { DashboardService } from 'services/dashboard.service';
import { resolveTypeReferenceDirective } from 'typescript';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  intrested: any;
  rem: any;
  name: any;
  morning: any;
  evening: any;
  night: any;
  id: any;
  ticket: any;
  stime: any;
  push: any;
  movies: any;
  st: any;
  username: any;
  booked: boolean = false;

  addBooking = new FormGroup({
    name: new FormControl(''),
    tickets: new FormControl(''),
    showtime: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpservice: MovieService,
    private router: Router,
    private httpservice1: DashboardService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') + '';
    this.httpservice.getDataById(this.id).subscribe((data: any) => {
      this.addBooking.controls.name.setValue(data.name);
      this.name = data.name;
      this.morning = data.morning;
      this.evening = data.evening;
      this.night = data.night;
      this.intrested = data.intrested;
      this.movies = data.image;
    });
  }

  validate() {
    this.ticket = this.addBooking.controls.tickets.value;
    this.stime = this.addBooking.controls.showtime.value;
    this.st = localStorage.setItem('show', this.stime);
    if (this.stime === 'morning') {
      if (this.morning < this.ticket) {
        this.router.navigate(['app-noticket/' + this.id]);
      } else {
        this.rem = this.morning - this.ticket;
        let body = {
          name: this.name,
          morning: this.rem,
          evening: this.evening,
          night: this.night,
          id: parseInt(this.id),
        };
        this.push = true;
        this.httpservice.updateData(body).subscribe((response) => {
          console.log(response);
          this.router.navigate(['app-success/' + this.id]);
        });
      }
    }
    if (this.stime === 'evening') {
      if (this.evening < this.ticket) {
        this.router.navigate(['app-noticket/' + this.id]);
      } else {
        this.rem = this.evening - this.ticket;
        let body = {
          name: this.name,
          morning: this.morning,
          evening: this.rem,
          night: this.night,
          id: parseInt(this.id),
        };
        this.push = true;
        this.httpservice.updateData(body).subscribe((response) => {
          console.log(response);
          this.router.navigate(['app-success/' + this.id]);
        });
      }
    }
    if (this.stime === 'night') {
      if (this.night < this.ticket) {
        this.router.navigate(['app-noticket/' + this.id]);
      } else {
        this.rem = this.night - this.ticket;
        let body = {
          name: this.name,
          morning: this.morning,
          evening: this.evening,
          night: this.rem,
          id: parseInt(this.id),
        };
        this.push = true;
        this.httpservice.updateData(body).subscribe((response) => {
          console.log(response);
          this.router.navigate(['app-success/' + this.id]);
        });
      }
    }
    if (this.push == true) {
      this.booked = true;
      this.username = localStorage.getItem('username');
      let bodyy = {
        username: localStorage.getItem('username'),
        moviename: this.name,
        show: this.stime,
        ticket: this.ticket,
      };
      this.httpservice1.postData(bodyy).subscribe((response) => {
        console.log(response);
      });
    }
  }
  redirectHome() {
    this.router.navigate(['app-home']);
  }
}
