import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

import { Place } from './../place.module';
import { PlacesService } from './../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers: Place[];

  constructor(
    private servicePlaces: PlacesService,
    private route: Router
    ) { }

  ngOnInit() {
    this.offers = this.servicePlaces.places;
  }

  onEdit(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.route.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }

}
