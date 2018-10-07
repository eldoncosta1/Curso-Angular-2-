import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { IFormCanDeactivate } from '../../guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, IFormCanDeactivate {

  id: number;
  inscricao: Subscription;  
  aluno: any = {};
  private formMudou: boolean = false;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _alunosService: AlunosService
  ) { }

  ngOnInit() {
    this.inscricao = this._route.params.subscribe((params: any) => {
      this.id = params['id'];
      this.aluno = this._alunosService.getAluno(this.id);

      if(this.aluno == null) {
        //this._router.navigate(['/alunos']);
        this.aluno = {};
      }
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  onInput() {
    console.log('onInput');
    this.formMudou = true;
  }

  podeMudarRota() {
    if(this.formMudou) {
      confirm("Tem certeza que deseja sair dessa página");
      
    }
    return true;
  }

  podeDesativar() {    
    return this.podeMudarRota();
  }


}
