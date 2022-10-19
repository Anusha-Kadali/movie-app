import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserServiceService } from 'services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css'],
})
export class UsersignupComponent implements OnInit {
  n: any;
  x: any;
  isLoggedIn: Boolean = false;
  val: Boolean = false;

  adduser = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private httpService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var x = localStorage.getItem('username');
    if (x !== null) {
      this.router.navigate(['/app-home']);
      this.isLoggedIn = true;
    }
  }

  addUser(): void {
    this.n = this.adduser.controls.name.value;
    const user: any = {
      name: this.adduser.controls.name.value,
      email: this.adduser.controls.email.value,
      password: this.adduser.controls.password.value,
    };
    if (user.name == '' || user.email == '' || user.password == '') {
      this.val = true;
    } else {
      this.httpService
        .postUser(user)
        .subscribe((data: any) => console.log(data));
      this.x = localStorage.setItem('username', this.n);
      window.location.reload();
    }
  }
}
