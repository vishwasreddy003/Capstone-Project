import { TestBed } from '@angular/core/testing';

import { TrackerApiService } from './tracker-api.service';

describe('TrackerApiService', () => {
  let service: TrackerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
