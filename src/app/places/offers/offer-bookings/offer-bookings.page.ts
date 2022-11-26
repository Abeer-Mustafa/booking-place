import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from './../../place.module';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  offer: Place;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesServices: PlacesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param=>{
      if(!param.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }

      this.offer = this.placesServices.getPlace(param.get('placeId'));
    });
  }

}
