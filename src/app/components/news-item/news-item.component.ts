import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {

  @Input()
  public newsItem: Article;

  @Input()
  public inFavorite: boolean = false;

  @Input()
  public index: number;

  constructor(
    private inAppBrowsser: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService
  ) { }

  ngOnInit() {
    console.log(this.inFavorite);
  }

  public openNewsItem(): void {
    console.log('Noticia: ', this.newsItem.url);

    this.inAppBrowsser.create(this.newsItem.url, '_system');
  }

  public async openMenu() {

    let favoriteButton;

    if (this.inFavorite) {
      favoriteButton = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.dataLocalService.deleteNewsItem(this.newsItem);
        }
      }
    } else {
      favoriteButton = {
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.saveNewsItem(this.newsItem);
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked 1');
          this.socialSharing.share(
            this.newsItem.title,
            this.newsItem.source.name,
            '',
            this.newsItem.url
          );
        }
      },
      favoriteButton, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
