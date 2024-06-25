import { Injectable } from '@angular/core';

import * as binarysearch from 'binarysearch';
import * as levenshtein from 'damerau-levenshtein';

const collator = new Intl.Collator(undefined, { 'sensitivity': 'accent' });
const suggestradius = 1000;

import { CsAlgorithmTypes, SpellcheckResponse } from './cs-spellcheck.interface';

@Injectable({
  providedIn: 'root'
})
export class CsSpellcheckService {
  private algorithm: CsAlgorithmTypes = 'basic-levenshtein';
  private allWords: Array<string> = [];
  private regexs: Array<any> = [];

  public addCustomWord: any;

  public init = async (setupFn: any, addCustomWordFn: any, algorithm: CsAlgorithmTypes): Promise<void> => {
    this.allWords = await setupFn();
    this.addCustomWord = addCustomWordFn;
    this.algorithm = algorithm;
  };

  public checkWord = (word: string): SpellcheckResponse => {
    const dictionary = [...this.allWords];

    switch (true) {
      case this.algorithm === 'basic-levenshtein':
        return this.basicLevenshtein(word, dictionary);
      case this.algorithm === 'complex-levenshtein':
        return this.complexLevenshtein(word, dictionary);
    }

    return { misspelled: false, suggestions: [] };
  };

  private basicLevenshtein = (word: string, dictionary: Array<string>): SpellcheckResponse => {
    this.sortByDistances(word.toLowerCase(), dictionary);
    let suggestions = dictionary.slice(0, 5);
    if (suggestions.includes(word) === true) {
      suggestions = [word, ...suggestions.filter(item => item !== word)];
    }
    return { misspelled: !suggestions.includes(word), suggestions };
  };

  complexLevenshtein = (word: string, dictionary: Array<string>, limit: number = 5, maxDistance: number = 3): SpellcheckResponse => {
    const suggestions: any = this.getSuggestions(word, dictionary, limit + 1, maxDistance);

    const response: SpellcheckResponse = { misspelled: true, suggestions: [] };
    response.misspelled = suggestions.length === 0 || suggestions[0].toLowerCase() !== word.toLowerCase();
    response.suggestions = suggestions;
    if (response.misspelled && (suggestions.length > limit)) { response.suggestions = suggestions.slice(0, limit); }
    if (!response.misspelled) { response.suggestions = suggestions.slice(1, suggestions.length); }

    if (response.misspelled) {
      for (let i = 0; i < this.regexs.length; i++) {
        if (this.regexs[i].test(word)) { response.misspelled = false; }
      }
    }

    return response;
  };

  private sortByDistances(typoPath: string, dictionary: string[]) {
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

  private levenshtein(a: string, b: string): number {
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

  private getSuggestions(word: string, dictionary: Array<string>, limit: number = 5, maxDistance: number = 3) {
    let suggestions: any[] = [];

    if (word != null && word.length > 0) {
      word = word.toLowerCase();

      if (limit == null || isNaN(limit) || limit <= 0) {
        limit = 5;
      };
      if (maxDistance == null || isNaN(maxDistance) || maxDistance <= 0) {
        maxDistance = 2;
      };
      if (maxDistance >= word.length) {
        maxDistance = word.length - 1;
      };

      // Search index of closest item.
      const closest = binarysearch.closest(dictionary, word, collator.compare);

      // Initialize variables for store results.
      const response: any = [];
      for (let i = 0; i <= maxDistance; i++) {
        response.push([]);
      }

      // Search suggestions around the position in which the word would be inserted.
      let k, dist;
      for (let i = 0; i < suggestradius; i++) {
        // The index 'k' is going to be 0, 1, -1, 2, -2...
        k = closest + (i % 2 != 0 ? ((i + 1) / 2) : (-i / 2));
        if (k >= 0 && k < dictionary.length) {
          dist = levenshtein(word, dictionary[k].toLowerCase()).steps;
          if (dist <= maxDistance) { response[dist].push(dictionary[k]); }
        }
      }

      // Prepare result.
      for (let d = 0; d <= maxDistance && suggestions.length < limit; d++) {
        const remaining: any = limit - suggestions.length;
        suggestions = suggestions.concat((response[d].length > remaining) ? response[d].slice(0, remaining) : response[d]);
      }
    }

    return suggestions;
  }
}
