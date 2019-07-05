import { Injectable } from '@angular/core';
import { SeatService } from './seat.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  static serviceTax: number = 0.14;
  static swachhBharta: number = 0.005;
  static krishiKalyanCess: number = 0.005;

  constructor() { }


  public static calculateTotals(givenseats: SeatService[]) {
    let serviceTax: number = 0;
    let swachhBharta: number = 0;
    let krishiKalyanCess: number = 0;
    let subTotal: number = 0;
    let total: number = 0;
    givenseats.forEach(oneseat => {
      subTotal += oneseat.getPrice();
    });
    //TODO: remove hardcoded percentages
    serviceTax = subTotal * CalculatorService.serviceTax;
    swachhBharta = subTotal * CalculatorService.swachhBharta;
    krishiKalyanCess = subTotal * CalculatorService.krishiKalyanCess;
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
