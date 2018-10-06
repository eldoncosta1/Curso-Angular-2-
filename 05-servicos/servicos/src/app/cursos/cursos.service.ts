import { Injectable, EventEmitter } from "@angular/core";
import { LogService } from "../shared/log.service";

@Injectable()
export class CursosService {

    emitirCursoCriado = new EventEmitter<string>();
    static criouNovoCurso = new EventEmitter<string>();

    private _cursos: string[] = ["Angular 2", "Java", "PhoneGap"];

    constructor(private _logService: LogService) {
        console.log('CursosService');
    }
    
    getCursos() {
        this._logService.consoleLog('Obtendo lista de cursos');
        return this._cursos;
    }

    addCurso(curso: string) {
        this._logService.consoleLog(`Criando um novo curso ${curso}`);
        this._cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
        CursosService.criouNovoCurso.emit(curso);
    }
}