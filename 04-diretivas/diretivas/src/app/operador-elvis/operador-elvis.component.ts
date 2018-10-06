import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operador-elvis',
  templateUrl: './operador-elvis.component.html',
  styleUrls: ['./operador-elvis.component.css']
})
export class OperadorElvisComponent implements OnInit {

  tarefa: any = {
    descricao: 'Descrição da tarefa',
    responsavel: {
      usuario: {
        nome: 'Eldon',
        idade: null
      }
    }
    //responsavel: { nome: 'Eldon' }
  };

  constructor() { }

  ngOnInit() {
  }

}
