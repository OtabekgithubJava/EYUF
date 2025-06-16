import { TestBed } from '@angular/core/testing';

import { FavouriteServiceService } from './favourite-service.service';

describe('FavouriteServiceService', () => {
  let service: FavouriteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
