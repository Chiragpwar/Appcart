import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainlayoutComponent} from '../app/components/mainlayout/mainlayout.component';
import {AuthGuard} from '../app/core/Authgaurd';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/User/login/login.component';
import {RegisterComponent} from './components/User/register/register.component';
import {ProductComponent} from './components/Admin/product/product.component';
import {MenComponent} from '../app/components/User/men/men.component';
import {WomenComponent} from '../app/components/User/women/women.component';
import {ProfileComponent} from '../app/components/User/profile/profile.component';
import {ProductViewComponent} from './components/User/product-view/product-view.component';
const routes: Routes = [
  { path: '', component: MainlayoutComponent,
  children: [
    { path: '', component: HomeComponent , pathMatch: 'full' },
    { path: 'men-section', component: MenComponent , pathMatch: 'full' },
    { path: 'female-section', component: WomenComponent , pathMatch: 'full' },
    { path: 'profile/:id', component: ProfileComponent , pathMatch: 'full' },
    { path: 'view', component: ProductViewComponent , pathMatch: 'full' }
  ]
},
{ path: 'Login', component: LoginComponent, pathMatch: 'full' },
{path: 'Signup', component: RegisterComponent , pathMatch: 'full' },
{ path: 'product', component: ProductComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
