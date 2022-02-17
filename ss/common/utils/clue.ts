export enum Clue {
  Absent,
  Elsewhere,
  Correct,
}

export interface CluedLetter {
  clue?: Clue;
  letter: string;
}

export function clue(word: string, target: string): CluedLetter[] {
  const elusive: string[] = [];

  target.split('').forEach((letter, i) => {
    if (word[i] !== letter) {
      elusive.push(letter);
    }
  });

  return word.split('').map((letter, i) => {
    let j: number;
    if (target[i] === letter) {
      return { clue: Clue.Correct, letter };
    } else if ((j = elusive.indexOf(letter)) > -1) {
      // "use it up" so we don't clue at it twice
      elusive[j] = '';
      return { clue: Clue.Elsewhere, letter };
    } else {
      return { clue: Clue.Absent, letter };
    }
  });
}

export function clueClass(clue: Clue | undefined): number {
  if (clue === Clue.Absent) {
    return 0;
  } else if (clue === Clue.Elsewhere) {
    return 1;
  } else if (clue === Clue.Correct) {
    return 2;
  }
  return -1;
}
