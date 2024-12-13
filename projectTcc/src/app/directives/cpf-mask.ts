import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[FormateCpf]',
  standalone: true,
})
export class FormarteCPF {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent): void {
    const input = this.el.nativeElement;
    let cpf = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // Aplica a máscara de CPF
    if (cpf.length > 9) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else if (cpf.length > 6) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (cpf.length > 3) {
      cpf = cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    }
    // Atualiza o valor no input com a máscara aplicada
    input.value = cpf;
  }
}
