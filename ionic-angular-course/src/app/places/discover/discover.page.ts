import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadesPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadesPlaces = places;
      this.relevantPlaces = this.loadesPlaces;
      this.listedLoadedPlaces = this.loadesPlaces.slice(1);  // Devuelvo solo el primer elemento
    });
    this.listedLoadedPlaces = this.loadesPlaces.slice(1);
  }

  onOpenMenu(){
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    if(event.detail.value === 'all'){
      this.relevantPlaces = this.loadesPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      // No devuelvo mis 'places'
      this.relevantPlaces = this.loadesPlaces.filter(place => 
        place.userId !== this.authService.userId
      );
    }
  }

  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe(); 
    }
  }

}
