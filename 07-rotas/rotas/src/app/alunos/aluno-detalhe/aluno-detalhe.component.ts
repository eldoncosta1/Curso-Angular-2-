import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from './../alunos.service';
import { Aluno } from './../aluno';


@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {

  id: number;
  inscricao: Subscription;  
  aluno: Aluno;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _alunosService: AlunosService
  ) { }

  ngOnInit() {
    /*this.inscricao = this._route.params.subscribe((params: any) => {
      this.id = params['id'];
      this.aluno = this._alunosService.getAluno(this.id);

      if(this.aluno == null) {
        //this._router.navigate(['/alunos']);
        this.aluno = {};
      }
    });*/
    console.log('ngOnInit: AlunoDetalheComponent');

    this.inscricao = this._route.data.subscribe(
      (info) => {
        console.log('Recebendo o obj Aluno do resolver');
        this.aluno = info.aluno;
      }
    )
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  editarAluno() {
    this._router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

}
 