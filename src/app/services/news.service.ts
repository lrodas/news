import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TopHeadLines } from '../interfaces/interfaces';


const apiKey = environment.newsKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public headLinesPage = 0;
  public activeCategory: string;
  public pageCategory: number;

  constructor(
    private http: HttpClient
  ) {
    this.activeCategory = '';
    this.pageCategory = 0;
  }

  private executeQuery<T>(query: string): Observable<T> {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  public retrieveTopHeadLines(): Observable<TopHeadLines> {

    this.headLinesPage++;
    return this.executeQuery<TopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
  }

  public retrieveTopHeadLinesPerCategory(category: string): Observable<TopHeadLines> {
    if (this.activeCategory === category) {
      this.pageCategory++;
    } else {
      this.pageCategory = 1;
      this.activeCategory = category;
    }
    return this.executeQuery<TopHeadLines>(`/top-headlines?country=us&category=${category}&page=${this.pageCategory}`)
  }
}
