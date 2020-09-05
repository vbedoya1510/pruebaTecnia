import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../../models/user-model';
import { SignInService } from './services/signin-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  constructor(private signinService: SignInService, private router: Router) {
    this.show = true;
    this.resultMessage = '';
  }

  /**
   * error message
   */
  resultMessage: string;

  show: boolean;
  signInForm: FormGroup;
  userModel: UserModel;

  ngOnInit(): void {
    this.setForm();
  }

  /**
   * get input value
   */
  get user_name() {
    return this.signInForm.get('user_name');
  }

  /**
   * get input value
   */
  get user_password() {
    return this.signInForm.get('user_password');
  }

  /**
   * get input value
   */
  get user_email() {
    return this.signInForm.get('user_email');
  }

  /**
   * Initialize Form and all validations for input
   */
  private setForm() {
    this.signInForm = new FormGroup({
      user_name: new FormControl('', [Validators.required]),
      user_password: new FormControl('', [Validators.required]),
      user_email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.signInForm.reset();
  }

  /**
   * Validate if the information completed is valid and save it in the model
   */
  public submit() {
    if (this.signInForm.valid) {
      this.userModel = {
        user: this.signInForm.value.user_name,
        password: this.signInForm.value.user_password,
        email: this.signInForm.value.user_email,
      };
      this.sendUser(this.userModel);
    }
  }

  private sendUser(user: UserModel) {
    this.signinService.signinUser(user).subscribe(
      (response) => {
        if(response){
          this.resultMessage = 'Registrado con Éxito';
        }else{
          this.resultMessage = 'Error al realizar el registro, el usuario o email ya se existen';
        }
      },
      (error) => {
        this.resultMessage = 'Error al realizar el registro';
      }
    );
  }

  public ShowLogin(route: string) {
    this.show = false;
    this.router.navigateByUrl(route);
  }
}
