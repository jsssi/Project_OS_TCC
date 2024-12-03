import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[FormatePhoneNumber]',
  standalone: true,
})
export class FormatePhoneNumberDirective {
  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    const input = this.el.nativeElement;
    let telefone = input.value.replace(/\D/g, '');

    if(telefone.lenght < 11){
      telefone = telefone.slice(0, 11);
    }
    if (telefone.length > 6) {
      telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
    } else if (telefone.length > 2) {
      telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}`;
    }

    // Atualiza o valor no input com a máscara aplicada
    input.value = telefone;
  }
}
