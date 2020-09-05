import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { LoginComponent } from '../components/login/login.component';
import { NewsFormComponent } from '../components/news-container/components/news-form/news-form/news-form.component';
import { NewsComponent } from '../components/news-container/components/news/news.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create/news',
    component: NewsFormComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'home',
    component: AppComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}