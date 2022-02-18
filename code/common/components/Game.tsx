import { useCallback, useEffect, useRef, useState } from 'react';
import Row, { RowState } from './Row';
import dictionary from '../libraries/dictionary';
import { Clue, clue } from './../utils/clue';
import { Keyboard } from './Keyboard';
import styles from './Game.module.scss';
import { postEntry } from '../utils/fetch';
import { addEntry, setEntries, useEntry } from '../providers/EntryProvider';
import { addScores, setScores, useScore } from '../providers/ScoreProvider';
import { GameDetailedResponse } from '../../pages/api/game/[id]';
import { setMessages, useMessage } from '../providers/MessageProvider';

enum GameState {
  Playing = 0,
  Won = 1,
  Lost = 2,
}

interface GameProps {
  maxGuesses: number;
  game: GameDetailedResponse;
}

const WORD_LENGTH = 5;

const Game = ({ maxGuesses, game }: GameProps) => {
  const { solution } = game;

  const [gameState, setGameState] = useState(game.status);
  const [{ entries }, entryDispatch] = useEntry();
  const [, scoreDispatch] = useScore();
  const [, messageDispatch] = useMessage();
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (game.entries.length) {
      setEntries(entryDispatch, game.entries);
    }
  }, [entryDispatch, game.entries]);

  useEffect(() => {
    if (game.scores.length) {
      setScores(scoreDispatch, game.scores);
    }
  }, [game.scores, scoreDispatch]);

  const onKey = useCallback(
    async (key: string) => {
      if (entries.length === maxGuesses) return;

      if (/^[a-z]$/i.test(key)) {
        setCurrentGuess((guess) =>
          (guess + key.toLowerCase()).slice(0, WORD_LENGTH),
        );
        tableRef.current?.focus();
        setMessages(messageDispatch, ['-']);
      } else if (key === 'Backspace') {
        setCurrentGuess((guess) => guess.slice(0, -1));
        setMessages(messageDispatch, ['-']);
      } else if (key === 'Enter') {
        if (currentGuess.length !== WORD_LENGTH) {
          setMessages(messageDispatch, ['Too short']);
          return;
        }
        if (!dictionary.includes(currentGuess)) {
          setMessages(messageDispatch, ['Not a valid word']);
          return;
        }

        const { entry, scores } = await postEntry(game.id, {
          row: entries.length + 1,
          answer: currentGuess,
        });

        addEntry(entryDispatch, entry);
        scores.length && addScores(scoreDispatch, scores);
        setCurrentGuess(() => '');

        const gameOver = (verbed: string) =>
          `You ${verbed}! The answer was ${solution.toUpperCase()}`;

        if (currentGuess === solution) {
          setMessages(messageDispatch, [gameOver('won')]);
          setGameState(GameState.Won);
        } else if (entries.length + 1 === maxGuesses) {
          setMessages(messageDispatch, [gameOver('lost')]);
          setGameState(GameState.Lost);
        } else {
          setMessages(messageDispatch, ['-']);
        }
      }
    },
    [entries.length, maxGuesses, messageDispatch, currentGuess, game.id, entryDispatch, scoreDispatch, solution],
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
        ...entries,
        {
          letters: clue(currentGuess, ''),
        },
      ][i] ?? { letters: clue('', '') };

      const lockedIn = i < entries.length;

      if (lockedIn && guess.letters) {
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
          key={i}
          rowState={
            lockedIn
              ? RowState.LockedIn
              : i === entries.length
              ? RowState.Editing
              : RowState.Pending
          }
          cluedLetters={guess.letters ?? []}
        />
      );
    });

  return (
    <div className={styles['game-container']}>
      <table className={styles['game-table']} ref={tableRef}>
        <tbody>{tableRows}</tbody>
      </table>
      <Keyboard letterInfo={letterInfo} onKey={onKey} />
    </div>
  );
};

export default Game;
