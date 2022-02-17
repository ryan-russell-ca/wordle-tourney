import { useCallback, useEffect, useRef, useState } from 'react';
import { Row, RowState } from './Row';
import dictionary from '../libraries/dictionary';
import { Clue, clue, CluedLetter } from './../utils/clue';
import { Keyboard } from './Keyboard';
import styles from './Game.module.scss';
import { post } from '../utils/fetch';
import { GameEntries, Game as GameDb } from '@prisma/client';

enum GameState {
  Playing = 0,
  Won = 1,
  Lost = 2,
}

interface GameProps {
  maxGuesses: number;
  game: GameDb & { entries: Guess[] };
}

export interface Guess extends GameEntries {
  letters: CluedLetter[];
}

const WORD_LENGTH = 5;

const Game = ({ maxGuesses, game }: GameProps) => {
  const { solution, entries } = game;

  console.log(entries);

  const [gameState, setGameState] = useState(game.status);
  const [guesses, setGuesses] = useState<Guess[]>(game.entries);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [hint, setHint] = useState<string>('Make your first guess!');
  const tableRef = useRef<HTMLTableElement>(null);
  const startNextGame = () => {
    setHint('');
    setGuesses([]);
    setCurrentGuess('');
    setGameState(GameState.Playing);
  };
  console.log(solution, GameState.Playing, game);

  const onKey = useCallback(
    async (key: string) => {
      if (gameState !== GameState.Playing) {
        if (key === 'Enter') {
          startNextGame();
        }
        return;
      }

      if (guesses.length === maxGuesses) return;

      if (/^[a-z]$/i.test(key)) {
        setCurrentGuess((guess) =>
          (guess + key.toLowerCase()).slice(0, WORD_LENGTH),
        );
        tableRef.current?.focus();
        setHint('');
      } else if (key === 'Backspace') {
        setCurrentGuess((guess) => guess.slice(0, -1));
        setHint('');
      } else if (key === 'Enter') {
        if (currentGuess.length !== WORD_LENGTH) {
          setHint('Too short');
          return;
        }
        if (!dictionary.includes(currentGuess)) {
          setHint('Not a valid word');
          return;
        }

        const currentGuesses = await post(`/api/game/${game.id}/entry`, {
          row: guesses.length + 1,
          answer: currentGuess,
        });
        const currentGuessesJson = await currentGuesses.json();
        console.log(currentGuessesJson);

        setGuesses(() => currentGuessesJson as Guess[]);
        setCurrentGuess(() => '');

        const gameOver = (verbed: string) =>
          `You ${verbed}! The answer was ${solution.toUpperCase()}. (Enter to ${'play again'})`;

        if (currentGuess === solution) {
          setHint(gameOver('won'));
          setGameState(GameState.Won);
        } else if (guesses.length + 1 === maxGuesses) {
          setHint(gameOver('lost'));
          setGameState(GameState.Lost);
        } else {
          setHint('');
        }
      }
    },
    [currentGuess, gameState, guesses, maxGuesses, solution],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) {
        onKey(e.key);
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [currentGuess, gameState, onKey]);

  const letterInfo = new Map<string, Clue>();
  const tableRows = Array(maxGuesses)
    .fill(undefined)
    .map((_, i) => {
      const guess = [
        ...guesses,
        {
          letters: clue(currentGuess, ''),
        },
      ][i] ?? { letters: clue('', '') };
      console.log(guess);

      const lockedIn = i < guesses.length;
      if (lockedIn) {
        for (const { clue, letter } of guess.letters) {
          if (clue === undefined) break;
          const old = letterInfo.get(letter);
          if (old === undefined || clue > old) {
            letterInfo.set(letter, clue);
          }
        }
      }
      return (
        <Row
          scoreValue={1000 - i * 150}
          key={i}
          rowState={
            lockedIn
              ? RowState.LockedIn
              : i === guesses.length
              ? RowState.Editing
              : RowState.Pending
          }
          cluedLetters={guess.letters}
        />
      );
    });

  return (
    <div className={styles['game-container']}>
      <table className={styles['game-table']} ref={tableRef}>
        <tbody>{tableRows}</tbody>
      </table>
      <p
        role="alert"
        style={{
          userSelect: /https?:/.test(hint) ? 'text' : 'none',
          whiteSpace: 'pre-wrap',
        }}
      >
        {hint || '\u00a0'}
      </p>
      <Keyboard letterInfo={letterInfo} onKey={onKey} />
    </div>
  );
};

export default Game;
