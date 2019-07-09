import { Component, OnInit } from '@angular/core';
import {AuthServices} from '../../../core/Service/Auth.Service';
import {Register, Cart} from '../../../core/modal/modal';
import {IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';
import {StripeService, Elements, Element as StripeElement, ElementsOptions} from 'ngx-stripe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
 register: Register[];
 carts: Cart[];
 count: number;
 price = 0;
 public payPalConfig ?: IPayPalConfig;
 elements: Elements;
 card: StripeElement;
 stripeTest: FormGroup;
 show = false;
 stripdiv = true;
 paypaldiv = false;

  constructor(private service: AuthServices,  private fb: FormBuilder, private stripeService: StripeService) { }

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  ngOnInit() {

    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });

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

    const ctoken = localStorage.getItem('ctoken');
    const currentuser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentuser != null && ctoken != null) {
      this.getuserDetail(currentuser.id);
      this.getproductincart(ctoken);
    }
    this.initConfig();
  }

  private getuserDetail(Id) {
      this.service.getuserbyId(Id).subscribe(Response => {
        this.register = Response;
        this.show = true;
      });
  }

  private getproductincart(id) {
    this.service.getcartdetail(id).subscribe(Response => {
     this.carts = Response;
     this.count = Response.length;
     this.cartprice(this.carts);
    });
  }

  private cartprice(cart) {
    cart.forEach(element => {
     this.price += parseInt(element.Productprice, 10);
   });
  }
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'ARBe9uS3y58d3_T9jf-zqCPZ8KnH2H_ECuBPOvhl84qSJZBljCRZKmngfmDeeYP5fM3wJ1Jh8oJ5p-gv',
// tslint:disable-next-line: no-angle-bracket-type-assertion
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
           // this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
         //   this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
         //   this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
         //   this.resetStatus();
        },
    };
}

 buy() {
  const name = this.stripeTest.get('name').value;
  this.stripeService
    .createToken(this.card, { name })
    .subscribe(result => {
      if (result.token) {
        const userdata = {
      // tslint:disable-next-line: no-string-literal
          Email : this.register['Email'],
          Price : this.price
        };
        this.PaymentSripe(result.token.id, userdata);
      } else if (result.error) {
      }
    });
}

public PaymentSripe(token, user) {
 this.service.paymentwithstripe(token, user).subscribe(Response => {

 });
}
}

