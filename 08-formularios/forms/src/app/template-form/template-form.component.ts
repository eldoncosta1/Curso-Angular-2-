import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: '',
    email: ''
  };

  constructor(
    private http: Http,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form);
    this.http.post('https://httpbin.org/post',JSON.stringify(form.value))
      .map(res => res)
      .subscribe(dados => {
        console.log(dados);
        form.form.reset();
      });

  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo) {
    return {
      'has-error' : this.verificaValidTouched(campo),
      'has-feedback' : this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep, form) {
    //console.log(cep);
    //Nova variável "cep" somente com dígitos.
    var cep = cep.replace(/\D/g, '');

    if(cep != null && cep !== '') {

        //this.resetaDadosForm(form);
        this.cepService.consultaCEP(cep)
          .subscribe(dados => this.populaDadosForm(dados, form));
      }
  }


  populaDadosForm(dados, form) {
    /*form.setValue({
      nome: form.value.nome,
      email: form.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });*/

    form.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

  }

  resetaDadosForm(form) {
    console.log('reset form')
    form.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }


}
