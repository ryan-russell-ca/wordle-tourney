import classNames from 'classnames';
import { Clue, clueClass, CluedLetter } from './../utils/clue';
import styles from './Row.module.scss';

export enum RowState {
  LockedIn,
  Editing,
  Pending,
}

interface RowProps {
  rowState: RowState;
  cluedLetters: CluedLetter[];
  scoreValue: number;
}

export const Row = ({ rowState, cluedLetters, scoreValue }: RowProps) => {
  const isLockedIn = rowState === RowState.LockedIn;
  const isActive = rowState === RowState.Editing;
  console.log(cluedLetters);

  const letterDivs = cluedLetters
    .concat(
      Array(5 - cluedLetters.length).fill({ clue: Clue.Absent, letter: '' }),
    )
    .map(({ clue, letter }, i) => {
      const clueIndex = isLockedIn && clueClass(clue);

      return (
        <td
          key={i}
          className={classNames(
            styles['row-word-input'],
            { [styles['row-letter-in-word']]: clueIndex === 1 },
            { [styles['row-letter-in-place']]: clueIndex === 2 },
          )}
        >
          {letter}
        </td>
      );
    });

  return (
    <tr
      className={classNames(styles['row-container'], {
        [styles['row-container-unlocked']]: !isLockedIn,
      })}
    >
      {letterDivs}
      <td
        className={classNames(
          styles['row-score-value'],
          { [styles['row-score-value-missed']]: isLockedIn },
          { [styles['row-score-value-current']]: isActive },
        )}
      >
        {scoreValue}
      </td>
    </tr>
  );
};
