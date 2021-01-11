import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  @Input()
  public news: Article[];

  @Input()
  public inFavorite: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
