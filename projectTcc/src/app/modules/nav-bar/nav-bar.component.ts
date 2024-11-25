import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements AfterViewInit {

  @ViewChild('navBar') navBarRef!: ElementRef;
  @ViewChild('open', { static: false }) openRef!: ElementRef;
  @ViewChild('close', { static: false }) closeRef!: ElementRef;

  constructor(private Renderer: Renderer2) { }
  ngAfterViewInit(): void {
    if (this.openRef) {
      this.openRef.nativeElement.addEventListener('click', () => {
        if (this.navBarRef) {
          this.Renderer.addClass(this.navBarRef.nativeElement, 'navbar-extends');
          this.Renderer.addClass(this.openRef.nativeElement, 'hide');
          this.Renderer.removeClass(this.closeRef.nativeElement, 'hide');
        }
      })
    }
    if (this.closeRef) {
      this.closeRef.nativeElement.addEventListener('click', () => {
        if (this.navBarRef) {
          this.Renderer.removeClass(this.navBarRef.nativeElement, 'navbar-extends');
          this.Renderer.removeClass(this.openRef.nativeElement, 'hide');
          this.Renderer.addClass(this.closeRef.nativeElement, 'hide');
        }
      })
    }
  }


}
