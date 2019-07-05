import { TestBed } from '@angular/core/testing';

import { SeatService } from './seat.service';

describe('SeatService', () => {
  let seatObj: SeatService;
  beforeEach(() => TestBed.configureTestingModule({}));


  it('check seat availability', () => {
    let type = "A1"
    seatObj = new SeatService(type.substr(0, 1))
    let result = seatObj.checkSeatAvailabe()
    expect(result).toBe(true)
  });
  it('check seat booking', () => {
    let type = "A1"
    seatObj = new SeatService(type.substr(0, 1))
    let result = seatObj.bookSelectedSeat()
    expect(result).toBe(true)

    // same seat not availabel
    result = seatObj.bookSelectedSeat()
    expect(result).toBe(false)
  });
  it('check seat price with diffrent seat types', () => {
    let type = "A1"
    seatObj = new SeatService(type.substr(0, 1))
    let result = seatObj.getPrice()
    expect(result).toBe(320)

    type = "B1"
    seatObj = new SeatService(type.substr(0, 1))
    result = seatObj.getPrice()
    expect(result).toBe(280)


    type = "C1"
    seatObj = new SeatService(type.substr(0, 1))
    result = seatObj.getPrice()
    expect(result).toBe(240)
  });
});
