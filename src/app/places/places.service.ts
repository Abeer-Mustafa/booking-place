/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Place } from './place.module';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [
    new Place(
      'p1',
      'Tartous',
      'in the heart of Syria',
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/New_York_City_skyline_2.jpg',
      149.99,
      new Date(2019, 1, 1),
      new Date(2019, 12, 31),
      'abc'
    ),

    new Place(
      'p2',
      'Homs',
      'in the heart of Syria too',
      'https://upload.wikimedia.org/wikipedia/commons/d/dd/Long_Island_City_New_York_May_2015_panorama_3.jpg',
      78,
      new Date(2020, 1, 1),
      new Date(2020, 12, 31),
      'abc'
    ),

    new Place(
      'p3',
      'The foggy place',
      'Not your average trip!',
      'https://upload.wikimedia.org/wikipedia/commons/7/75/BC_Place_and_Viaduct%2C_foggy_-_Flickr_-_colink..jpg',
      30.99,
      new Date(2021, 1, 1),
      new Date(2021, 12, 31),
      'abc'
    )
  ];

  constructor() { }

  get places(){
    return [...this._places];
  }

  getPlace(id: string){
    return {...this._places.find(place => place.id === id)};
  }

}
