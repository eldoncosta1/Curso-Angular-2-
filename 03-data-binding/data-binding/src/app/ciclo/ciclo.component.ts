import { 
  Component, 
  OnChanges, 
  OnInit,
  DoCheck, 
  AfterContentInit, 
  AfterContentChecked, 
  AfterViewInit,
  AfterViewChecked, 
  OnDestroy, 
  Input} from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnChanges, OnInit,
DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
AfterViewChecked, OnDestroy {

  @Input() valorInicial: number = 10;

  constructor() { 
    this.log('constructor')
  }

  ngOnInit() {
    this.log('ngOnInit');
  }

  ngOnCheck(){
    this.log('ngOnCheck');
  }

  ngAfterContentInit(){
    this.log('ngAfterContentInit');
  }

  ngAfterViewInit(){
    this.log('ngAfterViewInit');
  }

  ngAfterViewChecked(){
    this.log('ngAfterViewChecked');
  }

  ngDoCheck(){
    this.log('ngDoCheck');
  }

  ngAfterContentChecked(){
    this.log('ngAfterContentChecked');
  }

  ngOnChanges() {
    this.log('ngOnChanges');
  }

  ngOnDestroy(){
    this.log('ngOnDestroy');
  }

  private log(hook: string) {
    console.log(hook);
  }

}
