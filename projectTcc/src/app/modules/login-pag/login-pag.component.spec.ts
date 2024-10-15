import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPagComponent } from './login-pag.component';

describe('LoginPagComponent', () => {
  let component: LoginPagComponent;
  let fixture: ComponentFixture<LoginPagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
