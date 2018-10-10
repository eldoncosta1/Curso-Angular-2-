import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'  
})
export abstract class BaseFormComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  abstract submit();

  onSubmit() {
    if (this.form.valid) {
      this.submit();
    } else {
      console.log('form invalido');
      this.verificaValidacoesForm(this.form);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campoDoForm) => {
      let controle = formGroup.get(campoDoForm);
      controle.markAsDirty();
      controle.markAsTouched();
      if(controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  verificaValidTouched(campo) {    
    return (
      !this.form.get(campo).valid &&
     (this.form.get(campo).touched || this.form.get(campo).dirty)
    );
  }

  verificaRequired(campo) {
    return this.form.get(campo).hasError('required') &&
     (this.form.get(campo).touched || this.form.get(campo).dirty)
  }

  verificaEmailInvalido(campo: string) {
    let campoValue = this.form.get(campo);
    if(campoValue.errors) {
      return campoValue.errors[campo] && campoValue.touched;
    }
  }

  aplicaCssErro(campo: string) {    
    return {
      'has-error' : this.verificaValidTouched(campo),
      'has-feedback' : this.verificaValidTouched(campo)
    };
    
  }

  getCampo(campo: string) {
    return this.form.get(campo);
  }

  resetar() {
    this.form.reset();
  }

}
