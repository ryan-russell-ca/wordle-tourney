import Game from '../../common/components/Game';
import { maxGuesses } from '../../common/utils/functions';
import styles from './GameContainer.module.scss';
import ScoreBoard from '../../common/components/ScoreBoard';
import { FunctionComponent } from 'react';
import ScoreProvider from '../providers/ScoreProvider';
import EntryProvider from '../providers/EntryProvider';
import { GameDetailedResponse } from '../../pages/api/game/[id]';
import MessageProvider from '../providers/MessageProvider';

export interface GameContainerProps {
  game: GameDetailedResponse;
}

const GameContainer: FunctionComponent<GameContainerProps> = ({ game }) => {
  return (
    <div className={styles['game-container']}>
      <main className={styles['game-container-main']}>
        <ScoreProvider>
          <EntryProvider>
            <MessageProvider>
              <ScoreBoard />
              <Game maxGuesses={maxGuesses} game={game} />
            </MessageProvider>
          </EntryProvider>
        </ScoreProvider>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default GameContainer;
