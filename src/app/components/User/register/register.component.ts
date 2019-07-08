import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Register} from '../../../core/modal/modal';
import {AuthServices} from '../../../core/Service/Auth.Service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  usersForm: FormGroup;
  register = new Register();
  private imageSrc = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
  constructor(private fb: FormBuilder, public Service: AuthServices, private Routes: Router) { }

  ngOnInit() {
    this.usersForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      Phone: ['', Validators.required],
      City: ['', Validators.required],
      Address: ['', Validators.required],
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

  Adduser() {
    this.register.FirstName = this.usersForm.value.FirstName;
    this.register.LastName = this.usersForm.value.LastName;
    this.register.Email = this.usersForm.value.Email;
    this.register.Phone = this.usersForm.value.Phone;
    this.register.Password = this.usersForm.value.Password;
    this.register.Imageurl = this.imageSrc;
    this.register.City = this.usersForm.value.City;
    this.register.Address = this.usersForm.value.Address;

    this.Service.AddUser(this.register).subscribe(Response => {
        this.Routes.navigate(['/']);
    });
  }


}
