
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'GitHub Eldon Costa',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(),
    url: 'http://github.com/eldoncosta1'
  }

  filtro: string = '';

  livros: string[] = ["Angular 2", "Java", "PhoneGap"];

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('valor assincrono'), 2000);
  });

  //Observable.
  valorAsync2 = Observable.interval(2000)
    .map(valor => 'Valor assíncrono 2');


  constructor() { }

  ngOnInit() {
  }

  addCurso(curso) {    
    this.livros.push(curso);    
  }

  obterCursos() {

    if(this.livros.length === 0 || this.filtro === undefined ||
       this.filtro.trim() === '') {
      return this.livros;
    }

    return this.livros.filter((v) => {
      if(v.toLocaleLowerCase().indexOf(this.filtro.toLocaleLowerCase()) >= -0) {
        return true;
      }
      return false;
    });  
  }

}
