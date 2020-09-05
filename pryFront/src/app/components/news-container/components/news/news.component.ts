import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { NewsModel } from '../common/models/news.model';
import { NewsService } from '../common/services/news-service';
import { NgbdSortableHeader, SortEvent } from '../common/directives/sortable.directive';
import { Observable } from 'rxjs';
import { NewsFilterService } from '../common/services/news-filter-service';
import { DecimalPipe } from '@angular/common';
import { COUNTRIES } from '../../../countries';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  providers: [NewsFilterService, DecimalPipe],
})
export class NewsComponent implements OnInit {
  news$: Observable<NewsModel[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  /**
   * error message
   */
  resultMessage: string;

  news: NewsModel[];

  constructor(private newsService: NewsService, public newsFilterService: NewsFilterService) {
    this.news$ = newsFilterService.news$;
    this.total$ = newsFilterService.total$;
    // this.newsFilterService.setList = COUNTRIES;
   }

  ngOnInit(): void {
    this.news = [];
    this.showNews();
    this.resultMessage = '';
  }

  private showNews(){

    const userAux = localStorage.getItem('userId');
    let data= {
      'user_id':userAux
    }

    const token = localStorage.getItem('token');

    this.newsService.getNews(data, token).subscribe(
      response => {
        if(response!= null){
          var listAux : NewsModel [] = [];
          response.forEach(element => {
            if(element.creationDate != null){
              element.creationDate = new Date(parseInt(element.creationDate.substr(6)));
            }
            listAux.push(element);
          });
          this.newsFilterService.setList = listAux;
          // this.news = response;
        }else{
          this.newsFilterService.setList = [];
          this.resultMessage = 'No hay post para el usario';
        }
      },
      (error) => {
        this.newsFilterService.setList = [];
        this.resultMessage = 'Error al consultar las post';
      }
    );
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.newsFilterService.sortColumn = column;
    this.newsFilterService.sortDirection = direction;
  }

  public Delete(news_id: number){
    let data= {
      'post_id' : news_id
    }
    this.newsService.deleteNew(data).subscribe(
      response => {
        var listAux : NewsModel [] = [];
        response.forEach(element => {
          if(element.creationDate != null){
            element.creationDate = new Date(parseInt(element.creationDate.substr(6)));
          }
          listAux.push(element);
        });
        this.newsFilterService.setList = listAux;
      },
      (error) => {
        this.resultMessage = 'an error has occurred, try again' + error;
      }
    );
  }



}
