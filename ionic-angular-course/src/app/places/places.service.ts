import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place('p1',
    'Manhjatan',
    'Lindo lugar',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg',
     2000,
     new Date('2020-01-01'),
     new Date('2020-12-31'),
     'abc'
     ),
    new Place('p2',
    'Manhjatan 2',
    'Lindo lugar 2',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg',
    4000,
    new Date('2020-01-01'),
    new Date('2020-12-31'),
    'bcs'
    ),
    new Place('p3',
    'Manhjatan 3',
    'Lindo lugar32',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg',
    3000,
    new Date('2020-01-01'),
    new Date('2020-12-31'),
    'pos'
    )
  ];

  get places() {
    return [...this._places];
  }


  constructor(private authService: AuthService) { }

  getPlace(id: string){
    return {
      ...this._places.find(
      p => p.id === id
      )
    };
  }

  addPlace(title: string,description: string,price: number,dateFrom: Date,dateTo: Date){
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this._places.push(newPlace);
  }
}
