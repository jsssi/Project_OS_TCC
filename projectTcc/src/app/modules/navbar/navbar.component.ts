import { Component, ElementRef, Renderer2, AfterViewInit, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgIf } from '@angular/common'
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  hide = true;
  private sideBar?: HTMLElement;
  private btnMenu?: HTMLElement;
  private modalBusca?: HTMLElement;
  private seta?: HTMLElement;
  private seta1?: HTMLElement;
  private menu_btn?: HTMLElement;
  private menu_btn_close?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngAfterViewInit() {
    this.btnMenu = this.el.nativeElement.querySelector('.btn_menu');
    this.modalBusca = this.el.nativeElement.querySelector('.modal_more_info');
    this.sideBar = this.el.nativeElement.querySelector('nav');
    this.seta = this.el.nativeElement.querySelector('.search_modal-left ');
    this.seta1 = this.el.nativeElement.querySelector('.search_modal');
    this.menu_btn = this.el.nativeElement.querySelector('.menu_btn');
    this.menu_btn_close = this.el.nativeElement.querySelector('.menu_btn_close');

  }
  closeModal() {
    this.renderer.removeClass(this.modalBusca, 'show_modal_class');
    this.renderer.addClass(this.seta, 'hide')
    this.renderer.removeClass(this.seta1, 'hide')
  }

  modalClass() {
    if (this.modalBusca) {
      this.renderer.addClass(this.modalBusca, 'show_modal_class');
      console.log('funfou???')
      this.renderer.addClass(this.seta1, 'hide')
      this.renderer.removeClass(this.seta, 'hide')
    }

  }
  addandremoveclass() {
    const isMenuHidden = this.menu_btn?.classList.contains('hide');

    if (isMenuHidden) {
      this.renderer.removeClass(this.menu_btn, 'hide');
      this.renderer.addClass(this.menu_btn_close, 'hide');
      this.renderer.removeClass(this.sideBar, 'show');
      
    } else {
      this.renderer.addClass(this.menu_btn, 'hide');
      this.renderer.removeClass(this.menu_btn_close, 'hide');
      this.renderer.addClass(this.sideBar, 'show');
    }
  }
  setActive(event: Event) {

    // Seleciona todos os botões que podem ter a classe 'active', incluindo o menu
    const activeButtons = this.el.nativeElement.querySelectorAll('.active');
    activeButtons.forEach((btn: HTMLElement) => this.renderer.removeClass(btn, 'active'));

    const clickedButton = event.currentTarget as HTMLElement;
    this.renderer.addClass(clickedButton, 'active');
    var bolean = this.modalBusca?.classList.contains('show_modal_class');

    if (bolean) {
      this.renderer.removeClass(this.modalBusca, 'show_modal_class');
      console.log('removeu!!!!')
    }

  }
}
