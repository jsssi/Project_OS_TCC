import { Component, ElementRef, Renderer2 , AfterViewInit} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {

  private modal ?:HTMLElement;
  private btnMenu ?: HTMLElement;
  private modalBusca ?: HTMLElement;
  private seta?:HTMLElement;
  private seta1?:HTMLElement;

  constructor(private el :ElementRef, private renderer :Renderer2 ){}
  ngAfterViewInit(){
    this.btnMenu = this.el.nativeElement.querySelector('.btn_menu');
    this.modalBusca = this.el.nativeElement.querySelector('.modal_more_info');
    this.modal = this.el.nativeElement.querySelector('nav');
    this.seta = this.el.nativeElement.querySelector('.search_modal-left ');
    this.seta1 = this.el.nativeElement.querySelector('.search_modal')
  }
closeModal(){
   this.renderer.removeClass(this.modalBusca , 'show_modal_class');
   this.renderer.addClass(this.seta, 'hide')
      this.renderer.removeClass(this.seta1, 'hide')
  }
  addclasslist(){
     this.renderer.addClass(this.modal, 'show');
  }
  modalClass(){
    if(this.modalBusca){
      this.renderer.addClass(this.modalBusca,'show_modal_class');
      console.log('funfou???')
      this.renderer.addClass(this.seta1, 'hide')
      this.renderer.removeClass(this.seta, 'hide')
    }

  }

  setActive(event: Event) {

    // Seleciona todos os botões que podem ter a classe 'active', incluindo o menu
    const activeButtons = this.el.nativeElement.querySelectorAll('.active');
    activeButtons.forEach((btn: HTMLElement) => this.renderer.removeClass(btn, 'active'));

    const clickedButton = event.currentTarget as HTMLElement;
    this.renderer.addClass(clickedButton, 'active');
    var bolean = this.modalBusca?.classList.contains('show_modal_class');

    if(bolean){
      this.renderer.removeClass(this.modalBusca,'show_modal_class');
      console.log('removeu!!!!')
    }

  }
}
