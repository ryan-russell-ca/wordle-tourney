import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { get } from '../../common/utils/fetch';
import { addBaseUrl } from '../../common/utils/ssr';
import GameContainer from '../../common/components/GameContainer';
import { GameDetailedResponse } from '../api/game/[id]';
import { serverWrapper, UserIdentity } from '../../lib/withIdentity';

const GameHome: NextPage<{
  game: GameDetailedResponse;
  session: UserIdentity;
}> = ({ game, session }) => {
  return (
    <div>
      <Head>
        <title>Wordle: Battle Tournament</title>
        <meta name="description" content="The ultimate Wordle battle" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <GameContainer game={game} user={session} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const game = await get(
    addBaseUrl(`/api/game/${ctx.query.id}`, !!ctx.req),
  );

  const session = await serverWrapper(ctx);

  return {
    props: { game, session },
  };
};

export default GameHome;
