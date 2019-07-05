import { TestBed } from '@angular/core/testing';

import { TheaterService } from './theater.service';

describe('TheaterService', () => {
  let theaterObj: TheaterService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheaterService = TestBed.get(TheaterService);
    expect(service).toBeTruthy();
  });
  it('check theater  final bookSeats() ', () => {
    let result1 = {serviceTax: 134.4, swachhBharta: 4.8, krishiKalyanCess: 4.8, subTotal: 960, total: 1104}
    let result2 = {serviceTax: 134.4, swachhBharta: 4.8, krishiKalyanCess: 4.8, subTotal: 960, total: 1104}
    let result3  = {serviceTax: 268.8, swachhBharta: 9.6, krishiKalyanCess: 9.6, subTotal: 1920, total: 2208}
     theaterObj = new TheaterService();
 
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
      theaterObj = new TheaterService();
  
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
