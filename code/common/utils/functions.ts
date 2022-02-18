import dictionary from '../libraries/dictionary';

export const maxGuesses = 6;

export const dictionarySet: Set<string> = new Set(dictionary);

export function pick<T>(array: Array<T>): T {
  return array[Math.floor(array.length * Math.random())];
}

