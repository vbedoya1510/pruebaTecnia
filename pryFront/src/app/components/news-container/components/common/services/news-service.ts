import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { NewsModel } from '../models/news.model';

@Injectable({
    providedIn: 'root',
  })
  export class NewsService {
    token: string;

    constructor(private http: HttpClient) {
      this.token = localStorage.getItem('token');
    }

    getNews(data: any): Observable<any> {
      return this.http.post(environment.apiURLGetNews, {'user_id': data, 'token': this.token});
    }

    addNew(news: NewsModel): Observable<any> {
      return this.http.post(environment.apiURLAddNew, {'post': news, 'token': this.token});
    }

    deleteNew(data: any): Observable<any> {
      return this.http.post(environment.apiURLDeleteNew, {'post_id': data, 'token': this.token});
    }
  }
