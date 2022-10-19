import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private url = 'https://633e9f6e0dbc3309f3b94db1.mockapi.io/users';

  constructor(private http: HttpClient) {}

  postUser(user: any): Observable<any> {
    return this.http.post(this.url, JSON.stringify(user), {
      headers: { 'Content-type': 'application/json' },
    });
  }

  getUser() {
    return this.http.get(this.url);
  }
}
