import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';

import { PlacesService } from './../../places.service';
import { Place } from './../../place.module';
import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private servicesPlaces: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(pramMap=>{
      if(!pramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.servicesPlaces.getPlace(pramMap.get('placeId'));
    });

  }

  onOpenActionSheet(){
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select date',
          handler: () => this.onBookPlace('select')
        },
        {
          text: 'Random date',
          handler: () => this.onBookPlace('random')
        },
        {
          text: 'Cancel',
          role: 'distructive'
        }
      ]
    }).then(sheetEl => {
      sheetEl.present();
    });
  }

  onBookPlace(mode: 'select' | 'random'){
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place, selectedMode: mode}
    })
    .then(modalEl=>{
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if(resultData.role === 'booked'){
        console.log('You have booked this place!');
      }
    });
  }

}
