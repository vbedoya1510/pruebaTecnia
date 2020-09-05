import { UserModel } from './../../../models/user-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
  })
  export class LoginService {
    constructor(private http: HttpClient) {}

    loginUser(user: UserModel): Observable<any> {
      return this.http.post(
        environment.apiURLLogin, user
        );
    }

  }
