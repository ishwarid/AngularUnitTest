import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookpageComponent, Theater, Seat, Calculator, Show } from './bookpage.component';
describe('BookpageComponent', () => {
 
  let bookObj: BookpageComponent;
  let theaterObj: Theater;
  let seatObj: Seat;
  let CalculatorObj: Calculator;
  let showObj: Show;

  beforeEach(() => {
    bookObj = new BookpageComponent();
    theaterObj = new Theater();
    CalculatorObj = new Calculator();
  });
  afterEach(() => {

  });
  it('check seat availability', () => {
    let type = "A1"
    seatObj = new Seat(type.substr(0, 1))
    let result = seatObj.checkSeatAvailabe()
    expect(result).toBe(true)
  });
  it('check seat booking', () => {
    let type = "A1"
    seatObj = new Seat(type.substr(0, 1))
    let result = seatObj.bookSelectedSeat()
    expect(result).toBe(true)

    // same seat not availabel
    result = seatObj.bookSelectedSeat()
    expect(result).toBe(false)
  });
  it('check seat price with diffrent seat types', () => {
    let type = "A1"
    seatObj = new Seat(type.substr(0, 1))
    let result = seatObj.getPrice()
    expect(result).toBe(320)

    type = "B1"
    seatObj = new Seat(type.substr(0, 1))
    result = seatObj.getPrice()
    expect(result).toBe(280)


    type = "C1"
    seatObj = new Seat(type.substr(0, 1))
    result = seatObj.getPrice()
    expect(result).toBe(240)
  });
  it('check show  booking not availabel for given seats', () => {
    let seatsArr = ["A1, B1, B2"]
    let audi =1;
    showObj = new Show(seatsArr,audi)
    let result = showObj.bookSeats('A2')
    expect(result).toBe("A2 Not available, Please select different seats")
   
  });
  it('check show  booking  availabel for given seats', () => {
    let seatsArr = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']
    let audi = 2;
    let result ={}
    let expected ={}
    showObj = new Show(seatsArr,audi)
    result = showObj.bookSeats('A6')
    expected = { serviceTax: 44.800000000000004, swachhBharta: 1.6, krishiKalyanCess: 1.6, subTotal: 320, total: 368 }
    expect(result).toEqual(expected) 
  });
  it('check theater  final bookSeats() ', () => {
   let result1 = {serviceTax: 134.4, swachhBharta: 4.8, krishiKalyanCess: 4.8, subTotal: 960, total: 1104}
   let result2 = {serviceTax: 134.4, swachhBharta: 4.8, krishiKalyanCess: 4.8, subTotal: 960, total: 1104}
   let result3  = {serviceTax: 268.8, swachhBharta: 9.6, krishiKalyanCess: 9.6, subTotal: 1920, total: 2208}
    theaterObj = new Theater();

    theaterObj.addShow(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],2)
    theaterObj.addShow(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],1)    
    let test1 = theaterObj.bookSeats(1,"A1, A2, A3")
    let test2 = theaterObj.bookSeats(2,"A1, A2, A3")
    let test3 =theaterObj.getTotals()
    // console.log("test1", test)
    // console.log("test1", test1)
    // console.log("", theaterObj.getTotals())
    expect(test1).toEqual(result1)
    expect(test2).toEqual(result2)
    expect(test3).toEqual(result3)
    
  });
  it('check theater  final bookSeats() not availabel ', () => {
    let result1 = {serviceTax: 134.4, swachhBharta: 4.8, krishiKalyanCess: 4.8, subTotal: 960, total: 1104}
     theaterObj = new Theater();
 
     theaterObj.addShow(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],2)
     theaterObj.addShow(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9',  'B4', 'B5', 'B6', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],1)    
     let test1 = theaterObj.bookSeats(1,"A1, A2, A3")
     let test2 = theaterObj.bookSeats(2,"B1, B2,B3")
     let test3 =theaterObj.getTotals()
     // console.log("test1", test)
     // console.log("test1", test1)
     // console.log("", theaterObj.getTotals())
     expect(test1).toEqual(result1)
     expect(test2).toEqual("B1,B2,B3 Not available, Please select different seats")
     expect(test3).toEqual(result1)
     
   });
 
});
