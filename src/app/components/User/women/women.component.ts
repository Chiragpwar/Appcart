import { Component, OnInit } from '@angular/core';
import { Product} from '../../../core/modal/modal';
import {AuthServices} from '../../../core/Service/Auth.Service';
@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit {

  product: Product[];
  constructor(private Service: AuthServices) { }


  ngOnInit() {
    this.GetWomensproduct();
  }

  public GetWomensproduct() {
    this.Service.GetWomenProduct().subscribe(Response => {
    this.product = Response;
    });
  }
}
