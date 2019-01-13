import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationService]
    });
  });

  it('should have a service instance', () => {
    expect(ValidationService).toBeDefined();
  });

  it('should return null forbidden chars', () => {
    expect(
      ValidationService.passwordForbiddenCharactersValidator({ value: 'abc' })
    ).toBeNull;
  });

  it('should return true forbidden chars', () => {
    expect(
      ValidationService.passwordForbiddenCharactersValidator({ value: 'ia' })
    ).toEqual(jasmine.objectContaining({ invalidCharacters: true }));
  });

  it('should return true forbidden chars', () => {
    expect(
      ValidationService.passwordForbiddenCharactersValidator({ value: 'aO' })
    ).toEqual(jasmine.objectContaining({ invalidCharacters: true }));
  });

  it('should return true forbidden chars', () => {
    expect(
      ValidationService.passwordForbiddenCharactersValidator({ value: 'I' })
    ).toEqual(jasmine.objectContaining({ invalidCharacters: true }));
  });

  it('should return null passwordTwoNonOverlapingPairsValidator', () => {
    expect(
      ValidationService.passwordTwoNonOverlapingPairsValidator({
        value: 'aabb'
      })
    ).toBeNull;
  });

  it('should return true passwordTwoNonOverlapingPairsValidator', () => {
    expect(
      ValidationService.passwordTwoNonOverlapingPairsValidator({
        value: 'abc'
      })
    ).toEqual(jasmine.objectContaining({ overlapingPairs: true }));
  });

  it('should return null passwordIncreasingThreeLettersValidator', () => {
    expect(
      ValidationService.passwordIncreasingThreeLettersValidator({
        value: 'abc'
      })
    ).toBeNull();
  });
});
