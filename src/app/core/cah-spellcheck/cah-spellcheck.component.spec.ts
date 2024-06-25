import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CahSpellcheckComponent } from './cah-spellcheck.component';

describe('CahSpellcheckComponent', () => {
  let component: CahSpellcheckComponent;
  let fixture: ComponentFixture<CahSpellcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CahSpellcheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CahSpellcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
