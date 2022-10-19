import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { NoticketComponent } from './noticket/noticket.component';
import { IntrestedComponent } from './intrested/intrested.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UsersignupComponent } from './usersignup/usersignup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '',pathMatch: 'full',component: HomeComponent},
  {path: 'app-home',component: HomeComponent},
  {path:'app-booking/:id', component: BookingComponent},
  {path: 'app-noticket/:id',component: NoticketComponent},
  {path: 'app-intrested',component:IntrestedComponent},
  {path: 'app-userlogin',component:UserloginComponent},
  {path: 'app-usersignup',component:UsersignupComponent},
  {path: 'app-dashboard',component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
