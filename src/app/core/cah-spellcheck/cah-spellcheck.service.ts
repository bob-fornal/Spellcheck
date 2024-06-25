import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { SpellCheckerService } from 'ngx-spellchecker';

@Injectable({
  providedIn: 'root'
})
export class CahSpellcheckService {

  allWords: Array<string> = [];
  // dictionary: any;

  constructor(
    private http: HttpClient,
    // private spellCheckerService: SpellCheckerService
  ) {}

  init = async (): Promise<void> => {
    const words: string = await lastValueFrom(
      this.http.get('./assets/normalized_en-US.dic.txt', { responseType: 'text' })
    );
    this.allWords = words.split('\n');

    const custom: string = await lastValueFrom(
      this.http.get('./assets/custom_en-US.dic.txt', { responseType: 'text' })
    );
    this.allWords.push(...custom.split('\n'));

    // this.dictionary = this.spellCheckerService.getDictionary(this.allWords);
  }

  checkWord = (word: string): { misspelled: boolean; suggestions: Array<string> } => {
    // return this.dictionary.checkAndSuggest(word);
    const dictionary = [...this.allWords];
    this.sortByDistances(word, dictionary);
    let suggestions = dictionary.slice(0, 5);
    if (suggestions.includes(word) === true) {
      const index = suggestions.indexOf(word);
      suggestions = [word, ...suggestions.filter(item => item !== word)];
    }
    return { misspelled: !suggestions.includes(word), suggestions };
  };

  sortByDistances(typoPath: string, dictionary: string[]) {
    const pathsDistance = {} as { [name: string]: number };

    dictionary.sort((a, b) => {
      if (!(a in pathsDistance)) {
        pathsDistance[a] = this.levenshtein(a, typoPath);
      }
      if (!(b in pathsDistance)) {
        pathsDistance[b] = this.levenshtein(b, typoPath);
      }

      return pathsDistance[a] - pathsDistance[b];
    });
  }

  levenshtein(a: string, b: string): number {
    if (a.length === 0) {
      return b.length;
    }
    if (b.length === 0) {
      return a.length;
    }

    const matrix = [];

    // increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1, // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }
}
