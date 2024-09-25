import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { detailResolver } from './detail.resolver';

describe('detailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
