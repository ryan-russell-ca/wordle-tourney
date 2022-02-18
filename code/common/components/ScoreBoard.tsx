import { GameEntry, GameScore } from '@prisma/client';
import Image from 'next/image';
import { Icons } from '../libraries/scoreMessages';
import { useEntry } from '../providers/EntryProvider';
import { useMessage } from '../providers/MessageProvider';
import { useScore } from '../providers/ScoreProvider';
import styles from './ScoreBoard.module.scss';

const scoreMessageRender = (score: GameScore, entry: GameEntry | null) => {
  switch (score.messageType) {
    case 1: {
      const parsed = entry?.answer
        .toUpperCase()
        .split('')
        .map((letter, i) => (
          <div key={i} className={styles['score-board-scoring-letter']}>
            {letter}
          </div>
        ));
      return parsed;
    }
    case 2: {
      return <div>Extra vowels</div>;
    }
    default:
      return null;
  }
};

const ScoreBoard = () => {
  const [{ totalScore, scores }] = useScore();
  const [{ entriesById }] = useEntry();
  const [{ messages }] = useMessage();

  return (
    <div className={styles['score-board-scoring']}>
      <div className={styles['score-board-scoring-header']}>
        <Image
          src="/logo.png"
          width={400}
          height={200}
          objectFit="contain"
          alt="Wordle Battle Tournament"
        />
        <div className={styles['score-board-scoring-score']}>
          <div className={styles['score-board-scoring-score-label']}>
            Score:
          </div>
          <div className={styles['score-board-scoring-score-value']}>
            {totalScore}
          </div>
        </div>

        <hr className={styles['score-board-scoring-break']} />
      </div>
      <div className={styles['score-board-scoring-message']}>
        <span className={styles['letter']}>{messages[0]}</span>
      </div>
      <div className={styles['score-board-scoring-body']}>
        {scores.map((score) => {
          const Icon = Icons[score.messageType];
          return (
            <div key={score.id} className={styles['score-board-scoring-row']}>
              <div>
                <Icon className={styles['score-board-scoring-icon']} />
              </div>
              <div>
                {scoreMessageRender(
                  score,
                  score.gameEntryId ? entriesById[score.gameEntryId] : null,
                )}
              </div>
              <div>{score.amount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBoard;
