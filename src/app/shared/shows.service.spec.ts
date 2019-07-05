import { TestBed } from '@angular/core/testing';

import { ShowsService } from './shows.service';

describe('ShowsService', () => {
  let showObj: ShowsService;

  beforeEach(() => TestBed.configureTestingModule({}));


  it('check show  booking not availabel for given seats', () => {
    let seatsArr = ["A1, B1, B2"]
    let audi =1;
    showObj = new ShowsService(seatsArr,audi)
    let result = showObj.bookSeats('A2')
    expect(result).toBe("A2 Not available, Please select different seats")
   
  });
  it('check show  booking  availabel for given seats', () => {
    let seatsArr = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']
    let audi = 2;
    let result ={}
    let expected ={}
    showObj = new ShowsService(seatsArr,audi)
    result = showObj.bookSeats('A6')
    expected = { serviceTax: 44.800000000000004, swachhBharta: 1.6, krishiKalyanCess: 1.6, subTotal: 320, total: 368 }
    expect(result).toEqual(expected) 
  });
});
