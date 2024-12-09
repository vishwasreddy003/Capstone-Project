import { TestBed } from '@angular/core/testing';

import { TrackerDataService } from './tracker-data.service';

describe('TrackerDataService', () => {
  let service: TrackerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
