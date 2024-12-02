import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class ValidatorsUtils {
  constructor() { }

  static validateCPF(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;

    if (!cpf) {
      return { cpfInvalid: 'O CPF é obrigatório' };
    }

    const cleanedCPF = cpf.replace(/\D/g, '');

    if (!cleanedCPF.match(/^[0-9]{11}$/)) {
      return { cpfInvalid: 'CPF inválido' };
    }

    if (cleanedCPF.length !== 11) {
      return { cpfInvalid: 'CPF deve ter 11 dígitos' };
    }


    if (/^(\d)\1+$/.test(cleanedCPF)) {
      return { cpfInvalid: 'CPF inválido' };
    }


    let sum = 0;
    let remainder;


    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCPF.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanedCPF.substring(9, 10))) {
      return { cpfInvalid: 'CPF inválido' };
    }


    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCPF.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanedCPF.substring(10, 11))) {
      return { cpfInvalid: 'CPF inválido' };
    }

    return null;
  }
  static required(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value ? control.value.trim() : '';
     
      if (!value || value.length === 0) {
        return { required: 'Este campo é obrigatório' }; // Erro de campo vazio ou com espaços
      }
      return null; // Caso contrário, é válido
    }
  }
}
