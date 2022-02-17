import classnames from 'classnames';
import { Clue, clueClass } from './../utils/clue';
import styles from './Keyboard.module.scss';

interface KeyboardProps {
  letterInfo: Map<string, Clue>;
  onKey: (key: string) => void;
}

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter'],
];

export const Keyboard = ({ letterInfo, onKey }: KeyboardProps) => {
  return (
    <div className={styles['keyboard-container']}>
      <div className={styles['keyboard']}>
        {KEYS.map((row, i) => (
          <div key={i} className={styles['keyboard-row']}>
            {row.map((label) => {
              const clue = letterInfo.get(label);
              return (
                <div
                  tabIndex={-1}
                  key={label}
                  role="button"
                  className={classnames(
                    styles['keyboard-key'],
                    { [styles['keyboard-key-wide']]: label === 'Enter' },
                    { [styles['keyboard-key-absent']]: clueClass(clue) === 0 },
                    {
                      [styles['keyboard-key-elsewhere']]: clueClass(clue) === 1,
                    },
                    { [styles['keyboard-key-correct']]: clueClass(clue) === 2 },
                  )}
                  onClick={() => {
                    onKey(label);
                  }}
                >
                  {label.replace('Backspace', '⌫')}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
