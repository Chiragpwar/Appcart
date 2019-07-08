import { Component, OnInit } from '@angular/core';
import {MainlayoutComponent} from '../../mainlayout/mainlayout.component';
import {Cart} from '../../../core/modal/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {StripeService, Elements, Element as StripeElement, ElementsOptions} from 'ngx-stripe';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})

export class ProductViewComponent implements OnInit {

  count = 0;
  carts: Cart[];
  plus: any;
  minus: any;
  price = 0;
  warn = false;
  elements: Elements;
  card: StripeElement;
  stripeTest: FormGroup;
  constructor(private main: MainlayoutComponent, private fb: FormBuilder,
              private stripeService: StripeService) { }

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });

    // payment
    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0'
              }
            }
          }
        });
        this.card.mount('#card-element');
      }
    });

    this.count = this.main.count;
    this.carts = this.main.carts;
    this.Getproductprice();
    const currentuser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentuser != null) {
      this.warn = true;
    }

  }
  public AddQty(plus) {
    this.plus = parseInt((document.getElementById(plus) as HTMLInputElement).value, 10);
    this.plus++;
    (document.getElementById(plus) as HTMLInputElement).value = this.plus;
    this.Getproductprice();
  }

  public  Getproductprice() {
   this.carts.forEach(element => {
   if (this.plus != null && this.plus !== undefined) {
      this.price += parseInt(element.Productprice, 10 * this.plus);
   } else {
      this.price += parseInt(element.Productprice, 10);
   }
   });
  }

 public buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
    }
}
