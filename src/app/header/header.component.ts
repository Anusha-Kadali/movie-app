import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean= false;

  constructor() { }

  ngOnInit(): void {
    var x=localStorage.getItem('username');
    console.log(x)
    if(x!==null){
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
  }

  logout(){
    console.log(localStorage.getItem('username'));
    localStorage.removeItem("username");
    window.location.reload();
  }

}
