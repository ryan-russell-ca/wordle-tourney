import type {GetServerSideProps, NextPage} from 'next';
import { post } from '../../common/utils/fetch';
import { addBaseUrl } from '../../common/utils/ssr';

const GameIndex: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const response = await post(addBaseUrl('/api/game', !!req), {});
  const { id } = await response.json();

  return {
    redirect: {
      permanent: false,
      destination: `/game/${id}`,
    },
  };
};

export default GameIndex;
