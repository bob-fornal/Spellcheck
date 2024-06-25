import { Component, ViewChild } from '@angular/core';

import { CahSpellcheckComponent } from 'src/app/core/cah-spellcheck/cah-spellcheck.component';

@Component({
  selector: 'input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.scss'],
})
export class InputPageComponent {
  @ViewChild(CahSpellcheckComponent) spellcheck!: CahSpellcheckComponent;

  inputData: string = 'mispelld word hre';
  textareaData: string = 'mispelld word hre\nmizpelld word hee';

  onRightClick = (event: any, element: any): void => {
    this.spellcheck.onRightClick(event, element);
  };
}
