import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  rates = [1, 2, 3, 4, 5];
  rate = 0;
  previousRate: number;
  @Output() rated = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  setRate(r: number) {
    this.rate = r;
    this.previousRate = undefined;
    this.rated.emit(this.rate);
  }

  mouseEnter(r: number) {
    this.previousRate = this.rate;
    this.rate = r;
  }

  mouseLeave() {
    if (this.previousRate !== undefined) {
      this.rate = this.previousRate;
      this.previousRate = undefined;
    }
  }

}
