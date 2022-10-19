import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'https://633e9f6e0dbc3309f3b94db1.mockapi.io/movies';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.url);
  }

  getDataById(id: any) {
    return this.http.get(this.url + '/' + id);
  }

  updateData(data: any): Observable<any> {
    console.log(data.id);
    return this.http.put(this.url + '/' + data.id, JSON.stringify(data), {
      headers: { 'Content-type': 'application/json' },
    });
  }
}
