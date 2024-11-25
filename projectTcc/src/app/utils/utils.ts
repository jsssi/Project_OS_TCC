import { AbstractControl , ValidationErrors } from "@angular/forms";
export function ValidatorCpf( control :AbstractControl):ValidationErrors | null{
  const cpf = control.value;

  //removendo  Caracteres do CPF
  const CpfLimpo = cpf?.replace(/\D/g,'');

  //verificando tamanho
  if(!CpfLimpo || CpfLimpo.lenght != 11) {
    return { invalidCpf: true };
  }
  //verificando se todos os digitos são iguais
  if (/^(\d)\1+$/.test(CpfLimpo)) {
    return { invalidCpf: true };
  }
  //verificando primeiro digito
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(CpfLimpo.charAt(i), 10) * (10 - i);
  }
  let firstDigit = (sum * 10) % 11;
  if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;

  if (firstDigit !== parseInt(CpfLimpo.charAt(9), 10)) {
    return { invalidCpf: true };
  }

  //verificando segundo digito

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(CpfLimpo.charAt(i), 10) * (11 - i);
  }
  let secondDigit = (sum * 10) % 11;
  if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;

  if (secondDigit !== parseInt(CpfLimpo.charAt(10), 10)) {
    return { invalidCpf: true };
  }

  //cpf  Valido 
  return null;
}
