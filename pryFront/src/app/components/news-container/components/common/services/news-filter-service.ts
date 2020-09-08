import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from '../directives/sortable.directive';
import { NewsModel } from '../models/news.model';

interface SearchResult {
  news: NewsModel[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  list: NewsModel[];
}

const compare = (v1: string , v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(news: NewsModel[], column: SortColumn, direction: string): NewsModel[] {
  if (direction === '' || column === '') {
    return news;
  } else {
    return [...news].sort((a, b) => {
      const res = compare(a[column.toString()], b[column.toString()]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(news: NewsModel, term: string, pipe: PipeTransform) {
  return news.title.toLowerCase().includes(term.toLowerCase())
    || news.content.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class NewsFilterService {
  public _loading$ = new BehaviorSubject<boolean>(true);
  public _search$ = new Subject<void>();
  public _news$ = new BehaviorSubject<NewsModel[]>([]);
  public _total$ = new BehaviorSubject<number>(0);

  public _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    list: []
  };

  constructor(public pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
       switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._news$.next(result.news);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get news$() { return this._news$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
  set setList(list: NewsModel[]) { this._set({list}); }

  public _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  public _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm, list} = this._state;

    // 1. sort
    let news = sort(list, sortColumn, sortDirection);

    // 2. filter
    news = news.filter(currentNew => matches(currentNew, searchTerm, this.pipe));
    const total = news.length;

    // 3. paginate
    news = news.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({news, total});
  }
}