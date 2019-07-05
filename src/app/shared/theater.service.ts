import { Injectable } from '@angular/core';
import { ShowsService } from './shows.service';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  shows: ShowsService[] = [];

  addShow(seatsArr: any[], audi: number) {
    let show = new ShowsService(seatsArr, audi);
    this.shows.push(show);
  }

  bookSeats(showno: number, inputSeats: string) {
    return this.shows[showno - 1].seatBooking(inputSeats);
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


  getShows(showNum: number) {
    let data;
    this.shows.forEach((show, index) => {
      console.log("index", index)
      if (index === showNum) {
        data = show;

      }
    })

    return data
  }
}
