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
    if (Cartdetail != null && Cartdetail !== '' && Cartdetail !== undefined) {
     this.prductincart(Cartdetail);
    }
    if (Currentuser != null && Currentuser !== '' && Currentuser !== undefined) {
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


     public removeproduct(product) {
      const ctoken = (localStorage.getItem('ctoken'));
      if (ctoken != null ) {
        const val = ctoken.split(',');
        if (val !== null && val !== undefined) {
          this.data = val.indexOf(product._id);
          if (this.data >= 0) {
           val.splice(this.data, 1);
          }
          this.prductincart(val);
          this.count =  val.length;
          this.data = val;
          localStorage.setItem('ctoken', this.data);
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
