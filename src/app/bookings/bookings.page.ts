import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { IonItemSliding } from '@ionic/angular';

import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings: Booking[];

  constructor(
    private bookinsService: BookingService
  ) { }

  ngOnInit() {
    this.loadedBookings = this.bookinsService.bookings;
  }

  onCancel(bookingId: string, slidingItem: IonItemSliding){
    slidingItem.close();

  }
}
