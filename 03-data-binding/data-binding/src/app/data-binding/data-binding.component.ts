import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css'],
  /*styles: [
    `
      .highlight {
        background: yellow;
      }
    `
  ]*/
})
export class DataBindingComponent implements OnInit {

  url: string = 'https://github.com/eldoncosta1';
  cursoAngular: boolean = true;
  urlImagem = 'https://picsum.photos/400/200/?random';

  valorAtual: string = '';
  valorSalvo: string = '';

  isMouseOver: boolean = false;

  nomeDoCurso: string = 'Angular';

  valorInicial = 15;

  getValor() {
    return 1;
  }

  getCurtirCurso() {
    return true;
  }

  botaoClicado() {
    alert('Botao clicado');
  }

  onKeyUp(evento) {
    this.valorAtual = evento;
  }

  salvarValor(valor) {
    this.valorSalvo = valor;
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento) {
    console.log(evento);
  }

  constructor() { }

  ngOnInit() {
  }

}
