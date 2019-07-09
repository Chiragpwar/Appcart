import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Register} from '../../../core/modal/modal';
import {AuthServices} from '../../../core/Service/Auth.Service';
import {Router,  RouterEvent, NavigationEnd} from '@angular/router';
import {AuthService} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']})
export class LoginComponent implements OnInit {
  usersForm: FormGroup;
  Socialuser: any;
  constructor(private fb: FormBuilder, private Service: AuthServices, private routes: Router, private authService: AuthService
            , private Tostr: ToastrService) {}

  ngOnInit() {
    this.usersForm = this.fb.group({
      Email: [
        '', Validators.required
      ],
      Password: ['', Validators.required]
    });
  }

 private login() {
    const register = new Register();
    register.Email = this.usersForm.value.Email;
    register.Password = this.usersForm.value.Password;
    this.Service.Login(register).subscribe(Response => {
      this.Tostr.success('Login', 'Successfully Logged In');
      const log = JSON.parse(localStorage.getItem('currentUser'));
      if (log.Role === 'Admin') {
        setTimeout(() => {
          this.routes.navigate(['/product']);
        }, 3000);
     } else {
      const prev =  localStorage.getItem('ctoken');
      if (prev !== null && prev !== undefined) {
        setTimeout(() => {
          this.routes.navigate(['/view']);
        }, 3000);
      } else {
        setTimeout(() => {
          this.routes.navigate(['/']);
        }, 3000);
      }
     }
    });
  }

  private signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(FB => this.SocialMediaLogin(FB));
  }

  private signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(Google => this.SocialMediaLogin(Google));
  }

  public SocialMediaLogin(Providers) {
    this.Service.SignInWithSocialMedia(Providers).subscribe(Response =>
     this.Tostr.success('Login', 'login Succeeded'));
    setTimeout(() => {
      this.routes.navigate(['/']);
    }, 3000);
  }
}
