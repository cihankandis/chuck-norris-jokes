import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('JokesService', () => {
  let service: StorageService;
  let httpMock: HttpTestingController;

  let jokes: any[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });

    // inject the service
    service = TestBed.get(StorageService);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should return the data', () => {
    expect(service.setItem('test_key', 'test_data')).toBe('test_data');
  });

  it('should return the data', () => {
    expect(service.getItem('test_key')).toBe('test_data');
  });
});
