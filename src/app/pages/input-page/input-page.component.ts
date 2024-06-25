import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CahSpellcheckComponent } from 'src/app/core/cah-spellcheck/cah-spellcheck.component';

@Component({
  selector: 'input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.scss'],
})
export class InputPageComponent implements OnInit {
  @ViewChild(CahSpellcheckComponent) spellcheck!: CahSpellcheckComponent;

  inputData: string = 'mispelld word hre';
  textareaData: string = 'mispelld word hre\nmizpelld word hee';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize = () => {
    if (this.spellcheck === undefined) {
      setTimeout(() => this.initialize(), 100);
    } else {
      this.spellcheck.initService(
        this.initSpellcheck.bind(this),
        this.handleWordSuggestion.bind(this),
        'complex-levenshtein',
      );
    }
  };

  onRightClick = (event: any, element: any): void => {
    this.spellcheck.onRightClick(event, element);
  };

  initSpellcheck = async () => {
    const words: string = await lastValueFrom(
      this.http.get('./assets/normalized_en-US.dic.txt', { responseType: 'text' })
    );
    const allWords = words.split('\n');

    const custom: string = await lastValueFrom(
      this.http.get('./assets/custom_en-US.dic.txt', { responseType: 'text' })
    );
    allWords.push(...custom.split('\n'));

    return allWords;
  };

  handleWordSuggestion = async (word: string) => {
    console.log('handleWordSuggestion from input page', word);
    // some http.post to send to API endpoint
  };
}
