import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarrightComponent } from './navbarright.component';

describe('NavbarrightComponent', () => {
  let component: NavbarrightComponent;
  let fixture: ComponentFixture<NavbarrightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarrightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
