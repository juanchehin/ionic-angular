import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from '../../places/places.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectMode: 'select' | 'random';
  @ViewChild('f') form: NgForm;
  startDate: string;
  endDate: string;


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const avalaibleFrom = new Date(this.selectedPlace.avalaibleFrom);
    const avalaibleTo = new Date(this.selectedPlace.avalaibleTo);
    if(this.selectMode === 'random'){
      this.startDate = new Date(avalaibleFrom.getTime() + (Math.random() * avalaibleTo.getTime() - 7 * 24 * 60 * 60 * 1000)).toISOString();

      this.endDate = new Date(this.startDate).getTime() + Math.random() * (new Date(this.startDate).getTime() + 9 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime()).toISOString();
    }


  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace(){
    if(!this.form.valid || !this.datesValid){
      return; 
    }
    this.modalCtrl.dismiss({ bookingData: {
      firstName: this.form.value['first-name'],
      lastName: this.form.value['last-name'],
      guestNumber: this.form.value['guest-name'],
      startDate: this.form.value['date-from'],
      endDate: this.form.value['date-to']
    }}, 'confirm');
  }

  datesValid(){
    const startDate = this.form.value['date-from'];
    const endDate = this.form.value['date-to'];
  
    return endDate > startDate;
  }

}
