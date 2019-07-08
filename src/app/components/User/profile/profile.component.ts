import { Component, OnInit } from '@angular/core';
import {Register} from '../../../core/modal/modal';
import { ActivatedRoute, Params} from '@angular/router';
import {AuthServices} from '../../../core/Service/Auth.Service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private imageSrc = 'https://www.imcusa.org/global_graphics/default-store-350x350.jpg';
  register: Register[];
  private token = '';
  IsDiaplay = true;
  constructor(private activatedRoute: ActivatedRoute, private Service: AuthServices) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params.id;
      if (this.token !== '') {
        this.GetUserbyId(this.token);
      }
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

 private GetUserbyId(token) {
  this.Service.getuserbyId(token).subscribe(Response => {
   this.register = Response;
   this.IsDiaplay = false;
  });
}

private Updateuser(register) {
  register.Imageurl = this.imageSrc;
  this.Service.Updateuser(register).subscribe(Response => {
 });
}

}
