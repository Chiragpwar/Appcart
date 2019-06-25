import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})


export class AuthService {

  constructor(public Http: HttpClient) {}

  public logout() {
    localStorage.removeItem('currentUser');
  }
}
