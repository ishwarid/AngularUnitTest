import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  type: string;
  isBooked: boolean = false;
  price: number;
  static priceMap = {
    'A': 320,
    'B': 280,
    'C': 240
  }

  constructor(type: string) {
    this.type = type;
    this.price = SeatService.priceMap[this.type];
  }

  checkSeatAvailabe() {
    // check if seat is availabe or not
    if (this.isBooked == false) {
      return true
    } else {

      return false;
    }
  }

  bookSelectedSeat() {

    // if seat is availabe then mark isbook true to block the seat
    if (this.checkSeatAvailabe() == true) {
      this.isBooked = true;
      return true;
    }
    else {
      return false;

    }

  }

  getPrice() {
    return this.price;
  }
}
