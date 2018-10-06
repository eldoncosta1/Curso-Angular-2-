import { 
  Directive, 
  HostListener, 
  HostBinding, 
  Input} from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') OnMouseOver() {   
      this.backgroundColor = this.highlightColor;

  }

  @HostListener('mouseleave') OnMouseLeave() {
      this.backgroundColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') backgroundColor: string;

  @Input() defaultColor: string = 'white';
  @Input() highlightColor: string = 'yellow';

  constructor() { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

}
