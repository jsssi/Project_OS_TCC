import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplooyerGerenteComponent } from './emplooyer-gerente.component';

describe('EmplooyerGerenteComponent', () => {
  let component: EmplooyerGerenteComponent;
  let fixture: ComponentFixture<EmplooyerGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmplooyerGerenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplooyerGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
