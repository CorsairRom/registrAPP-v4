import { TestBed } from '@angular/core/testing';

import { AutorizarGuard } from './autorizar.guard';

xdescribe('AutorizarGuard', () => {
  let guard: AutorizarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutorizarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
