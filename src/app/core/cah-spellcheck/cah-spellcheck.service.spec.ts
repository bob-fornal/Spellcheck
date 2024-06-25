import { TestBed } from '@angular/core/testing';

import { CahSpellcheckService } from './cah-spellcheck.service';

describe('CahSpellcheckService', () => {
  let service: CahSpellcheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CahSpellcheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
