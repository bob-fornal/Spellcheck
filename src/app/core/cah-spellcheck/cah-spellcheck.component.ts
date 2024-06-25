import { Component } from '@angular/core';

import { CahSpellcheckService } from './cah-spellcheck.service';
import { CahAlgorithmTypes } from './cah-spellcheck.interface';

declare var navigator: Navigator;

@Component({
  selector: 'cah-spellcheck',
  templateUrl: './cah-spellcheck.component.html',
  styleUrls: ['./cah-spellcheck.component.scss']
})
export class CahSpellcheckComponent {
  navigator: any = navigator;

  public menuTopLeftPosition = { x: '0', y: '0' }
  public isMenuVisible: boolean = false;

  private clickedElement: any;
  public checkData: { misspelled: boolean; suggestions: Array<string> } = {
    misspelled: false, suggestions: []
  };

  constructor(
    private service: CahSpellcheckService
  ) {}

  public initService = (setupFn: any, addCustomWordFn: any, algorithm: CahAlgorithmTypes): void => {
    this.service.init(setupFn, addCustomWordFn, algorithm);
  }

  public closeMenu = (event: any): void => {
    let target: any = event.target;
    if (target.classList.contains('left') === true || target.classList.contains('right') === true) {
      target = event.target.parentElement;
    }

    if (target.classList.contains('cah-spellcheck-menu-item') === true) {
      this.triggerSelection(target.value);
      return;
    }
    if (target.classList.contains('cah-spellcheck-menu-fixed') === true) {
      this.triggerFixedItem(target.value);
      return;
    }

    this.isMenuVisible = false;
  };

  private triggerFixedItem = async (type: string): Promise<void> => {
    const word = this.selectWord(this.clickedElement);
    
    switch (true) {
      case type === '~~ADD-TO-DICTIONARY~~':
        this.service.addCustomWord(word);
        this.isMenuVisible = false;
        break;
      case type === '~~CUT~~':
        this.addToClipboard(word);
        this.triggerSelection('');
        break;
      case type === '~~COPY~~':
        this.addToClipboard(word);
        this.isMenuVisible = false;
        break;
      case type === '~~PASTE~~':
        const replacement: string = await this.getFromClipboard();
        this.triggerSelection(replacement);
        break;
    }
  };

  private addToClipboard = (word: string): void => {
    this.navigator.clipboard.writeText(word);
  };

  private getFromClipboard = async(): Promise<string> => {
    return await this.navigator.clipboard.readText();
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
    const word = this.selectWord(element);
    this.checkData = this.service.checkWord(word);

    if (this.checkData.misspelled === true) {
      event.preventDefault();

      this.menuTopLeftPosition.x = event.clientX + 'px';
      this.menuTopLeftPosition.y = event.clientY + 'px';
  
      this.clickedElement = element;
      console.log(this.checkData);
  
      this.isMenuVisible = true;  
    }
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
