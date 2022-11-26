import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings: Booking[] = [
    new Booking('xyz', 'abc', 'p1', 'Tartous', 3),
  ];

  get bookings(){
    return [...this._bookings];
  }
}
