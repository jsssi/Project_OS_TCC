import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CanActivateHomeGuard } from './can-deactivate.guard';

describe('CanActivateHomeGuard', () => {
  let guard: CanActivateHomeGuard;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateHomeGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(CanActivateHomeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to login', () => {
    spyOn(guard as any, 'checkUserAuthentication').and.returnValue(false);

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow an authenticated user to access the route', () => {
    spyOn(guard as any, 'checkUserAuthentication').and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
