import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { get } from '../../common/utils/fetch';
import { addBaseUrl } from '../../common/utils/ssr';
import GameContainer from '../../common/components/GameContainer';
import { GameDetailedResponse } from '../api/game/[id]';

const GameHome: NextPage<{ game: GameDetailedResponse }> = ({
  game,
}) => {
  return (
    <div>
      <Head>
        <title>Wordle: Battle Tournament</title>
        <meta name="description" content="The ultimate Wordle battle" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <GameContainer game={game} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const game = await get(
    addBaseUrl(`/api/game/${context.query.id}`, !!context.req),
  );

  return {
    props: { game },
  };
};

export default GameHome;
