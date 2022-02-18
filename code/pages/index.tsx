import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: '/game',
    },
  };
};

export default Home;
