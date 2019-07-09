import {Component, OnInit} from '@angular/core';
import {MainlayoutComponent} from '../../mainlayout/mainlayout.component';
import {Cart, Register} from '../../../core/modal/modal';
import {AuthServices} from '../../../core/Service/Auth.Service';
import {Router} from '@angular/router';
@Component({selector: 'app-product-view', templateUrl: './product-view.component.html', styleUrls: ['./product-view.component.scss']})
export class ProductViewComponent implements OnInit {
  count = 0;
  carts: Cart[];
  register: Register[];
  plus: any;
  minus: any;
  price = 0;
  warn = false;

  constructor(private main: MainlayoutComponent, private service: AuthServices,
              private route: Router) {}

  ngOnInit() {
    this.count = this.main.count;
    this.carts = this.main.carts;
    this.Getproductprice();
    const currentuser = JSON.parse(localStorage.getItem('currentUser'));
    const cart = localStorage.getItem('ctoken');
    if (cart != null) {
      this.Getproductincart(cart);
    }
    if (currentuser != null) {
      this.getloguser(currentuser.id);
      this.warn = true;
    }
  }
  public AddQty(plus) {
    this.plus = parseInt((document.getElementById(plus)as HTMLInputElement).value, 10);
    this.plus++;
    (document.getElementById(plus)as HTMLInputElement).value = this.plus;
    this.Getproductprice();
  }

  public Getproductprice() {
    this.carts.forEach(element => {
      if (this.plus != null && this.plus !== undefined) {
        this.price += parseInt(element.Productprice, 10 * this.plus);
      } else {
        this.price += parseInt(element.Productprice, 10);
      }
    });
  }

  public Getproductincart(cartIds) {
    this.service.getcartdetail(cartIds).subscribe(Response => {
      this.carts = Response;
      this.count = Response.length;
    });
  }

  public getloguser(Id) {
    this.service.getuserbyId(Id).subscribe(Response => {
    this.register = Response;
    });
  }
  public buynow() {
   location.href = '/payment';
  }

}
