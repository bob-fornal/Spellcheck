import { Component } from '@angular/core';
import { CahSpellcheckService } from './cah-spellcheck.service';

@Component({
  selector: 'cah-spellcheck',
  templateUrl: './cah-spellcheck.component.html',
  styleUrls: ['./cah-spellcheck.component.scss']
})
export class CahSpellcheckComponent {
  public menuTopLeftPosition = { x: '0', y: '0' }
  public isMenuVisible: boolean = false;

  private clickedElement: any;
  public checkData: { misspelled: boolean; suggestions: Array<string> } = {
    misspelled: false, suggestions: []
  };

  constructor(private service: CahSpellcheckService) {
    service.init();
  }

  public closeMenu = (event: any): void => {
    if (event.target.classList.contains('cah-spellcheck-menu-item') === true) {
      this.triggerSelection(event.target.value);
      return;
    }
    if (event.target.classList.contains('cah-spellcheck-menu-fixed') === true) {
      this.triggerFixedItem(event.target.value);
      return;
    }

    this.isMenuVisible = false;
  };

  private triggerFixedItem = (value: string): void => {
    const word = this.selectWord(this.clickedElement);
    console.log(value, word);

    this.isMenuVisible = false;
  };

  private triggerSelection = (value: string): void => {
    const left: number = this.clickedElement.selectionStart;
    const right: number = this.clickedElement.selectionEnd;
    
    const whole: string = this.clickedElement.value;
    const fixed: string = whole.substring(0, left) + value + whole.substring(right);
    this.clickedElement.value = fixed;

    this.isMenuVisible = false;
  };

  public onRightClick(event: any, element: any) {
    event.preventDefault();

    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    const word = this.selectWord(element);
    this.clickedElement = element;
    this.checkData = this.service.checkWord(word);
    console.log(this.checkData);

    this.isMenuVisible = true;
  }

  private selectWord = (element: any): string => {
    const current: number = element.selectionStart;
    const value = element.value;

    let left: number = current;
    let right: number = current;

    const breakOn: Array<string> = [' ', '\n'];
    for (let i = current, len = 0; i >= len; i--) {
      if (breakOn.includes(value[i]) === true) {
        left = i + 1;
        break;
      }
      if (i === 0) {
        left = 0;
        break;
      }
    }
    for (let i = current, len = value.length; i <= len; i++) {
      if (breakOn.includes(value[i]) === true) {
        right = i;
        break;
      }
      if (i === len) {
        right = len;
        break;
      }
    }
    element.selectionStart = left;
    element.selectionEnd = right;
    return element.value.substring(left, right);
  };
}
