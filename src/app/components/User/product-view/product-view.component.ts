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
  loguser = false;
  minusdec = false;

  constructor(private main: MainlayoutComponent, private service: AuthServices,
              private route: Router) {}

  ngOnInit() {
    this.count = this.main.count;
    this.carts = this.main.carts;
    const currentuser = JSON.parse(localStorage.getItem('currentUser'));
    const cart = localStorage.getItem('ctoken');
    if (cart != null && cart !== undefined) {
      this.Getproductincart(cart);
    }
    if (currentuser != null && currentuser !== undefined) {
      this.getloguser(currentuser.id);
      this.warn = true;
    }
  }

  public AddQty(plus) {
    this.plus = parseInt((document.getElementById(plus)as HTMLInputElement).value, 10);
    this.plus++;
    (document.getElementById(plus)as HTMLInputElement).value = this.plus;
    this.Getproductprice('plus');
  }

  public Minusqty(minus) {
    this.minus = parseInt((document.getElementById(minus)as HTMLInputElement).value, 10);
    this.minus--;
    (document.getElementById(minus)as HTMLInputElement).value = this.minus;
    if (this.minus === 1) {
       this.minusdec = true;
    }
    this.Getproductprice('minus');
  }

  public Getproductprice(data) {
    this.carts.forEach(element => {
      if (data === 'plus') {
        this.price = parseInt(element.Productprice, 10) * this.plus;
      } else if (data === 'minus') {
        this.price = parseInt(element.Productprice, 10) * this.minus;
      } else {
        this.price = parseInt(element.Productprice, 10);
      }
    });
  }

  public Getproductincart(cartIds) {
    this.service.getcartdetail(cartIds).subscribe(Response => {
      this.carts = Response;
      this.Getproductprice(null);
      this.count = Response.length;
    });
  }

  public getloguser(Id) {
    this.service.getuserbyId(Id).subscribe(Response => {
    this.register = Response;
    this.loguser = true;
    });
  }

  public buynow() {
   location.href = '/payment';
  }

}
