import { Component, OnInit } from '@angular/core';

import { AlunosService } from './alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  private _alunos: any = [];

  constructor(private _alunosService: AlunosService) { }

  ngOnInit() {
    this._alunos = this._alunosService.getAlunos();
  }

}
