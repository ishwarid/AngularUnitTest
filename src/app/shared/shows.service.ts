import { Injectable } from '@angular/core';
import { SeatService } from './seat.service';
import { CalculatorService } from './calculator.service';


@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  audi: number;
  seats = {
  }
  
  constructor(seatsArr: string[], audi: number) {
    seatsArr.forEach(seat => {
      this.audi = audi;
      let type = seat.substr(0, 1)
      this.seats[seat] = new SeatService(type);
    })
  }


  seatBooking(inputSeats: string) {
    let allSeatsAvailability = true;
    let nonAvaSeat = [];
    let newSeatsArr = inputSeats.split(',').map(value => {
      return value.trim();
    })

    newSeatsArr.forEach(singlSeat => {
      if (!this.seats[singlSeat]) {
        allSeatsAvailability = false;
          nonAvaSeat.push(singlSeat);
      } else {
        let checkAvailability = this.seats[singlSeat].checkSeatAvailabe();
        if (checkAvailability != true) {
          allSeatsAvailability = false;
          nonAvaSeat.push(singlSeat);
        }
      }

      if (nonAvaSeat.length > -1){
        let returnStr = nonAvaSeat.join(',')
        return returnStr + "Not available, Please select different seats"
      }

    })

    if (allSeatsAvailability) {
      //bookseat
      var bookedSeats = [];
      newSeatsArr.forEach(singlSeat => {
        this.seats[singlSeat].bookSelectedSeat();
        bookedSeats.push(this.seats[singlSeat]);
      });
      return CalculatorService.calculateTotals(bookedSeats);
    } else {
      // print nonAvaSeat nogt aviavlebe
      let retunStr = nonAvaSeat.join(',')
      return retunStr + " Not available, Please select different seats";
    }

    }

  getShowTotalAmounts() {
    var seatNames = Object.keys(this.seats);

    var bookedSeats = [];
    seatNames.forEach(singlSeat => {
      if (this.seats[singlSeat].checkSeatAvailabe() == false)
        bookedSeats.push(this.seats[singlSeat]);
    });
    return CalculatorService.calculateTotals(bookedSeats);
  }
}
