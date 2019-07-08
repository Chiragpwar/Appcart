import { Component, OnInit} from '@angular/core';
import {Cart, Product} from '../../core/modal/modal';
import {AuthServices} from '../../core/Service/Auth.Service';
import {MainlayoutComponent} from '../mainlayout/mainlayout.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carts: Cart[];
  product: Product[];
  token: number;
  cartIds: any = [];
  constructor(private service: AuthServices, private main: MainlayoutComponent, private tostr: ToastrService) { this.carts = []; }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
        this.token = currentUser.id;
    }
    this.GetAllProduct();
  }

  private GetAllProduct() {
    this.service.getallproduct().subscribe(Response => {
    this.product = Response;
    });
  }

   private AddTocart(cart) {
    if (this.token !== null  && this.token !== undefined) {
      // this.service.AddTocart(cart).subscribe(Response => {
      // });
      this.carts.push(cart);
      this.main.cartdetail(this.carts);
    } else {
       this.carts.push(cart);
       this.cartIds.push(cart._id);
       if (this.carts.filter(x => x._id === cart._id).length >= 2) {
        this.carts.splice(cart, 1);
        this.cartIds.splice(cart._id, 1);
        this.tostr.warning(` ${cart.ProductName} with $ ${cart.Productprice} already added into the cart`);
       }
       this.main.cartdetail(this.carts);
       if (this.cartIds.length > 0) {
        localStorage.setItem('ctoken', this.cartIds);
       }
    }
   }

}
