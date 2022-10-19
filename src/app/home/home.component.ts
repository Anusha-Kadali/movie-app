import { Component, OnInit } from '@angular/core';
import { MovieService } from 'services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: any;
  fm: any;
  id: any;
  isLoggedIn: boolean = false;

  constructor(private httpService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.httpService.getData().subscribe((response) => {
      this.movies = response;
    });
    var x = localStorage.getItem('username');
    if (x !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  isRated = false;

  favMovie(movie: any) {
    this.isRated = !this.isRated;
    movie.intrested = this.isRated;
    let body = {
      name: movie.name,
      tickets: movie.ticket,
      showtime: movie.showtime,
      intrested: movie.intrested,
      id: parseInt(movie.id),
    };
    this.httpService.updateData(body).subscribe((response) => {
      console.log(response);
    });
  }

  redirectForm(value: any) {
    var x = localStorage.getItem('username');
    if (x !== null) {
      this.router.navigate(['app-booking/' + value.id]);
    } else {
      this.router.navigate(['app-usersignup']);
    }
  }
}
