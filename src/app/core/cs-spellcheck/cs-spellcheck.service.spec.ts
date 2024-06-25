import { TestBed } from '@angular/core/testing';

import { CsSpellcheckService } from './cs-spellcheck.service';

describe('CsSpellcheckService', () => {
  let service: CsSpellcheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsSpellcheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
