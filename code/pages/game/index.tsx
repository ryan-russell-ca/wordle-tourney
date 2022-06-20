import type {GetServerSideProps, NextPage} from 'next';
import { post } from '../../common/utils/fetch';
import { addBaseUrl } from '../../common/utils/ssr';
import { serverWrapper } from '../../lib/withIdentity';

const GameIndex: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await serverWrapper(ctx);

  if (!user?.id) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const response = await post(addBaseUrl('/api/game', !!ctx.req), { gid: user.id });
  const { id } = await response.json();

  return {
    redirect: {
      permanent: false,
      destination: `/game/${id}`,
    },
  };
};

export default GameIndex;
