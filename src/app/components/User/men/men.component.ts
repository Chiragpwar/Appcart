import { Component, OnInit } from '@angular/core';
import { Product} from '../../../core/modal/modal';
import {AuthServices} from '../../../core/Service/Auth.Service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {
product: Product[];
  constructor(private Service: AuthServices) { }

  ngOnInit() {
    this.GetMensproduct();
  }

  public GetMensproduct() {
    this.Service.getmensproduct().subscribe(Response => {
    this.product = Response;
    });
  }


}
