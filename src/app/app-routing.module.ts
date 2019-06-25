import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainlayoutComponent} from '../app/components/mainlayout/mainlayout.component';
import {AuthGuard} from '../app/core/Authgaurd';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
  { path: '', component: MainlayoutComponent,
  children: [
    { path: '', component: HomeComponent , pathMatch: 'full' }
  ]
},
{ path: 'Login', component: LoginComponent, pathMatch: 'full' },
{path: 'Signup', component: RegisterComponent , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
