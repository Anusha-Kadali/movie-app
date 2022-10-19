import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'services/movie.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-noticket',
  templateUrl: './noticket.component.html',
  styleUrls: ['./noticket.component.css'],
})
export class NoticketComponent implements OnInit {
  id: any;
  availableTickets: any;
  st: any;
  filteredData: any;
  i: any;
  key: any;

  constructor(
    private route: ActivatedRoute,
    private httpservice: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') + '';
    this.st = localStorage.getItem('show');
    this.httpservice.getDataById(this.id).subscribe((data: any) => {
      for (const [key, value] of Object.entries(data)) {
        if (`${key}` == this.st) {
          this.availableTickets = `${value}`;
        }
      }
    });
  }

  redirectHome() {
    this.router.navigate(['app-home']);
  }
}
