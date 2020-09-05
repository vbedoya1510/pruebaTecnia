import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../../models/user-model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
  })
  export class SignInService {
    constructor(private http: HttpClient) {}

    signinUser(user: UserModel): Observable<any> {
      return this.http.post(environment.apiURLSignIn, user);
    }
  }
