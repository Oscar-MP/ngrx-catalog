import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[matBadge][matBadgeIcon]'
})
export class MatBadgeIconDirective implements OnInit {

  @Input() matBadgeIcon!: string;

  constructor(
    private _el: ElementRef
  ) { }

  ngOnInit(): void {

    if (!this.matBadgeIcon) throw new Error('An icon must be specified');

    const badge = this._el.nativeElement.querySelector('.mat-badge-content');
    badge.style.display = 'flex';
    badge.style.alignItems = 'center';
    badge.style.background = "#434343";
    badge.style.right = '-1.5em';
    badge.style.justifyContent = 'center';
    badge.innerHTML = `<i class="material-icons" style="font-size: 14px">${this.matBadgeIcon}</i>`;
  }

}
