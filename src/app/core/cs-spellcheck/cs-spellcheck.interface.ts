export type CsAlgorithmTypes = 'basic-levenshtein' | 'complex-levenshtein';

export interface SpellcheckResponse {
  misspelled: boolean;
  suggestions: Array<string>
}

export interface LevenshteinResponse {
  steps: number;
  relative: number;
  similarity: number;
}
