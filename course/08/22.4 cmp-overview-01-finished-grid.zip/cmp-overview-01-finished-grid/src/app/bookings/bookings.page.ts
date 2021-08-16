import { Component, OnInit } from '@angular/core';

import { BookingService } from './booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
  }

}
