/* eslint-disable max-len */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from './../../places/place.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', { static: true }) form: NgForm;
  startDate: string;
  endDate: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if(this.selectedMode === 'random'){
      // getTime: get the time in miliseconds
      // make START booking valid from: AVAILABLEFROM of the place to: AVAILABLETO minus a week
      // make END booking valid from: START to: START plus 6 days
      this.startDate = new Date(availableFrom.getTime() + Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())).toISOString();
      this.endDate = new Date(new Date(this.startDate).getTime() + Math.random() * (new Date(this.startDate).getTime() + 6 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime())).toISOString();
    }
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'closed');
  }

  onBookPlace(){
    if(!this.form.valid || !this.datesValid()){
      return;
    }
    this.modalCtrl.dismiss({
      bookingData:{
        firstName: this.form.value['first-name'],
        lastName: this.form.value['last-name'],
        numOfGuests: this.form.value['guest-number'],
        dateForm: this.form.value['date-from'],
        dateTo: this.form.value['date-to'],
      },
      role: 'booked'
    }, 'confirm');
  }

  datesValid(){
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }
}
