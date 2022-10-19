import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserServiceService } from 'services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
})
export class UserloginComponent implements OnInit {
  users: any;
  uname: any;
  upass: any;
  usernamevalidate: any;
  userpassvalidate: any;
  
  user = new FormGroup({
    name: new FormControl(''),
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
    }
    this.httpService.getUser().subscribe((response) => {
      console.log(response);
      this.users = response;
    });
  }

  reDirect() {
    this.uname = this.user.controls.name.value;
    this.upass = this.user.controls.password.value;
    for (let i of this.users) {
      if (i.name === this.uname) {
        this.usernamevalidate = true;
        if (i.password === this.upass) {
          localStorage.setItem('username', this.uname);
          this.userpassvalidate = true;
          window.location.reload();
        }
      }
    }
    if (this.usernamevalidate === true && this.userpassvalidate === true) {
      this.router.navigate(['app-home']);
    }
    else[
      alert('Invalid Credentials!!')
    ]
  }
}
