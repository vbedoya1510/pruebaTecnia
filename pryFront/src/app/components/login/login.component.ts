import { DecimalPipe } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../../models/user-model';
import { LoginService } from './services/login-service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [DecimalPipe],
})
export class LoginComponent implements OnInit {
  protected token = '' ;

  @Output()
  statusEmitter = new EventEmitter<boolean>();

  /**
   * error message
   */
  resultMessage: string;

  logInForm: FormGroup;
  userModel: UserModel;

  constructor(private loginService: LoginService) {
  this.resultMessage = '';
  }

  ngOnInit(): void {
    this.setForm();

  }

  /**
   * get input value
   */
  get user_name() {
    return this.logInForm.get('user_name');
  }

  /**
   * get input value
   */
  get user_password() {
    return this.logInForm.get('user_password');
  }

  /**
   * Initialize Form and all validations for input
   */
  private setForm() {
    this.logInForm = new FormGroup({
      user_name: new FormControl('', [Validators.required]),
      user_password: new FormControl('', [Validators.required]),
    });
    this.logInForm.reset();
  }

  /**
   * Validate if the information completed is valid and save it in the model
   */
  public submit() {
    if (this.logInForm.valid) {
      this.userModel = {
        user: this.logInForm.value.user_name,
        password: this.logInForm.value.user_password,
      };
      this.sendUser(this.userModel);
    }
  }

  private sendUser(user: UserModel) {


    this.loginService.loginUser(user).subscribe(
      (response) => {
        if (response.token != null){
          this.token = response.token;
          this.statusEmitter.emit(true);
          this.saveUserId();
        }else{
          this.resultMessage = 'Usuario o contraseña invalida';
          this.statusEmitter.emit(false);
        }

      },
      (error) => {
        this.resultMessage = 'Usuario o contraseña invalida';
        this.statusEmitter.emit(false);
      }
    );
  }

  private saveUserId() {
      const tokenInfo = this.getDecodedAccessToken(this.token);
      localStorage.setItem('userId', tokenInfo.users_id);
      localStorage.setItem('token', this.token);

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
