import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLogin: boolean;
  constructor(private router: Router) {
    this.isLogin = false;
  }

  public Login(value: boolean) {
    this.isLogin = value;
    if (value) {
      this.router.navigate(['/news']);
    }
  }
}
