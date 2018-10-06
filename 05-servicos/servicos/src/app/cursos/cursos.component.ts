import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [CursosService]
})
export class CursosComponent implements OnInit {

  cursos: string[] = [];
  
  constructor(private _cursosService: CursosService) { 
    //this.cursosService = new CursosService();
    //this.cursos = _cursosService.getCursos();
  }

  ngOnInit() {
    this.cursos = this._cursosService.getCursos();

    CursosService.criouNovoCurso.subscribe(curso => {
        // emitida via eventemmiter de uma nova instancia do CursoService
        this.cursos.push(curso);
    });
  }

}
