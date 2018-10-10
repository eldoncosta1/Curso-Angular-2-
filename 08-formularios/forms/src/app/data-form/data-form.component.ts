import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Http } from '@angular/http';

import { EstadoBr } from './../shared/models/estado-br.model';
import { DropdownService } from './../shared/services/dropdown.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable, empty } from 'rxjs';
import { FormValidations } from '../shared/services/form-validations.service';
import { VerificaEmailService } from './services/verifica-email.service';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  // form: FormGroup;
  estados: EstadoBr[];
  cidades: Cidade[];
  //estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  listNewsletter: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) { 
    super();
  }

  ngOnInit() {

    /*this.form = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)

      endereco: new FormGroup({
        cep: new FormControl(null),
        numero: new FormControl(null),
        complemento: new FormControl(null),
        rua: new FormControl(null),
      })
    });*/

    /*this.dropdownService.getEstadosBr()
      .subscribe(dados => {
        console.log(dados);
        this.estados = dados;
      });*/

    //this.verificaEmailService.verificarEmail('email111@email.com').subscribe();      
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.listNewsletter = this.dropdownService.getNewsletter();

    //this.estados = this.dropdownService.getEstadosBr();
    this.dropdownService.getEstadosBr()
      .subscribe(dados => this.estados = dados);

    this.form = this.formBuilder.group({
      nome: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email], this.validarEmail.bind(this) ],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    //Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

    this.form.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(status => console.log(`Valor do CEP: ${status}`)),
        switchMap(status => status === 'VALID' ? 
          this.cepService.consultaCEP(this.form.get('endereco.cep').value) : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados)  : {}
       /* if (status === 'VALID') {
          this.cepService.consultaCEP(this.form.get('endereco.cep').value)
            .subscribe(dados => this.populaDadosForm(dados))
        }*/
      );

      //this.dropdownService.getCidades(8).subscribe(console.log);
    this.form.get('endereco.estado').valueChanges
        .pipe(
          tap(estado => console.log('Novo estado: ', estado)),
          map(estado => this.estados.filter(e => e.sigla === estado)),
          map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
          switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
          tap(console.log)
        ).subscribe(cidades => this.cidades = cidades);


  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }

  submit() {
    let valueSubmit = Object.assign({}, this.form.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map( (v, i) => v ? this.frameworks[i] : null )
        .filter(v => v !== null)
    });

    console.log(valueSubmit);
    this.http.post('https://httpbin.org/post',JSON.stringify(valueSubmit))
      .map(res => res)
      .subscribe(dados => {
        console.log(dados);
        // reseta o form
        //this.resetar();
      },
      (error: any) => {
        alert('erro');
      });

  }
  
  // metodo sobrescrito
  resetar() {
    this.form.reset();
  }  
    

  consultaCEP() {
    //console.log('consulta cep');

    let cep = this.form.get('endereco.cep').value;

    if(cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }

  }

  populaDadosForm(dados) {

    this.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    //this.form.get('nome').setValue('Eldon');

  }

  resetaDadosForm() {
    console.log('reset form')
    this.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome) : obj1 === obj2;
  }

  compararTecnologias() {

  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
            .pipe(map(emailExiste => emailExiste ? { emailInvalido : true} : null));
  }

  

}
