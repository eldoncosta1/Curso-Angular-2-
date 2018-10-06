import { 
  Directive, 
  HostListener, 
  ElementRef, 
  Renderer, 
  HostBinding} from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') OnMouseOver() {
    /*this._renderer.setElementStyle(
      this._elementRef.nativeElement,
      'background-color',
      'yellow');*/
      this.backgroundColor = 'yellow';

  }

  @HostListener('mouseleave') OnMouseLeave() {
    /*this._renderer.setElementStyle(
      this._elementRef.nativeElement,
      'background-color',
      'white');*/
      this.backgroundColor = 'white';
  }

  //@HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.backgroundColor') get setColor(){
    // utilizando essa maneira podemos adicionar codigo extra antes de setar o valor da variavel
    return this.backgroundColor;
  }
  private backgroundColor: string;



  constructor( 
    private _elementRef: ElementRef,
    private _renderer: Renderer) { }

}
