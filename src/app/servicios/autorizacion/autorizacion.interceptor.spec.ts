import { TestBed } from '@angular/core/testing';

import { AutorizacionInterceptor } from './autorizacion.interceptor';

describe('AutorizacionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AutorizacionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AutorizacionInterceptor = TestBed.inject(AutorizacionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
