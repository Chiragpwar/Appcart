import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/User/login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatToolbarModule, MatIconModule} from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RegisterComponent } from './components/User/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../app/core/Helper/jwt.interceptor';
import { ErrorInterceptor } from '../app/core/Helper/Errorinterceptor';
import { ToastrModule } from 'ngx-toastr';
import { ProductComponent } from './components/Admin/product/product.component';
import { MenComponent } from './components/User/men/men.component';
import { WomenComponent } from './components/User/women/women.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { ProductViewComponent } from './components/User/product-view/product-view.component';
import { NgxStripeModule } from 'ngx-stripe';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaymentComponent } from './components/User/payment/payment.component';
import {PreviousRouteService} from '../app/core/Service/shared.service';
import { VideoComponent } from './components/User/video/video.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('457073428004-tt84734kf868iemscqmi5s86nvmecbul.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('581715522355732')
  }
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider('78iqy5cu2e1fgr')
  // }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    MainlayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    MenComponent,
    WomenComponent,
    ProfileComponent,
    ProductViewComponent,
    PaymentComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    NgxPayPalModule,
    NgxStripeModule.forRoot('pk_test_xR2HN61CGq9RMib7obP5ieDz00Xhs4nu2t'),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
      iconClasses : {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      }
    }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [MainlayoutComponent, PreviousRouteService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig},
    { provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
