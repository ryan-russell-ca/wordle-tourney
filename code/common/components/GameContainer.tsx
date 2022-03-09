import Game from '../../common/components/Game';
import { maxGuesses } from '../../common/utils/functions';
import styles from './GameContainer.module.scss';
import ScoreBoard from '../../common/components/ScoreBoard';
import { FunctionComponent } from 'react';
import ScoreProvider from '../providers/ScoreProvider';
import EntryProvider from '../providers/EntryProvider';
import { GameDetailedResponse } from '../../pages/api/game/[id]';
import MessageProvider from '../providers/MessageProvider';
import { UserIdentity } from '../../lib/withIdentity';

export interface GameContainerProps {
  game: GameDetailedResponse;
  user: UserIdentity;
}

const GameContainer: FunctionComponent<GameContainerProps> = ({ game, user }) => {
  return (
    <div className={styles['game-container']}>
      <main className={styles['game-container-main']}>
        <ScoreProvider>
          <EntryProvider>
            <MessageProvider>
              <ScoreBoard user={user} />
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
