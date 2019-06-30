import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: 'app-bookpage',
  templateUrl: './bookpage.component.html',
  styleUrls: ['./bookpage.component.scss']
})
export class BookpageComponent implements OnInit {


  form = new FormGroup({
    showNumber: new FormControl(""),
    seatNumber: new FormControl("")
  });
  theater = new Theater();
  result = {};
  totalSale = {};
  constructor() { }

  ngOnInit() {
    this.theater.addShow(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'], 1);
    this.theater.addShow(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B2', 'B3', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'], 2);
    this.theater.addShow(['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'], 3);
    // console.log(theater.bookSeats(1, 'B1, B4'));
    // console.log("----------------------------------");
    // console.log(theater.bookSeats(1, 'B1, B3'));
    // console.log("----------------------------------");
    // console.log(theater.bookSeats(2, 'A1, A2, A3'));
    // console.log("----------------------------------");
    // console.log("Total Sales: ", theater.getTotals());
    // console.log("----------------------------------");
  }

  submitForm() {
    this.result = this.theater.bookSeats(this.form.value.showNumber, this.form.value.seatNumber)
    console.log("this.result", this.result)
    this.totalSale = this.theater.getTotals()
    console.log("this.result", this.totalSale)
  }

}

export class Calculator {

  static serviceTax: number = 0.14;
  static swachhBharta: number = 0.005;
  static krishiKalyanCess: number = 0.005;

  public static calculateTotals(givenseats: Seat[]) {
    let serviceTax: number = 0;
    let swachhBharta: number = 0;
    let krishiKalyanCess: number = 0;
    let subTotal: number = 0;
    let total: number = 0;
    givenseats.forEach(oneseat => {
      subTotal += oneseat.getPrice();
    });
    //TODO: remove hardcoded percentages
    serviceTax = subTotal * Calculator.serviceTax;
    swachhBharta = subTotal * Calculator.swachhBharta;
    krishiKalyanCess = subTotal * Calculator.krishiKalyanCess;
    total = (subTotal + serviceTax + swachhBharta + krishiKalyanCess);
    return {
      serviceTax: serviceTax,
      swachhBharta: swachhBharta,
      krishiKalyanCess: krishiKalyanCess,
      subTotal: subTotal,
      total: Math.floor(total),
    };
    //return "SubTotal: Rs." + subTotal + "Service Tax @14%: Rs." + serviceTax + "Swachh Bharat Cess @0.5%: Rs." + swachhBharta + "Krishi Kalyan Cess @0.5%: Rs." + krishiKalyanCess + "Total: Rs." + total
  };

}

export class Seat {
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
    this.price = Seat.priceMap[this.type];
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

export class Show {
  audi: number;
  seats = {
  }

  constructor(seatsArr: string[], audi: number) {
    seatsArr.forEach(seat => {
      this.audi = audi;
      let type = seat.substr(0, 1)
      this.seats[seat] = new Seat(type);
    })
  }


  bookSeats(inputSeats: string) {
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
      return Calculator.calculateTotals(bookedSeats);
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
    return Calculator.calculateTotals(bookedSeats);
  }
}

export class Theater {
  shows: Show[] = [];

  addShow(seatsArr: string[], audi: number) {
    let show = new Show(seatsArr, audi);
    this.shows.push(show);
  }

  bookSeats(showno: number, inputSeats: string) {
    return this.shows[showno - 1].bookSeats(inputSeats);
  }

  getTotals() {
    let totals = {
      serviceTax: 0,
      swachhBharta: 0,
      krishiKalyanCess: 0,
      subTotal: 0,
      total: 0
    };
    this.shows.forEach(show => {
      let temptotals = show.getShowTotalAmounts();
      totals.serviceTax += temptotals.serviceTax;
      totals.swachhBharta += temptotals.swachhBharta;
      totals.krishiKalyanCess += temptotals.krishiKalyanCess;
      totals.subTotal += temptotals.subTotal;
      totals.total += temptotals.total;
    });
    return totals;
  }
}
