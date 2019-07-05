import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { FormGroup, FormControl } from "@angular/forms";
import { TheaterService } from '../shared/theater.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { SeatService } from '../shared/seat.service';
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
  theater = new TheaterService();
  result = {};
  totalSale = {};
  constructor() { }
  shows = [];
  displaySeat = [];
  allShowData = {}
  seat: SeatService;
  selected: string[] = [];
  reserved: string[] = [];
  displayShowSeats: boolean = false;
  selectedShowNum: number;
  ngOnInit() {
    for (var i = 1; i < 27; i++) {
      this.displaySeat.push();
    }
    this.theater.addShow(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'], 1);
    this.theater.addShow(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B2', 'B3', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'], 2);
    this.theater.addShow(['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'], 3);


    // console.log(' this.shows ', this.shows);

  }

  selectShow(show: number) {
    // console.log("show", show);
    this.selectedShowNum = show;
    this.allShowData = this.theater.getShows(show);
    // console.log("show--------------", this.allShowData);
    this.getShowSeats(this.allShowData)

  }
  getShowSeats(show: any) {

    // console.log("data", )
    if (this.displaySeat.length > 0) {
      for (let j = 1; j < Object.keys(show.seats).length; j++) {

        let x = Object.keys(show.seats)[j];
        this.displaySeat.push(x);
        this.displayShowSeats = true;
      }
    } else {
      this.displaySeat = []
      for (let j = 1; j < Object.keys(show.seats).length; j++) {

        let x = Object.keys(show.seats)[j];
        this.displaySeat.push(x);
        this.displayShowSeats = true;
      }
    }


    // console.log("final arr", this.displaySeat)
  }

  bookSeats(showNum: number, seatStr: string) {
    this.result = this.theater.bookSeats(showNum, seatStr)
    // console.log("this.result", this.result)
    this.totalSale = this.theater.getTotals()
    // console.log("this.result", this.totalSale)
  }

  getStatus = function (seatPos: string) {
    if (this.allShowData.seats[seatPos].isBook !== false) {
      return 'reserved';
    } else {
      return 'selected';
    }
  }
  //clear handler
  clearSelected = function () {
    this.selected = [];
  }
  //click handler

  seatClicked = function (seatPos: string) {
    console.log("seatPos", seatPos)
    var index = this.selected.indexOf(seatPos);

    if (index !== -1) {
      // seat already selected, remove
      this.selected.splice(index, 1)
    } else {
      //push to selected array only if it is not reserved
      if (this.reserved.indexOf(seatPos) === -1)
        this.selected.push(seatPos);
    }
  }
  showSelected = function () {
    if (this.selected.length > 0) {
      // console.log("this.selected", this.selected)
      let newSeatsArr = this.selected.toString();
      this.bookSeats(this.selectedShowNum, newSeatsArr);
    } else {
      alert("No seats selected!");
    }
  }
}

