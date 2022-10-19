import { Component, OnInit } from '@angular/core';
import { MovieService } from 'services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intrested',
  templateUrl: './intrested.component.html',
  styleUrls: ['./intrested.component.css'],
})
export class IntrestedComponent implements OnInit {
  movies: any;

  body: any;

  entry: any;

  filteredData: any;

  constructor(private httpService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.httpService.getData().subscribe((response) => {
      this.filteredData = response.filter((movie: any) => movie.intrested);
      this.entry = this.filteredData;
    });
  }
}
