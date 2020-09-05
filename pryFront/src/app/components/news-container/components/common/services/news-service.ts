import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { NewsModel } from '../models/news.model';

@Injectable({
    providedIn: 'root',
  })
  export class NewsService {
    constructor(private http: HttpClient) {}



    getNews(data: any, token: string): Observable<any> {
      // return this.http.post(environment.apiURLGetNews, data, {headers: new HttpHeaders({ "Authorization": "Bearer "+token})});
      return this.http.post(environment.apiURLGetNews, data);
    }

    addNew(news: NewsModel): Observable<any> {
      return this.http.post(environment.apiURLAddNew, news);
    }

    deleteNew(data: any): Observable<any> {
      return this.http.post(environment.apiURLDeleteNew, data);
    }
  }
