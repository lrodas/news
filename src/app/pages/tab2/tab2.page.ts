import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  public categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  public news: Article[];
  
  constructor(
    private newsService: NewsService
  ) {}

  public ngOnInit(): void {
    this.news = [];
    this.segment.value = this.categories[0];
    this.loadNews(this.categories[0]);
  }

  public changeTab(event: any): void {
    this.news = [];
    this.loadNews(event.detail.value);
  }

  public loadData(event: any): void {
    this.loadNews(this.segment.value, event);
  }

  private loadNews(category: string, event?: any): void {
    this.newsService.retrieveTopHeadLinesPerCategory(category)
    .subscribe(resp => {

      if (event && resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
      }

      this.news.push(...resp.articles);

      if (event) {
        event.target.complete();
      }
    });
  }

}
