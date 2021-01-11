import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news-item/news-item.component';



@NgModule({
  declarations: [
    NewsComponent,
    NewsItemComponent
  ],
  exports: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
