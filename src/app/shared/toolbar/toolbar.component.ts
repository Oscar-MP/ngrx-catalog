import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';

interface ITitleLink {
  text: string;
  link: any[];
  style?: any;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  @Input() title: string = "";
  @Input() link: ITitleLink | null = null;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  navigateBack( event: Event ): void {
    this.location.back();
  }
}
