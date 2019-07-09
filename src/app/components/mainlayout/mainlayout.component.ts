import { Component, OnInit, Output, Input} from '@angular/core';
import {Register, Cart} from '../../core/modal/modal';
import {AuthServices} from '../../core/Service/Auth.Service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss']
})

export class MainlayoutComponent implements OnInit {
 Userdata: Register[];
 private token = '';
 carts: Cart[];
 data: any;
 count = 0;
 prices = 0;
 private imageSrc = 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1';
  constructor(private Service: AuthServices, private route: Router) {this.carts = []; }

  ngOnInit() {
    const Currentuser = JSON.parse(localStorage.getItem('currentUser'));
    const Cartdetail = (localStorage.getItem('ctoken'));
    if (Cartdetail != null) {
     this.prductincart(Cartdetail);
    }
    if (Currentuser != null) {
      this.token = Currentuser.id;
      this.GetUserbyId(this.token);
   }
  }

    private GetUserbyId(token) {
      this.Service.getuserbyId(token).subscribe(Response => {
       this.Userdata = Response;
      // tslint:disable-next-line: no-string-literal
       this.imageSrc = this.Userdata['Imageurl'];
      });
     }

     public ProductDetail(val) {

     }

     public removeproduct(product) {
      const ctoken = (localStorage.getItem('ctoken'));
      if (ctoken != null ) {
        let val = ctoken.split(',');
        if (val !== null && val !== undefined) {
          val = val.map(ids => ids);
          this.data = val.indexOf(product._id) >= 0;
          if (this.data) {
            this.data = this.carts.filter(x => x._id === product._id);
            this.carts.splice(this.data, 1);
            val.splice(product._id, 1);
            this.count =  val.length;
            this.data = val;
            localStorage.setItem('ctoken', this.data);
          }
        }
      }
     }


     public cartdetail(cart) {
       this.carts = cart;
       this.count =  this.carts.length;
     }

     private logout() {
      this.Service.logout();
      setTimeout(() => {
      this.route.navigate(['/']);
      }, 3000);
     }

     public prductincart(cart) {
      this.Service.getcartdetail(cart).subscribe(Response => {
        this.carts = Response;
        this.count = Response.length;
      });
     }
}
