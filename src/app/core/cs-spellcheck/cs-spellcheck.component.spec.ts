import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsSpellcheckComponent } from './cs-spellcheck.component';

describe('CsSpellcheckComponent', () => {
  let component: CsSpellcheckComponent;
  let fixture: ComponentFixture<CsSpellcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsSpellcheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsSpellcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
