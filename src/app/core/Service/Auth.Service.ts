import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {Product, Register, Cart} from '../modal/modal';

@Injectable({providedIn: 'root'})

export class AuthServices {

 APIURL = environment.ApiUrl;

  constructor(public Http: HttpClient) {}

  public AddUser(user) {
    const URL = this.APIURL + 'UserRegistration';
    const body = {
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Phone: user.Phone,
      Password: user.Password,
      Imageurl: user.Imageurl,
      City: user.City,
      Address: user.Address
    };
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.post(URL, body, {headers}).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            'currentUser',
            JSON.stringify((user as any).user)
          );
        }
        return user;
      })
    );
  }

  public Login(user) {
    const URL = this.APIURL + 'Login';
    const body = {
      Email: user.Email,
      Password: user.Password
    };
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.post(URL, body, {headers}).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            'currentUser',
            JSON.stringify((user as any).user)
          );
        }
        return user;
      })
    );
  }

  public SignInWithSocialMedia(SocialLogin) {
    const URL = this.APIURL + 'AddSocialUser';
    const body = {
      FirstName: SocialLogin.firstName,
      LastName: SocialLogin.lastName,
      Email: SocialLogin.email,
      Imageurl: SocialLogin.photoUrl,
      provider: SocialLogin.provider
    };
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.post(URL, body, {headers}).pipe(
      map(SocialLogin => {
        // login successful if there's a jwt token in the response
        if (SocialLogin) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            'currentUser',
            JSON.stringify((SocialLogin as any).SocialLogin)
          );
        }
        return SocialLogin;
      })
    );
  }

  public AddProduct(product) {
    const URL = this.APIURL + 'AddProducts';
    const body = {
      ProductName: product.ProductName,
      Productprice: product.Productprice,
      productDescription: product.productDescription,
      ProductImage: product.ProductImage,
      DiscountPrice: product.DiscountPrice,
      category: product.category
    };
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.post(URL, body, {headers});
  }

  public getallproduct(): Observable<Product[]> {
    const URL = this.APIURL + 'GetAllproducts';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.get<Product[]>(URL, {headers});
  }

  public getmensproduct(): Observable<Product[]> {
    const URL = this.APIURL + 'GetMensProduct';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.get<Product[]>(URL, {headers});
  }

  public GetWomenProduct(): Observable<Product[]> {
    const URL = this.APIURL + 'GetWomenProduct';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.get<Product[]>(URL, {headers});
  }

  public getuserbyId(token): Observable<Register[]> {
    const URL = this.APIURL + 'GetuserbyID/' + token;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.get<Register[]>(URL, {headers});
  }

  public Updateuser(user) {
    const URL = this.APIURL + 'UpdateUser';
    const body = {
      _Id: user._id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Phone: user.Phone,
      Password: user.Password,
      Imageurl: user.Imageurl,
      City: user.City,
      Address: user.Address
    };
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.post(URL, body, {headers});
  }

  public AddTocart(cart) {
    const URL = this.APIURL + 'AddTocart';
    const body = {
      ProductName: cart.ProductName,
      Productprice: cart.Productprice,
      productDescription: cart.productDescription,
      ProductImage: cart.ProductImage,
      DiscountPrice: cart.DiscountPrice,
      category: cart.category
    };
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.post(URL, body, {headers});
  }

  public getcartdetail(cart): Observable<Cart[]> {
    const URL = this.APIURL + 'findall/' + cart;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.get<Cart[]>(URL, {headers});
  }

  public paymentwithstripe(id, user) {
    const URL = this.APIURL + 'stripepayment';
    const body = {
    token : id,
    Email: user.Email,
    Price: user.Price
    };
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.post(URL, body, {headers});
  }

  public youtubevideo(chanelname) {
    const URL = this.APIURL + 'youtubevideo/' + chanelname;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.get(URL, {headers});
  }

  public GetEmail() {
    const URL = this.APIURL + 'Googlemail';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.get(URL, {headers});
  }

  public getAllmails(code) {
    const URL = this.APIURL + 'Googlemailcallback';
    const body = {
      code
    };
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.Http.post(URL, body, {headers});
  }

  public logout() {
    localStorage.removeItem('currentUser');
  }

}
