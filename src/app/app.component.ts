import {Component, OnInit} from '@angular/core';
import {MediaService} from "./shared/services/media.service";
import {Media} from "./shared/models/media.model";

@Component({
  selector: 'app-root',
  template: `
    <div id="media" class="media-container" *ngIf="currentMedia">
      <a (click)="$event.preventDefault(); onClickOverMedia()" class="media-link">
        <img class="media-img" 
             [src]="currentMedia.link"
             (wheel)="onWheelOverMedia($event)">
      </a>
      <div class="media-text">
        <span class="media-title">{{currentMedia.title}}</span>
        <span class="media-description">{{currentMedia.description}}</span>
      </div>
      <div class="media-tags">
        <span class="media-tag" *ngFor="let tag of currentMedia.tags">#{{tag}}</span>
      </div>
    </div>
  `,
  styles: [
    `.media-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .blurred-media-container {
      filter: blur(3px);
    }
    
    .media-link {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 5% 0 10px 0;
    }
    
    .media-img {
      display: block;
      max-width: 1200px;
      max-height: 500px;
      height: 100%;
    }
    
    .media-text {
      width: 60%;
      max-height: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
    }
    
    .media-title {
      display: block;
      margin: 5px;
      font-size: 1.5rem;
    }
    
    .media-description {
      display: block;
      margin: 5px;
      font-size: 1rem;
      overflow: scroll;
    }::-webkit-scrollbar {
       width: 0;
       background: transparent;
     }
    
    .media-tags {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin: 10px;
      font-size: 1rem;
      flex: 1;
      align-items: flex-end;
    }
    
    .media-tag {
      
    }`,
    `@media only screen
      and (min-width: 568px)
      and (max-width: 1200px) {
      .media-text {
        width: 80%;
      }
    }
      
     @media only screen
     and (max-width : 568px) {
      .media-text {
        width: 100%;
      }
      
      .media-link {
        padding-top: 0;
        flex: 1;
        min-height: 70%;
      }
    }`
  ]
})
export class AppComponent implements OnInit {

  constructor(private _media_service: MediaService) { }

  currentMedia: Media;

  ngOnInit() {
    this._media_service.getNextMedia(0)
      .subscribe(
        media => {
          this.currentMedia =
            new Media(media.id, media.type, media.link, media.title, media.description, media.tags);
        },
        error => {
        }
      );
  }

  private onClickOverMedia() {
    this.getNextMedia();
  }

  private onWheelOverMedia(event) {
    if (!event) { return; }

    if (event.deltaY < 0) {
      this.getNextMedia();
    }
    if (event.deltaY > 0) {
      this.getPreviousMedia();
    }
  }

  private getNextMedia() {
    const container: HTMLElement = document.getElementById('media');
    if (container) container.classList.add('blurred-media-container');

    this._media_service.getNextMedia(this.currentMedia.id)
      .subscribe(
        media => {
          this.currentMedia =
            new Media(media.id, media.type, media.link, media.title, media.description, media.tags);
          if (container) container.classList.remove('blurred-media-container');
        },
        error => {
        }
      );
  }

  private getPreviousMedia() {
    const container: HTMLElement = document.getElementById('media');
    if (container) container.classList.add('blurred-media-container');

    this._media_service.getPreviousMedia(this.currentMedia.id)
      .subscribe(
        media => {
          this.currentMedia =
            new Media(media.id, media.type, media.link, media.title, media.description, media.tags);
          if (container) container.classList.remove('blurred-media-container');
        },
        error => {

        }
      );
  }
}
