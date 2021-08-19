import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {
  private _places  = new BehaviorSubject<Place[]>([
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
  ]);

  get places() {
    // Devuelvo los 'places' como observable para poder subscribirse desde afuera     
    return this._places.asObservable();
  }


  constructor(private authService: AuthService) { }

  getPlace(id: string){
    return this.places.pipe(
      take(1),  // Obtengo solo el ultimo 'place'
      map(places => {
        places.find(p => p.id === id)
    })
    );
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
    // Me subscribo al observable 'places'
    // Solo quiero obtener el conjunto actual de lugares y no recibir las actualizaciones futuras
    // Llamo al metodo pipe que existe en cada observable
    // take(1) nos permite obtener la ultima lista de lugares y no lugares futuros

    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        // Agrego el nuevo place 'newPlace' a places
        // Luego con next emitimos el nuevo 'places'
        this._places.next(places.concat(newPlace));
        })
    );
}

updatePlace(placeId: string, title: string, description: string) {
  return this.places.pipe(
    take(1),
    delay(1000),
    tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Place(
        oldPlace.id,
        title,
        description,
        oldPlace.imageUrl,
        oldPlace.price,
        oldPlace.availableFrom,
        oldPlace.availableTo,
        oldPlace.userId
      );
      this._places.next(updatedPlaces);
    })
  );
}
}
