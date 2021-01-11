import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public news: Article[];

  constructor(
    private storage: Storage,
    public toastController: ToastController
  ) {
    this.news = [];
    this.retrieveFavorites();
  }

  public async saveNewsItem(newsItem: Article): Promise<void> {

    const existe = this.news.find(newsItemDB => newsItemDB.title === newsItem.title);
    if (!existe) {
      this.news.unshift(newsItem);
      this.storage.set('favoritos', this.news);
    }

    
    this.showSimpleToast('Favorito guardado con exito!!!');
  }

  public async retrieveFavorites() {
    const favs = await this.storage.get('favoritos')
    if (favs) {
      this.news = favs;
    }
  }

  public deleteNewsItem(newsItem: Article): void {
    this.news = this.news.filter(newsItemDB => newsItemDB.title !== newsItem.title);
    this.storage.set('favoritos', this.news);

    this.showSimpleToast('Favorito eliminado con exito!!!');
  }

  private async showSimpleToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
