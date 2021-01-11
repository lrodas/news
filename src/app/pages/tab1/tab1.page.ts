import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public news: Article[];

  constructor(
    private newsService: NewsService
  ) {}

  public ngOnInit(): void {
    this.news = [];
    this.loadNews();
  }

  public loadData(event: any): void {
    this.loadNews(event);
  }

  private loadNews(event?: any): void {
    this.newsService.retrieveTopHeadLines()
      .subscribe(resp => {

        if (resp.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.news.push(...resp.articles);
        if (event) {
          event.target.complete();
        }
      });
  }
}
