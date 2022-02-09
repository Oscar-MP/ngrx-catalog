import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: number = 0;
  @Input() allowRating: boolean = false;
  @Output() onRate: EventEmitter<number> = new EventEmitter<number>();

  public currentHoverStar: number | null = null;

  constructor() {}

  ngOnInit(): void {
  }

  createArray(n: number): any[]{
    return new Array(n);
  }

  isActive( i: number ): boolean {
    return i < this.rating;
  }

  onStarClicked( event: Event, index: number ): void {
    if (this.allowRating) this.onRate.emit(index + 1)
  }

  onStarHover( event: Event, index: number ): void {
    this.currentHoverStar = index;
  }

  onMouseOutOfRange(): void {
    this.currentHoverStar = null;
  }
}
