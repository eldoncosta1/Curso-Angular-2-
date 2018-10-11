import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/cursos.service';
import { Curso } from '../curso';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[];

  cursos$: Observable<Curso[]>;

  constructor(private cursoService: CursosService) { }

  ngOnInit() {
    /*this.cursoService.listCursos()
      .pipe(
        tap(console.log)
      );**/

      //this.cursoService.listCursos().subscribe(dados => this.cursos = dados);
      this.cursos$ = this.cursoService.listCursos();
  }

}
