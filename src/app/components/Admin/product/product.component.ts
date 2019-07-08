import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthServices} from '../../../core/Service/Auth.Service';
import {Router} from '@angular/router';
import {Product} from '../../../core/modal/modal';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  poductForm: FormGroup;
  private imageSrc = 'https://www.imcusa.org/global_graphics/default-store-350x350.jpg';
  product = new Product();
  constructor(private fb: FormBuilder, private Service: AuthServices, private routes: Router) { }

  ngOnInit() {
    this.poductForm = this.fb.group({
      Prductname: ['', Validators.required],
      Productprice: ['', Validators.required],
      DiscountPrice: ['', Validators.required],
      Description: ['', Validators.required],
      categories: ['', Validators.required]
    });
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
  }

  Addproduct() {
    this.product.ProductName = this.poductForm.value.Prductname;
    this.product.Productprice = this.poductForm.value.Productprice;
    this.product.productDescription = this.poductForm.value.Description;
    this.product.ProductImage = this.imageSrc;
    this.product.DiscountPrice = this.poductForm.value.DiscountPrice;
    this.product.category = this.poductForm.value.categories;

    this.Service.AddProduct(this.product).subscribe(Response => {
        this.routes.navigate(['/']);
    });
  }

}
